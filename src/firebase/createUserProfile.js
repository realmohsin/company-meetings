import { firestore } from './firebase'

export const createUserProfile = async (userInAuth, additionalData) => {
  const userRef = firestore.doc(`users/${userInAuth.uid}`)
  try {
    const userSnapshot = await userRef.get()
    if (!userSnapshot.exists) {
      const profile = {
        createdAt: new Date(),
        username: userInAuth.displayName,
        email: userInAuth.email,
        ...additionalData
      }
      await userRef.set(profile)
    }
  } catch (error) {
    console.log('Error creating user profile: ', error.message)
  }
  return userRef
}
