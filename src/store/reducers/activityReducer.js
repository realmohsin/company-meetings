import {
  ACTIVITY_LISTENER_CALLBACK_START,
  ACTIVITY_LISTENER_CALLBACK_SUCCESS,
  ACTIVITY_LISTENER_CALLBACK_ERROR
} from '../actions/actionTypes'

const initialState = {
  activities: [],
  error: null
}

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVITY_LISTENER_CALLBACK_START:
      return {
        ...state,
        error: null
      }
    case ACTIVITY_LISTENER_CALLBACK_SUCCESS:
      return {
        ...state,
        activities: action.activities
      }
    case ACTIVITY_LISTENER_CALLBACK_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default activityReducer
