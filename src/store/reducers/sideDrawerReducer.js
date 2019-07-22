import {
  SHOW_SIDEDRAWER,
  HIDE_SIDEDRAWER,
  TOGGLE_SIDEDRAWER
} from '../actions/actionTypes'

const sideDrawerReducer = (state = false, action) => {
  switch (action.type) {
    case SHOW_SIDEDRAWER:
      return true
    case HIDE_SIDEDRAWER:
      return false
    case TOGGLE_SIDEDRAWER:
      return !state
    default:
      return state
  }
}

export default sideDrawerReducer
