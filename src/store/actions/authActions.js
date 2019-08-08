import {
  SET_USER,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR
} from './actionTypes'
import { firebaseAuth, googleProvider } from '../../firebase/firebase'
import { closeModal } from './modalActions'
import { createUserProfile } from '../../firebase/createUserProfile'
import history from '../../history/history'

const _handleFormOnSubmissionErr = (errMsg, formHandlers) => {
  formHandlers.resetForm()
  formHandlers.setErrors({ submissionError: errMsg })
  formHandlers.setSubmitting(false)
}

export const setUser = user => ({ type: SET_USER, user })

export const register = (username, email, password, formHandlers) => async dispatch => {
  dispatch({ type: REGISTER_START })
  try {
    await firebaseAuth.createUserWithEmailAndPassword(email, password)
    const userInAuth = firebaseAuth.currentUser
    await userInAuth.updateProfile({
      displayName: username
    })
    await createUserProfile(userInAuth)
    formHandlers.setSubmitting(false)
    dispatch({ type: REGISTER_SUCCESS })
    dispatch(closeModal())
  } catch (error) {
    console.log(error)
    _handleFormOnSubmissionErr(error.message, formHandlers)
    dispatch({ type: REGISTER_ERROR, error: { message: error.message } })
  }
}

export const login = (email, password, formHandlers) => async dispatch => {
  dispatch({ type: LOGIN_START })
  try {
    await firebaseAuth.signInWithEmailAndPassword(email, password)
    formHandlers.setSubmitting(false)
    dispatch({ type: LOGIN_SUCCESS })
    dispatch(closeModal())
  } catch (error) {
    console.log(error)
    _handleFormOnSubmissionErr('Login Failed', formHandlers)
    dispatch({ type: LOGIN_ERROR, error: { message: error.message } })
  }
}

export const googleLogin = formHandlers => async dispatch => {
  dispatch({ type: LOGIN_START })
  try {
    const signInInfo = await firebaseAuth.signInWithPopup(googleProvider)
    if (signInInfo.additionalUserInfo.isNewUser) {
      const userInAuth = firebaseAuth.currentUser
      await createUserProfile(userInAuth)
    }
    dispatch({ type: LOGIN_SUCCESS })
    dispatch(closeModal())
  } catch (error) {
    console.log(error)
    _handleFormOnSubmissionErr('Login Failed', formHandlers)
    dispatch({ type: LOGIN_ERROR, error: { message: error.message } })
  }
}

export const logout = () => async dispatch => {
  try {
    await firebaseAuth.signOut()
    dispatch({ type: LOGOUT })
  } catch (error) {
    console.log(error)
  }
}

export const changePassword = (password, formHandlers) => async dispatch => {
  dispatch({ type: CHANGE_PASSWORD_START })
  try {
    const user = firebaseAuth.currentUser
    await user.updatePassword(password)
    formHandlers.setSubmitting(false)
    dispatch({ type: CHANGE_PASSWORD_SUCCESS })
    history.push(`/people/${user.uid}`)
  } catch (error) {
    console.log('error from changePassword: ', error.message)
    _handleFormOnSubmissionErr('Changing Password Failed', formHandlers)
    dispatch({ type: CHANGE_PASSWORD_ERROR, error: { message: error.message } })
  }
}
