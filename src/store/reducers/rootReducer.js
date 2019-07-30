import { combineReducers } from 'redux'
import authReducer from './authReducer'
import sideDrawerReducer from './sideDrawerReducer'
import modalReducer from './modalReducer'
import meetingReducer from './meetingReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  meetings: meetingReducer,
  modal: modalReducer,
  isSideDrawerOpen: sideDrawerReducer
})

export default rootReducer
