import { firestore } from './firebase'
import defaultUserPhoto from '../assets/defaultUserPhoto.png'

// takes user object in firebaseAuth and additional fields to create our user profile in firestore
export const createUserProfile = async (userInAuth, additionalData) => {
  const userRef = firestore.doc(`users/${userInAuth.uid}`)
  try {
    const userSnapshot = await userRef.get()
    if (!userSnapshot.exists) {
      const profile = {
        createdAt: new Date(),
        username: userInAuth.displayName,
        email: userInAuth.email,
        photoURL: userInAuth.photoURL || defaultUserPhoto,
        ...additionalData
      }
      await userRef.set(profile)
    }
  } catch (error) {
    console.log('Error creating user profile: ', error.message)
  }
  return userRef
}
