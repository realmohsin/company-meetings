import { combineReducers } from 'redux'
import authReducer from './authReducer'
import sideDrawerReducer from './sideDrawerReducer'
import modalReducer from './modalReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  isSideDrawerOpen: sideDrawerReducer
})

export default rootReducer
