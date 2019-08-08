import {
  UPDATE_PROFILE_BASICS_START,
  UPDATE_PROFILE_BASICS_SUCCESS,
  UPDATE_PROFILE_BASICS_ERROR,
  UPDATE_PROFILE_ABOUT_START,
  UPDATE_PROFILE_ABOUT_SUCCESS,
  UPDATE_PROFILE_ABOUT_ERROR
} from './actionTypes'
import firebase, { firebaseAuth, firestore } from '../../firebase/firebase'
import history from '../../history/history'

const _handleFormOnDatabaseErr = (errMsg, formHandlers) => {
  formHandlers.resetForm()
  formHandlers.setErrors({ submissionError: errMsg })
  formHandlers.setSubmitting(false)
}

export const updateProfileBasics = (values, formHandlers) => async dispatch => {
  dispatch({ type: UPDATE_PROFILE_BASICS_START })
  try {
    const user = firebaseAuth.currentUser
    if (values.username && values.username !== user.displayName) {
      await user.updateProfile({
        displayName: values.username
      })
      const meetingAttendeesQuerySnapshot = await firestore
        .collection('meeting_attendee')
        .where('userUid', '==', user.uid)
        .where('meetingDate', '>', new Date(Date.now()))
        .get()
      const batch = firestore.batch()
      for (let i = 0; i < meetingAttendeesQuerySnapshot.docs.length; i++) {
        const meetingRef = firestore
          .collection('meetings')
          .doc(meetingAttendeesQuerySnapshot.docs[i].data().meetingId)
        const meetingSnapshot = await meetingRef.get()
        const meeting = meetingSnapshot.data()
        if (meeting.hostUid === user.uid) {
          batch.update(meetingRef, {
            hostName: values.username,
            [`attendees.${user.uid}.username`]: values.username
          })
        } else {
          batch.update(meetingRef, {
            [`attendees.${user.uid}.username`]: values.username
          })
        }
      }
      await batch.commit()
    }
    if (values.email && values.email !== user.email) {
      await user.updateEmail(values.email)
    }
    const profileRef = firestore.doc(`/users/${user.uid}`)
    await profileRef.update(values)
    formHandlers.setSubmitting(false)
    dispatch({ type: UPDATE_PROFILE_BASICS_SUCCESS, updatedValues: values })
    history.push(`/people/${user.uid}`)
  } catch (error) {
    console.log('Error from updateProfileBasics: ', error)
    _handleFormOnDatabaseErr(error.message, formHandlers)
    dispatch({ type: UPDATE_PROFILE_BASICS_ERROR, error: { message: error.message } })
  }
}

export const updateProfileAbout = (values, formHandlers) => async dispatch => {
  dispatch({ type: UPDATE_PROFILE_ABOUT_START })
  try {
    const user = firebaseAuth.currentUser
    const profileRef = firestore.doc(`/users/${user.uid}`)
    profileRef.update(values)
    formHandlers.setSubmitting(false)
    dispatch({
      type: UPDATE_PROFILE_ABOUT_SUCCESS,
      updatedValues: {
        ...values,
        lunchBreak: firebase.firestore.Timestamp.fromDate(values.lunchBreak)
      }
    })
    history.push(`/people/${user.uid}`)
  } catch (error) {
    console.log('Error from updateProfileAbout: ', error)
    _handleFormOnDatabaseErr(error.message, formHandlers)
    dispatch({ type: UPDATE_PROFILE_ABOUT_ERROR, error: { message: error.message } })
  }
}
