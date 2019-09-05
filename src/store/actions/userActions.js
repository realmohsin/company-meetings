import {
  UPDATE_PROFILE_BASICS_START,
  UPDATE_PROFILE_BASICS_SUCCESS,
  UPDATE_PROFILE_BASICS_ERROR,
  UPDATE_PROFILE_ABOUT_START,
  UPDATE_PROFILE_ABOUT_SUCCESS,
  UPDATE_PROFILE_ABOUT_ERROR,
  ADD_PROFILE_PHOTO_START,
  ADD_PROFILE_PHOTO_SUCCESS,
  ADD_PROFILE_PHOTO_ERROR,
  SET_USER_PHOTOS,
  SET_MAIN_PHOTO_START,
  SET_MAIN_PHOTO_SUCCESS,
  SET_MAIN_PHOTO_ERROR,
  DELETE_PHOTO_START,
  DELETE_PHOTO_SUCCESS,
  DELETE_PHOTO_ERROR,
  FETCH_PROFILE_PHOTOS_START,
  FETCH_PROFILE_PHOTOS_SUCCESS,
  FETCH_PROFILE_PHOTOS_ERROR,
  FETCH_PROFILE_MEETINGS_START,
  FETCH_PROFILE_MEETINGS_SUCCESS,
  FETCH_PROFILE_MEETINGS_ERROR,
  FETCH_SOMEONE_ELSE_PROFILE_START,
  FETCH_SOMEONE_ELSE_PROFILE_SUCCESS,
  FETCH_SOMEONE_ELSE_PROFILE_ERROR
} from './actionTypes'
import cuid from 'cuid'
import firebase, {
  firebaseAuth,
  firebaseStorage,
  firestore
} from '../../firebase/firebase'
import history from '../../history/history'

const _handleFormOnDatabaseErr = (errMsg, formHandlers) => {
  formHandlers.resetForm()
  formHandlers.setErrors({ submissionError: errMsg })
  formHandlers.setSubmitting(false)
}

export const setUserPhotos = photos => ({ type: SET_USER_PHOTOS, photos })

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

export const addPhotoToProfile = imageBlob => async dispatch => {
  dispatch({ type: ADD_PROFILE_PHOTO_START })
  try {
    const user = firebaseAuth.currentUser
    const imageName = cuid()
    const storageRef = firebaseStorage.ref()
    const imageRef = storageRef.child(`${user.uid}/profilePhotos/${imageName}`)
    await imageRef.put(imageBlob)
    const downloadURL = await imageRef.getDownloadURL()

    const userProfileRef = firestore.collection('users').doc(user.uid)
    const photosSubCollectionRef = userProfileRef.collection('photos')
    await photosSubCollectionRef.add({
      photoName: imageName,
      url: downloadURL
    })
    const photosSnapshot = await photosSubCollectionRef.get()
    if (photosSnapshot.size === 1) {
      dispatch(setMainPhoto(downloadURL))
    }
    dispatch({ type: ADD_PROFILE_PHOTO_SUCCESS })
  } catch (error) {
    console.log('error from addPhotoToProfile: ', error.message)
    dispatch({ type: ADD_PROFILE_PHOTO_ERROR, error: { message: error.message } })
  }
}

export const setMainPhoto = imageURL => async dispatch => {
  dispatch({ type: SET_MAIN_PHOTO_START })
  try {
    const user = firebaseAuth.currentUser
    const userProfileRef = firestore.collection('users').doc(user.uid)

    await user.updateProfile({
      photoURL: imageURL
    })

    const batch = firestore.batch()
    batch.update(userProfileRef, {
      photoURL: imageURL
    })

    const meetingAttendeeQuerySnap = await firestore
      .collection('meeting_attendee')
      .where('userUid', '==', user.uid)
      .get()

    for (let i = 0; i < meetingAttendeeQuerySnap.length; i++) {
      const meetingId = meetingAttendeeQuerySnap.docs[i].data().meetingId
      const meetingRef = firestore.doc(`/meetings/${meetingId}`)
      batch.update(meetingRef, {
        [`attendees.${user.uid}.photoURL`]: imageURL
      })
      const meetingSnap = meetingRef.get()
      if (meetingSnap.data().hostUid === user.uid) {
        batch.update(meetingRef, {
          hostPhotoURL: imageURL
        })
      }
    }
    await batch.commit()
    dispatch({ type: SET_MAIN_PHOTO_SUCCESS })
  } catch (error) {
    console.log('error from setMainPhoto: ', error.message)
    dispatch({ type: SET_MAIN_PHOTO_ERROR, error: { message: error.message } })
  }
}

