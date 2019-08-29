import * as yup from 'yup'

const pwResetSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password is too short')
    .required('Password is required'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password Confirmation is required')
})

export default pwResetSchema
