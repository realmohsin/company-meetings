import * as yup from 'yup'

const aboutSettingsSchema = yup.object().shape({
  jobTitle: yup.string().required('Job Title is required'),
  department: yup.string().required('Department is required'),
  lunchBreak: yup.date().required('Lunch Break time is required'),
  hours: yup.string().required('Hours is required')
})

export default aboutSettingsSchema
