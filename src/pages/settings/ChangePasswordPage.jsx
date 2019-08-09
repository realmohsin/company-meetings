import React from 'react'
import { css } from '@emotion/core'
import firebase, { firebaseAuth } from '../../firebase/firebase'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { pagePadding, appBorderColor, appTeal } from '../../emotion/variables'
import {
  inputBoxCss,
  inputCss,
  labelCss,
  shrunkLabelCss,
  errCss
} from '../../emotion/textInputCss'
import buttonCss from '../../emotion/buttonCss'

const ChangePasswordPage = ({ user, values, errors, isSubmitting }) => {
  if (user.authMethod && user.authMethod !== 'password') {
    return (
      <div>
        You have chosen to be authenticated through Google. Change your password through
        them.
      </div>
    )
  }
  return (
    <div>
      <h2>Change Password</h2>
      <Form css={formCss} autoComplete='off'>
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

        <div css={inputBoxCss}>
          <Field type='password' name='password_confirm' css={inputCss} />
          <label
            css={css`
              ${labelCss};
              ${values.password_confirm.length > 0 && shrunkLabelCss};
            `}
          >
            Confirm Password
          </label>
          <ErrorMessage name='password_confirm'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
        </div>

        <button type='submit' css={authButton} disabled={isSubmitting}>
          Edit Profile
        </button>

        {errors && errors.submissionError && (
          <div css={submissionError}>{errors.submissionError}</div>
        )}
      </Form>
    </div>
  )
}

const formikEnhancer = withFormik({
  mapPropsToValues () {
    return { password: '', password_confirm: '' }
  },
  validationSchema: yup.object().shape({
    password: yup
      .string()
      .min(6, 'Password is too short')
      .required('Password is required'),
    password_confirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password Confirmation is required')
  }),
  handleSubmit (values, { resetForm, setErrors, setSubmitting, props }) {
    props.changePassword(values.password, { resetForm, setErrors, setSubmitting })
  }
})

const formCss = css`
  width: 80%;
`

const authButton = css`
  ${buttonCss};
  margin-top: 1.9rem;
  padding: 1rem 0;
  width: 100%;
  background: ${appTeal};
`

export default formikEnhancer(ChangePasswordPage)
