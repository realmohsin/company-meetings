import * as yup from 'yup'

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Not Valid Email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password is too short')
    .required('Password is required')
})

export default loginSchema