export const deletePhotoFromProfile = (id, photoName, imageURL) => async dispatch => {
  dispatch({ type: DELETE_PHOTO_START })
  try {
    const user = firebaseAuth.currentUser

    const storageRef = firebaseStorage.ref()
    const imageRef = storageRef.child(`${user.uid}/profilePhotos/${photoName}`)
    await imageRef.delete()

    const userProfileRef = firestore.doc(`/users/${user.uid}`)
    const userProfileSnap = await userProfileRef.get()
    const userPhotoURL = userProfileSnap.data().photoURL
    console.log('userPhotoURL: ', userPhotoURL, 'imageURL: ', imageURL)
    if (userPhotoURL === imageURL) {
      await userProfileRef.update({
        photoURL: ''
      })
    }

    await userProfileRef
      .collection('photos')
      .doc(id)
      .delete()
    dispatch({ type: DELETE_PHOTO_SUCCESS })
  } catch (error) {
    console.log('error from deletePhotoFromProfile: ', error.message)
    dispatch({ type: DELETE_PHOTO_ERROR, error: { message: error.message } })
  }
}

export const fetchSomeoneElsesProfile = uid => async dispatch => {
  dispatch({ type: FETCH_SOMEONE_ELSE_PROFILE_START })
  try {
    const someoneElsesProfileSnap = await firestore.doc(`/users/${uid}`).get()
    dispatch({
      type: FETCH_SOMEONE_ELSE_PROFILE_SUCCESS,
      someoneElsesProfile: {
        ...someoneElsesProfileSnap.data(),
        uid
      }
    })
  } catch (error) {
    console.log('error from fetchSomeoneElsesProfile: ', error.message)
    dispatch({
      type: FETCH_SOMEONE_ELSE_PROFILE_ERROR,
      error: { message: error.message }
    })
  }
}

export const fetchProfilePhotos = uid => async (dispatch, getState) => {
  dispatch({ type: FETCH_PROFILE_PHOTOS_START })
  try {
    const photosQuerySnapshot = await firestore
      .doc(`/users/${uid}`)
      .collection('photos')
      .get()
    if (photosQuerySnapshot.size === 0) {
      dispatch({ type: FETCH_PROFILE_PHOTOS_SUCCESS })
      dispatch(setUserPhotos([]))
    } else {
      const photos = []
      photosQuerySnapshot.forEach(docSnapshot => {
        photos.push({
          ...docSnapshot.data(),
          id: docSnapshot.id
        })
      })
      dispatch({ type: FETCH_PROFILE_PHOTOS_SUCCESS })
      dispatch(setUserPhotos(photos))
    }
  } catch (error) {
    console.log('error from fetchProfilePhotos: ', error.message)
    dispatch({ type: FETCH_PROFILE_PHOTOS_ERROR, error: { message: error.message } })
  }
}

export const fetchProfileMeetings = uid => async dispatch => {
  dispatch({ type: FETCH_PROFILE_MEETINGS_START })
  try {
    const meetingAttendeeRef = firestore.collection('meeting_attendee')
    const meetingsRef = firestore.collection('meetings')
    const profileMeetings = {
      upcomingMeetings: [],
      attendedMeetings: [],
      hostedMeetings: []
    }

    const upcomingMeetingsSnap = await meetingAttendeeRef
      .where('userUid', '==', uid)
      .where('date', '>=', new Date())
      .orderBy('date')
      .limit(3)
      .get()
    upcomingMeetingsSnap.forEach(async docSnap => {
      const meetingId = docSnap.data().meetingId
      const meetingSnap = await meetingsRef.doc(meetingId).get()
      const meeting = meetingSnap.data()
      profileMeetings.upcomingMeetings.push({
        meetingTitle: meeting.title,
        meetingId: meetingSnap.id,
        meetingDate: meeting.date
      })
    })

    const attendedMeetingsSnap = await meetingAttendeeRef
      .where('userUid', '==', uid)
      .where('date', '<=', new Date())
      .orderBy('date')
      .limit(3)
      .get()
    attendedMeetingsSnap.forEach(async docSnap => {
      const meetingId = docSnap.data().meetingId
      const meetingSnap = await meetingsRef.doc(meetingId).get()
      const meeting = meetingSnap.data()
      profileMeetings.attendedMeetings.push({
        meetingTitle: meeting.title,
        meetingId: meetingSnap.id,
        meetingDate: meeting.date
      })
    })

    const hostedMeetingsSnap = await meetingAttendeeRef
      .where('userUid', '==', uid)
      .where('host', '==', true)
      .where('date', '<=', new Date())
      .orderBy('date')
      .limit(3)
      .get()
    hostedMeetingsSnap.forEach(async docSnap => {
      const meetingId = docSnap.data().meetingId
      const meetingSnap = await meetingsRef.doc(meetingId).get()
      const meeting = meetingSnap.data()
      profileMeetings.hostedMeetings.push({
        meetingTitle: meeting.title,
        meetingId: meetingSnap.id,
        meetingDate: meeting.date
      })
    })

    dispatch({ type: FETCH_PROFILE_MEETINGS_SUCCESS, profileMeetings })
  } catch (error) {
    console.log('error from fetchProfileMeetings: ', error.message)
    dispatch({ type: FETCH_PROFILE_MEETINGS_ERROR, error: { message: error.message } })
  }
}
