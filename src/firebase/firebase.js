import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// const firebaseConfig = {
//   apiKey: 'AIzaSyDPHgyPSaiWGxirxuxvOFWlmSzelG4BTNY',
//   authDomain: 'company-meetings.firebaseapp.com',
//   databaseURL: 'https://company-meetings.firebaseio.com',
//   projectId: 'company-meetings',
//   storageBucket: 'company-meetings.appspot.com',
//   messagingSenderId: '721275166603',
//   appId: '1:721275166603:web:cfb32628dc4863df'
// }

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

firebase.initializeApp(firebaseConfig)

const firebaseAuth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()

const firestore = firebase.firestore()

const firebaseStorage = firebase.storage()

export {
  firebase as default,
  firebaseAuth,
  googleProvider,
  firestore,
  firebaseStorage
}
