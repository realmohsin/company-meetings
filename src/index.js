import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import App from './App'
import store from './store/store'

export const history = createBrowserHistory()

const application = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)

render(application, document.getElementById('root'))
