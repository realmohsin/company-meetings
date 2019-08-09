import { combineReducers } from 'redux'
import authReducer from './authReducer'
import sideDrawerReducer from './sideDrawerReducer'
import modalReducer from './modalReducer'
import meetingReducer from './meetingReducer'
import activityReducer from './activityReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  meetings: meetingReducer,
  activities: activityReducer,
  modal: modalReducer,
  isSideDrawerOpen: sideDrawerReducer
})

export default rootReducer
