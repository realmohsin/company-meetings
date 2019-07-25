import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from './actionTypes'
import { firebaseAuth, googleProvider, firestore } from '../../firebase/firebase'

export const register = (username, email, password, formHandlers) => async (
  dispatch,
  getState
) => {
  dispatch({ type: REGISTER_START })
  try {
    const authData = await firebaseAuth.createUserWithEmailAndPassword(email, password)
    const user = authData.user
  } catch (error) {
    console.log(error)
    formHandlers.resetForm()
    formHandlers.setErrors({ submissionError: error.message })
    formHandlers.setSubmitting(false)
    dispatch({ type: REGISTER_ERROR, error })
  }
}

export const login = (email, password, formHandlers) => async (dispatch, getState) => {
  dispatch({ type: LOGIN_START })
  try {
    const authData = await firebaseAuth.signInWithEmailAndPassword(email, password)
    console.log(authData)
  } catch (error) {
    console.log(error)
    formHandlers.resetForm()
    formHandlers.setErrors({ submissionError: 'Login Failed' })
    formHandlers.setSubmitting(false)
    dispatch({ type: LOGIN_ERROR, error })
  }
}

export const googleLogin = formHandlers => async (dispatch, getState) => {
  dispatch({ type: LOGIN_START })
  try {
    const something = await firebaseAuth.signInWithPopup(googleProvider)
    console.log(something)
    console.log(formHandlers)
    formHandlers.setErrors({ submissionError: 'Fake Error ' })
  } catch (error) {
    console.log(error)
    formHandlers.resetForm()
    formHandlers.setErrors({ submissionError: 'Login Failed' })
    formHandlers.setSubmitting(false)
    dispatch({ type: LOGIN_ERROR, error })
  }
}
