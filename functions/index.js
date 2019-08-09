const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const createActivity = (type, meeting, id) => {
  return {
    type,
    meetingDate: meeting.date,
    hostName: meeting.hostName,
    title: meeting.title,
    hostPhotoURL: meeting.hostPhotoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    hostUid: meeting.hostUid,
    meetingId: id
  }
}

exports.addNewMeetingActivity = functions.firestore
  .document('meetings/{meetingId}')
  .onCreate(e => {
    const newMeeting = e.data()
    const activity = createActivity('newMeeting', newMeeting, e.id)
    console.log({ activity })
    return admin
      .firestore()
      .collection('activities')
      .add(activity)
      .then(docRef => {
        return console.log('Activity created with Id: ', docRef.id)
      })
      .catch(error => {
        return console.log('Error adding activity', error)
      })
  })

exports.addMeetingCancelledActivity = functions.firestore
  .document('meetings/{meetingId}')
  .onUpdate((e, context) => {
    const updatedMeeting = e.after.data()
    const meetingBeforeUpdate = e.before.data()
    if (
      !updatedMeeting.cancelled ||
      updatedMeeting.cancelled === meetingBeforeUpdate.cancelled
    ) {
      return false
    }
    const activity = createActivity(
      'meetingCancelled',
      updatedMeeting,
      context.params.meetingId
    )
    console.log({ activity })
    return admin
      .firestore()
      .collection('activities')
      .add(activity)
      .then(docRef => {
        return console.log('Activity created with Id: ', docRef.id)
      })
      .catch(error => {
        return console.log('Error adding activity: ', error)
      })
  })
