import React from 'react'
import { css } from '@emotion/core'
import firebase, { firebaseAuth } from '../../firebase/firebase'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { pagePadding, appBorderColor, appTeal, appColor2 } from '../../emotion/variables'
import {
  inputBoxCss,
  inputCss,
  labelCss,
  shrunkLabelCss,
  errCss
} from '../../emotion/textInputCss'
import buttonCss from '../../emotion/buttonCss'
import Button from '../../components/utils/Button'

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
      <h1 css={title}>Change Your Password</h1>
      <Form css={formCss} autoComplete='off'>
        <div
          css={css`
            ${inputBoxCss};
            ${flexInputBox};
          `}
        >
          <label>New Password:</label>
          <Field type='text' name='password' css={inputCss} />

          <ErrorMessage name='password'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
        </div>

        <div
          css={css`
            ${inputBoxCss};
            ${flexInputBox};
          `}
        >
          <label>Confirm New Password:</label>
          <Field type='text' name='confirm_password' css={inputCss} />

          <ErrorMessage name='confirm_password'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
        </div>

        <div css={buttonsBox}>
          <Button
            type='submit'
            color='appColor2'
            disabled={isSubmitting}
            content='Change Password'
          />
        </div>

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

const title = css`
  color: ${appColor2};
  text-decoration: underline;
  padding: 0 0 2rem 6rem;
`

const flexInputBox = css`
  display: flex;
  & > label {
    color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    width: 20rem;
  }
  & > span {
    width: 100%;
  }
`

const buttonsBox = css`
  margin: 6rem auto;
  padding-left: 12.5rem;
  & button {
    margin-right: 2rem;
  }
`

export default formikEnhancer(ChangePasswordPage)
