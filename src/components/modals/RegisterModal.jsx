import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
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
import { register, googleLogin } from '../../store/actions/actions'
import registerSchema from '../../validation/registerSchema'
import formSubmitErrStyles from '../../emotion/formSubmitErrStyles'
import orDividerStyles from '../../emotion/orDividerStyles'
import {
  modalStyles,
  headerCss,
  authBodyBox,
  googleIcon
} from '../../emotion/modalStyles'

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
    <div css={modalStyles}>
      <div css={headerCss}>Register</div>
      <Form css={authBodyBox} autoComplete='off'>
        <div css={inputBoxCss}>
          <Field type='text' name='username' css={inputCss} />
          <label
            css={css`
              ${labelCss};
              ${values.username.length > 0 && shrunkLabelCss};
            `}
          >
            Name
          </label>
          <ErrorMessage name='username'>
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
          <div css={formSubmitErrStyles}>{errors.submissionError}</div>
        )}
        <button type='submit' disabled={isSubmitting} css={authButton}>
          Register
        </button>
        <div css={orDividerStyles}>OR</div>
        <button
          onClick={handleGoogleLoginClick}
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
  validationSchema: registerSchema,
  handleSubmit (values, { resetForm, setErrors, setSubmitting, props }) {
    props.register(values.username, values.email, values.password, {
      resetForm,
      setErrors,
      setSubmitting
    })
  }
})

export default connect(
  null,
  { register, googleLogin }
)(formikEnhancer(RegisterModal))
