import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDPHgyPSaiWGxirxuxvOFWlmSzelG4BTNY',
  authDomain: 'company-meetings.firebaseapp.com',
  databaseURL: 'https://company-meetings.firebaseio.com',
  projectId: 'company-meetings',
  storageBucket: 'company-meetings.appspot.com',
  messagingSenderId: '721275166603',
  appId: '1:721275166603:web:cfb32628dc4863df'
}

firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebase.auth()
const firestore = firebase.firestore()

export { firebase as default, firebaseAuth, firestore }
