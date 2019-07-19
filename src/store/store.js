import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'

const middlewares = [thunk]
const enhancers = [applyMiddleware(...middlewares)]
let composedEnhancers

if (process.env.NODE_ENV === 'production') {
  composedEnhancers = compose(...enhancers)
} else {
  composedEnhancers = composeWithDevTools(...enhancers)
}

const store = createStore(rootReducer, composedEnhancers)

export default store
