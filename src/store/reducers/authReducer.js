import {
  SET_USER,
  SET_USER_PHOTOS,
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
  UPDATE_PROFILE_ABOUT_ERROR,
  FETCH_PROFILE_MEETINGS_START,
  FETCH_PROFILE_MEETINGS_SUCCESS,
  FETCH_PROFILE_MEETINGS_ERROR,
  FETCH_PROFILE_PHOTOS_START,
  FETCH_PROFILE_PHOTOS_ERROR
} from '../actions/actionTypes'
import defaultUserPhoto from '../../assets/defaultUserPhoto.png'

const initialState = {
  user: null,
  photos: [],
  profileMeetings: null,
  loading: false,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      if (action.user && action.user.photoURL === '') {
        action.user.photoURL = defaultUserPhoto
      }
      return {
        ...state,
        user: action.user
      }
    case SET_USER_PHOTOS:
      return {
        ...state,
        photos: action.photos
      }
    case REGISTER_START:
    case LOGIN_START:
    case UPDATE_PROFILE_BASICS_START:
    case UPDATE_PROFILE_ABOUT_START:
    case FETCH_PROFILE_MEETINGS_START:
    case FETCH_PROFILE_PHOTOS_START:
      return { ...state, error: null, loading: true }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case UPDATE_PROFILE_BASICS_SUCCESS:
      return { ...state, loading: false, error: null }
    case REGISTER_ERROR:
    case LOGIN_ERROR:
    case UPDATE_PROFILE_BASICS_ERROR:
    case UPDATE_PROFILE_ABOUT_ERROR:
    case FETCH_PROFILE_PHOTOS_ERROR:
    case FETCH_PROFILE_MEETINGS_ERROR:
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
    case FETCH_PROFILE_MEETINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profileMeetings: action.profileMeetings
      }
    default:
      return state
  }
}

export default authReducer
