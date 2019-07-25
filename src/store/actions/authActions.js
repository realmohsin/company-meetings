import {
  SET_USER,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from './actionTypes'
import { firebaseAuth, googleProvider } from '../../firebase/firebase'
import { closeModal } from './modalActions'

const _handleFormOnSubmissionErr = (errMsg, formHandlers) => {
  formHandlers.resetForm()
  formHandlers.setErrors({ submissionError: errMsg })
  formHandlers.setSubmitting(false)
}

export const setUser = user => ({ type: SET_USER, user })

export const unsetUser = () => ({ type: UNSET_USER })

export const register = (username, email, password, formHandlers) => async dispatch => {
  dispatch({ type: REGISTER_START })
  try {
    await firebaseAuth.createUserWithEmailAndPassword(email, password)
    const userInAuth = firebaseAuth.currentUser
    await userInAuth.updateProfile({
      displayName: username
    })
    formHandlers.setSubmitting(false)
    dispatch({ type: REGISTER_SUCCESS })
    dispatch(closeModal())
  } catch (error) {
    console.log(error)
    _handleFormOnSubmissionErr(error.message, formHandlers)
    dispatch({ type: REGISTER_ERROR, error })
  }
}

export const login = (email, password, formHandlers) => async (dispatch, getState) => {
  dispatch({ type: LOGIN_START })
  try {
    await firebaseAuth.signInWithEmailAndPassword(email, password)
    formHandlers.setSubmitting(false)
    dispatch({ type: LOGIN_SUCCESS })
    dispatch(closeModal())
  } catch (error) {
    console.log(error)
    _handleFormOnSubmissionErr('Login Failed', formHandlers)
    dispatch({ type: LOGIN_ERROR, error })
  }
}

export const googleLogin = formHandlers => async (dispatch, getState) => {
  dispatch({ type: LOGIN_START })
  try {
    await firebaseAuth.signInWithPopup(googleProvider)
    dispatch({ type: LOGIN_SUCCESS })
    dispatch(closeModal())
  } catch (error) {
    console.log(error)
    _handleFormOnSubmissionErr('Login Failed', formHandlers)
    dispatch({ type: LOGIN_ERROR, error })
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
