import {
  CREATE_MEETING_START,
  CREATE_MEETING_SUCCESS,
  CREATE_MEETING_ERROR,
  FETCH_DASHBOARD_MEETINGS_START,
  FETCH_DASHBOARD_MEETINGS_SUCCESS,
  FETCH_DASHBOARD_MEETINGS_ERROR,
  FETCH_SELECTED_MEETING_START,
  FETCH_SELECTED_MEETING_SUCCESS,
  FETCH_SELECTED_MEETING_ERROR,
  RESET_DASHBOARD_STATE,
  EDIT_MEETING_START,
  EDIT_MEETING_SUCCESS,
  JOIN_MEETING_START,
  JOIN_MEETING_SUCCESS,
  JOIN_MEETING_ERROR,
  LEAVE_MEETING_START,
  LEAVE_MEETING_SUCCESS,
  LEAVE_MEETING_ERROR,
  CANCEL_MEETING_TOGGLE_START,
  CANCEL_MEETING_TOGGLE_SUCCESS,
  CANCEL_MEETING_TOGGLE_ERROR,
  ADD_MEETING_COMMENT_START,
  ADD_MEETING_COMMENT_SUCCESS,
  ADD_MEETING_COMMENT_ERROR
} from '../actions/actionTypes'
import firebase, { firestore, firebaseAuth } from '../../firebase/firebase'
import isEqual from 'date-fns/is_equal'
import defaultUserPhoto from '../../assets/defaultUserPhoto.png'

const _handleFormOnDatabaseErr = (errMsg, formHandlers) => {
  formHandlers.resetForm()
  formHandlers.setErrors({ submissionError: errMsg })
  formHandlers.setSubmitting(false)
}

const _createNewMeetingFromFormValues = (user, formValues) => {
  return {
    hostName: user.username,
    hostUid: user.uid,
    hostPhotoURL: user.photoURL || defaultUserPhoto,
    createdAt: new Date(),
    title: formValues.title,
    date: formValues.date,
    startTime: formValues.startTime,
    endTime: formValues.endTime,
    department: formValues.department,
    building: formValues.building,
    room: formValues.room,
    attendees: {
      [user.uid]: {
        username: user.username,
        photoURL: user.photoURL || defaultUserPhoto,
        signUpDate: new Date(),
        isHost: true
      }
    }
  }
}

export const createMeeting = (values, formHandlers) => async (dispatch, getState) => {
  dispatch({ type: CREATE_MEETING_START })
  try {
    const meetingsRef = firestore.collection('meetings')
    const user = getState().auth.user
    const newMeeting = _createNewMeetingFromFormValues(user, values)
    const meetingRef = await meetingsRef.add(newMeeting)
    const meeting_attendeeDocRef = firestore.doc(
      `/meeting_attendee/${meetingRef.id}_${user.uid}`
    )
    await meeting_attendeeDocRef.set({
      userUid: user.uid,
      meetingId: meetingRef.id,
      date: newMeeting.date,
      host: true,
      department: values.department
    })
    formHandlers.setSubmitting(false)
    dispatch({ type: CREATE_MEETING_SUCCESS })
    return newMeeting
  } catch (error) {
    console.log('Error from createMeeting: ', error)
    _handleFormOnDatabaseErr(error.message, formHandlers)
    dispatch({ type: CREATE_MEETING_ERROR, error: { message: error.message } })
    return null
  }
}

export const editMeeting = (id, values, formHandlers) => async dispatch => {
  dispatch({ type: EDIT_MEETING_START })
  try {
    const meetingRef = firestore.doc(`/meetings/${id}`)
    const meetingDoc = await meetingRef.get()
    if (!meetingDoc.exists) {
      throw new Error('Meeting does not exist')
    }
    if (!isEqual(meetingDoc.data().date.toDate(), values.date)) {
      const user = firebaseAuth.currentUser
      const meeting_attendeeRef = firestore.doc(
        `/meeting_attendee/${meetingRef.id}_${user.uid}`
      )
      const batch = firestore.batch()
      batch.update(meeting_attendeeRef, { date: values.date })
      batch.update(meetingRef, values)
      await batch.commit()
    } else {
      await meetingRef.update(values)
    }
    formHandlers.setSubmitting(false)
    dispatch({ type: EDIT_MEETING_SUCCESS })
  } catch (error) {
    console.log('Error from editMeeting: ', error)
    _handleFormOnDatabaseErr(error.message, formHandlers)
    dispatch({ type: EDIT_MEETING_ERROR, error: { message: error.message } })
  }
}

