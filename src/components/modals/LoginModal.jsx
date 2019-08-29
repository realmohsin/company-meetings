import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import { appBorderColor } from '../../emotion/variables'
import { authButton, googleButton } from '../../emotion/buttonCss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {
  inputBoxCss,
  inputCss,
  labelCss,
  shrunkLabelCss,
  errCss
} from '../../emotion/textInputCss'
import { login, googleLogin } from '../../store/actions/actions'
import formSubmitErrStyles from '../../emotion/formSubmitErrStyles'
import loginSchema from '../../validation/loginSchema'
import orDividerStyles from '../../emotion/orDividerStyles'

const LoginModal = ({
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
      <div css={headerCss}>Sign In</div>
      <Form css={authBodyBox} autoComplete='off'>
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
          <div css={formSubmitErrStyles}>{errors.submissionError}</div>
        )}
        <button disabled={isSubmitting} css={authButton} type='submit'>
          Sign In
        </button>
        <div css={orDividerStyles}>OR</div>
        <button
          onClick={handleGoogleLoginClick}
          disabled={isSubmitting}
          type='button'
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
    return { email: '', password: '' }
  },
  validationSchema: loginSchema,
  handleSubmit (values, { resetForm, setErrors, setSubmitting, props }) {
    props.login(values.email, values.password, { resetForm, setErrors, setSubmitting })
  }
})

// styles

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

const googleIcon = css`
  margin-right: 1rem;
`

export default connect(
  null,
  { login, googleLogin }
)(formikEnhancer(LoginModal))
