import * as yup from 'yup'

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Username is too short')
    .max(18, 'Username is too long')
    .required('Username is required'),
  email: yup
    .string()
    .email('Not Valid Email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password is too short')
    .required('Password is required')
})

export default registerSchema