export const fetchMeetingsForDashboard = () => async (dispatch, getState) => {
  console.log('from fetchMeetingsForDashboard')
  dispatch({ type: FETCH_DASHBOARD_MEETINGS_START })
  try {
    const meetingsRef = firestore.collection('meetings')
    let query
    const dashboardState = getState().meetings.dashboard
    if (dashboardState.willBeInitialFetch) {
      query = meetingsRef.orderBy('date').limit(2)
    } else {
      const newlyFetchedMeetings = dashboardState.newlyFetchedMeetings
      const lastMeetingInState = newlyFetchedMeetings[newlyFetchedMeetings.length - 1]
      const startAfter = await firestore.doc(`/meetings/${lastMeetingInState.id}`).get()
      query = meetingsRef
        .orderBy('date')
        .startAfter(startAfter)
        .limit(2)
    }
    const querySnapshot = await query.get()
    const meetings = []
    querySnapshot.forEach(docSnapshot => {
      const meeting = { ...docSnapshot.data(), id: docSnapshot.id }
      meetings.push(meeting)
    })
    dispatch({ type: FETCH_DASHBOARD_MEETINGS_SUCCESS, meetings })
  } catch (error) {
    console.log('Error from fetchMeetingsForDashboard: ', error)
    dispatch({ type: FETCH_DASHBOARD_MEETINGS_ERROR, error: { message: error.message } })
  }
}

export const resetDashboardState = () => ({ type: RESET_DASHBOARD_STATE })

export const fetchSelectedMeeting = meetingId => async dispatch => {
  dispatch({ type: FETCH_SELECTED_MEETING_START })
  try {
    const meetingRef = firestore.doc(`/meetings/${meetingId}`)
    const meetingDoc = await meetingRef.get()
    if (!meetingDoc.exists) {
      throw new Error('Meeting does not exist')
    }
    const meeting = { ...meetingDoc.data(), id: meetingDoc.id }
    dispatch({ type: FETCH_SELECTED_MEETING_SUCCESS, meeting })
  } catch (error) {
    console.log('Error from fetchSelectedMeeting: ', error)
    dispatch({ type: FETCH_SELECTED_MEETING_ERROR, error: { message: error.message } })
  }
}

export const joinMeeting = meetingId => async (dispatch, getState) => {
  dispatch({ type: JOIN_MEETING_START })
  try {
    const user = getState().auth.user
    console.log('from joinMeeting - user: ', user)
    const meetingRef = firestore.doc(`/meetings/${meetingId}`)
    const meetingAttendeeRef = firestore.doc(`/meeting_attendee/${meetingId}_${user.uid}`)
    const attendee = {
      isHost: false,
      photoURL: user.photoURL,
      signUpDate: new Date(),
      username: user.username
    }
    await firestore.runTransaction(async transaction => {
      const meetingSnapshot = await transaction.get(meetingRef)
      if (!meetingSnapshot.exists) {
        throw new Error('Meeting does not exist')
      }
      const meetingDoc = meetingSnapshot.data()
      await transaction.update(meetingRef, {
        [`attendees.${user.uid}`]: attendee
      })
      await transaction.set(meetingAttendeeRef, {
        meetingId,
        userUid: user.uid,
        meetingDate: meetingDoc.date,
        host: false
      })
    })
    dispatch({ type: JOIN_MEETING_SUCCESS, userUid: user.uid, attendee })
  } catch (error) {
    console.log('Error from joinMeeting: ', error)
    dispatch({ type: JOIN_MEETING_ERROR, error: { message: error.message } })
  }
}

export const leaveMeeting = meetingId => async dispatch => {
  dispatch({ type: LEAVE_MEETING_START })
  try {
    const user = firebaseAuth.currentUser
    const meetingRef = firestore.doc(`/meetings/${meetingId}`)
    const meeting_attendeeRef = firestore.doc(
      `/meeting_attendee/${meetingId}_${user.uid}`
    )
    const meetingSnapshot = await meetingRef.get()
    if (!meetingSnapshot.exists) {
      throw new Error('Meeting does not exist')
    }
    await meetingRef.update({
      [`attendees.${user.uid}`]: firebase.firestore.FieldValue.delete()
    })
    await meeting_attendeeRef.delete()
    dispatch({ type: LEAVE_MEETING_SUCCESS, userUid: user.uid })
  } catch (error) {
    console.log('Error from leaveMeeting: ', error)
    dispatch({ type: LEAVE_MEETING_ERROR, error: { message: error.message } })
  }
}

export const cancelMeetingToggle = (cancelled, meetingId) => async dispatch => {
  dispatch({ type: CANCEL_MEETING_TOGGLE_START })
  try {
    const meetingRef = firestore.doc(`/meetings/${meetingId}`)
    await meetingRef.update({
      cancelled
    })
    dispatch({ type: CANCEL_MEETING_TOGGLE_SUCCESS, cancelled })
  } catch (error) {
    console.log('Error from cancelMeetingToggle: ', error)
    dispatch({ type: CANCEL_MEETING_TOGGLE_ERROR, error: { message: error.message } })
  }
}

export const addMeetingComment = (text, parentId, formHandlers) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ADD_MEETING_COMMENT_START })
  try {
    const meetingId = getState().meetings.selectedMeeting.id
    const user = firebaseAuth.currentUser
    const commentsRef = firestore
      .collection('meetingComments')
      .doc(meetingId)
      .collection('comments')
    await commentsRef.add({
      meetingId,
      uid: user.uid,
      parentId,
      username: user.displayName,
      photoURL: user.photoURL,
      text,
      date: new Date()
    })
    formHandlers.setSubmitting(false)
    dispatch({ type: ADD_MEETING_COMMENT_SUCCESS })
  } catch (error) {
    console.log('error from addMeetingComment: ', error)
    dispatch({ type: ADD_MEETING_COMMENT_ERROR, error: { message: error.message } })
  }
}
