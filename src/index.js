import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store/store'
import history from './history/history'
import { firebaseAuth, firestore } from './firebase/firebase'
import { setUser } from './store/actions/actions'

const application = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)

window.unsubFromAuthIndexPage = firebaseAuth.onAuthStateChanged(async userInAuth => {
  if (!userInAuth) {
    store.dispatch(setUser(null))
  } else {
    const userRef = firestore.doc(`users/${userInAuth.uid}`)
    try {
      const userSnapshot = await userRef.get()
      store.dispatch(
        setUser({
          uid: userSnapshot.id,
          ...userSnapshot.data()
        })
      )
    } catch (error) {
      console.log('Error Setting User Before App Render: ', error.message)
    }
  }
  ReactDOM.render(application, document.getElementById('root'))
})
