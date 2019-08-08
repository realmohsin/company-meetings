import {
  SET_USER,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  UPDATE_PROFILE_BASICS_START,
  UPDATE_PROFILE_BASICS_SUCCESS,
  UPDATE_PROFILE_BASICS_ERROR,
  UPDATE_PROFILE_ABOUT_START,
  UPDATE_PROFILE_ABOUT_SUCCESS,
  UPDATE_PROFILE_ABOUT_ERROR
} from '../actions/actionTypes'

const initialState = {
  user: null,
  loading: false,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
      }
    case REGISTER_START:
    case LOGIN_START:
    case UPDATE_PROFILE_BASICS_START:
    case UPDATE_PROFILE_ABOUT_START:
      return { ...state, error: null, loading: true }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case UPDATE_PROFILE_BASICS_SUCCESS:
      return { ...state, loading: false, error: null }
    case REGISTER_ERROR:
    case LOGIN_ERROR:
    case UPDATE_PROFILE_BASICS_ERROR:
    case UPDATE_PROFILE_ABOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    case UPDATE_PROFILE_ABOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: {
          ...state.user,
          ...action.updatedValues
        }
      }
    default:
      return state
  }
}

export default authReducer
