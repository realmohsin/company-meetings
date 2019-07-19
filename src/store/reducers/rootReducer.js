import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  stateSliceOne: () => ({ key: 'value' }),
  stateSliceTwo: () => ({ key: 'value' }),
  stateSliceThree: () => ({ key: 'value' })
})

export default rootReducer
