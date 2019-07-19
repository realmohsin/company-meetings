import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import App from './App'
import store from './store/store'

const history = createBrowserHistory()

const domTree = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)

render(domTree, document.getElementById('root'))
