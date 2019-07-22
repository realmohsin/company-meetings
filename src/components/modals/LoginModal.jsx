import React from 'react'
import { css } from '@emotion/core'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

const LoginModal = ({ isSubmitting }) => {
  return (
    <div css={loginModal}>
      <div css={loginHeader}>Log In to Company Meetings</div>
      <div css={loginBodyBox}>
        <Form css={formCss}>
          <div>
            <Field type='email' name='email' placeholder='Email' />
            <ErrorMessage name='email'>
              {errMsg => <div css={errCss}>{errMsg}</div>}
            </ErrorMessage>
          </div>
          <div>
            <Field type='password' name='password' placeholder='Password' />
            <ErrorMessage name='password'>
              {errMsg => <div css={errCss}>{errMsg}</div>}
            </ErrorMessage>
          </div>
          <button disabled={isSubmitting} css={loginButton}>
            Login
          </button>
          <div>OR</div>
          <button disabled={isSubmitting} type='submit' css={googleLogin}>
            Login with Google
          </button>
        </Form>
      </div>
    </div>
  )
}

const formikEnhancer = withFormik({
  mapPropsToValues () {
    return { email: '', password: '' }
  },
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Email not valid')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be 6 characters or longer')
      .required('Password is required')
  }),
  handleSubmit (values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      console.log(values)
      setSubmitting(false)
    }, 4000)
  }
})

const loginModal = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
`

const loginHeader = css``

const loginBodyBox = css``

const formCss = css``

const loginButton = css``

const googleLogin = css``

const errCss = css``

export default formikEnhancer(LoginModal)
