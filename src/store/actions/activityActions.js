import {
  ACTIVITY_LISTENER_CALLBACK_START,
  ACTIVITY_LISTENER_CALLBACK_SUCCESS,
  ACTIVITY_LISTENER_CALLBACK_ERROR
} from './actionTypes'

// these are listener functions to be given to onSnapshot observer

export const onSuccessActivityListener = querySnapshot => dispatch => {
  dispatch({ type: ACTIVITY_LISTENER_CALLBACK_START })
  const activities = []
  querySnapshot.forEach(docSnapshot => activities.push(docSnapshot.data()))
  console.log(activities)
  dispatch({ type: ACTIVITY_LISTENER_CALLBACK_SUCCESS, activities })
}

export const onErrorActivityListener = error => dispatch => {
  console.log('error from onErrorActivityListener: ', error)
  dispatch({
    type: ACTIVITY_LISTENER_CALLBACK_ERROR,
    error: { message: error.message }
  })
}
