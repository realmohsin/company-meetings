import * as yup from 'yup'

const basicSettingsSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Username is too short')
    .required('Username is required'),
  email: yup
    .string()
    .email('Not Valid Email')
    .required('Email is required'),
  birthday: yup.date().required('Birthday is required')
})

export default basicSettingsSchema
