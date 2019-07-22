import { LOGIN, LOGOUT } from '../actions/actionTypes'

const initialState = {
  user: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: {} }
    case LOGOUT:
      return { ...state, user: null }
    default:
      return state
  }
}

export default authReducer
