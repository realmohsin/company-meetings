import * as yup from 'yup'

const meetingValidationSchema = yup.object().shape({
  title: yup
    .string()
    .max(30, 'Title is too long')
    .required('Title is required'),
  date: yup.date().required('Date is required'),
  startTime: yup.date().required('Start time is required'),
  endTime: yup.date().required('End time is required'),
  department: yup.string().required('Department is required'),
  building: yup.string().required('Building is required'),
  room: yup.string().required('Room is required')
})

export default meetingValidationSchema
