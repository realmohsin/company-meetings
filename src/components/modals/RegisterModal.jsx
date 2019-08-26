import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { appBorderColor } from '../../emotion/variables'
import buttonCss from '../../emotion/buttonCss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {
  inputBoxCss,
  inputCss,
  labelCss,
  shrunkLabelCss,
  errCss
} from '../../emotion/textInputCss'
import { register, googleLogin } from '../../store/actions/actions'

const RegisterModal = ({
  values,
  errors,
  isSubmitting,
  googleLogin,
  setSubmitting,
  setErrors,
  resetForm
}) => {
  const handleGoogleLoginClick = () => {
    setSubmitting(true)
    googleLogin({ setSubmitting, setErrors, resetForm })
  }

  return (
    <div css={authModal}>
      <div css={headerCss}>Register</div>
      <Form css={authBodyBox} autoComplete='off'>
        <div css={inputBoxCss}>
          <Field type='text' name='username' css={inputCss} />
          <label
            css={css`
              ${labelCss};
              ${values.email.length > 0 && shrunkLabelCss};
            `}
          >
            Username
          </label>
          <ErrorMessage name='email'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
        </div>
        <div css={inputBoxCss}>
          <Field type='email' name='email' css={inputCss} />
          <label
            css={css`
              ${labelCss};
              ${values.email.length > 0 && shrunkLabelCss};
            `}
          >
            Email
          </label>
          <ErrorMessage name='email'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
        </div>
        <div css={inputBoxCss}>
          <Field type='password' name='password' css={inputCss} />
          <label
            css={css`
              ${labelCss};
              ${values.password.length > 0 && shrunkLabelCss};
            `}
          >
            Password
          </label>
          <ErrorMessage name='password'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
        </div>
        {errors && errors.submissionError && (
          <div css={submissionError}>{errors.submissionError}</div>
        )}
        <button type='submit' disabled={isSubmitting} css={authButton}>
          Register
        </button>
        <div css={orDivider}>OR</div>
        <button
          onClick={handleGoogleLoginClick}
          type='button'
          disabled={isSubmitting}
          type='submit'
          css={googleButton}
        >
          <FontAwesomeIcon icon={faGoogle} css={googleIcon} /> Login with Google
        </button>
      </Form>
    </div>
  )
}

const formikEnhancer = withFormik({
  mapPropsToValues () {
    return { username: '', email: '', password: '' }
  },
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .min(2, 'Username is too short')
      .max(21, 'Username is too long')
      .required('Username is required'),
    email: yup
      .string()
      .email('Not Valid Email')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password is too short')
      .required('Password is required')
  }),
  handleSubmit (values, { resetForm, setErrors, setSubmitting, props }) {
    props.register(values.username, values.email, values.password, {
      resetForm,
      setErrors,
      setSubmitting
    })
  }
})

const authModal = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  width: 37rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
`

const headerCss = css`
  font-weight: bold;
  text-align: center;
  font-size: 2.4rem;
  border-bottom: 1px solid ${appBorderColor};
  padding: 1.3rem 0;
`

const authBodyBox = css`
  margin: 1.5rem;
  padding: 0 2.6rem 3rem;
  border: 1px solid ${appBorderColor};
  border-radius: 0.5rem;
`

const authButton = css`
  ${buttonCss};
  margin-top: 1.9rem;
  padding: 1rem 0;
  width: 100%;
`

const googleButton = css`
  ${buttonCss};
  padding: 1rem 0;
  width: 100%;
  background: #dd4b39;
`

const orDivider = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 11rem;
    height: 1px;
    top: 49%;
    left: 0.1rem;
    background: ${appBorderColor};
  }
  &::after {
    content: '';
    position: absolute;
    width: 11rem;
    height: 1px;
    top: 49%;
    right: 0.1rem;
    background: ${appBorderColor};
  }
`

const googleIcon = css`
  margin-right: 1rem;
`

const submissionError = css`
  border: 1px solid red;
  border-radius: 0.4rem;
  color: red;
  text-align: center;
  padding: 1rem 0;
  margin-top: 2rem;
`

export default connect(
  null,
  { register, googleLogin }
)(formikEnhancer(RegisterModal))
