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
  RESET_SELECTED_MEETING,
  RESET_DASHBOARD_STATE,
  EDIT_MEETING_START,
  EDIT_MEETING_SUCCESS
} from '../actions/actionTypes'
import { firestore, firebaseAuth } from '../../firebase/firebase'
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
    _handleFormOnDatabaseErr(error.message, formHandlers)
    dispatch({ type: EDIT_MEETING_ERROR, error: { message: error.message } })
  }
}

export const fetchMeetingsForDashboard = () => async (dispatch, getState) => {
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
    console.log(error)
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
    console.log(error)
    dispatch({ type: FETCH_SELECTED_MEETING_ERROR, error: { message: error.message } })
  }
}

export const resetSelectedMeeting = () => ({ type: RESET_SELECTED_MEETING })

export const joinMeeting = meetingId => async dispatch => {
  
} 