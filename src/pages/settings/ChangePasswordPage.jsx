import React from 'react'
import { css } from '@emotion/core'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import { inputCss, errCss } from '../../emotion/textInputCss'
import Button from '../../components/utils/Button'
import pageTitleStyles from '../../emotion/pageTitleStyles'
import inputContainerStyles from '../../emotion/inputContainerStyles'
import formSubmitErrStyles from '../../emotion/formSubmitErrStyles'
import pwResetSchema from '../../validation/pwResetSchema'

const ChangePasswordPage = ({ user, errors, isSubmitting }) => {
  if (user.authMethod && user.authMethod !== 'password') {
    return (
      <div css={thirdPartyMsg}>
        You are authenticated through a third party provider. Check with that provider to
        change your password.
      </div>
    )
  }
  return (
    <div css={changePwPage}>
      <h1 css={pageTitleStyles}>Change Your Password</h1>
      <Form autoComplete='off'>
        <div css={inputContainerStyles}>
          <label>New Password:</label>
          <div>
            <Field type='text' name='password' css={inputCss} />
            <ErrorMessage name='password'>
              {errMsg => <div css={errCss}>{errMsg}</div>}
            </ErrorMessage>
          </div>
        </div>

        <div css={inputContainerStyles}>
          <label>Confirm Password:</label>
          <div>
            <Field type='text' name='confirm_password' css={inputCss} />
            <ErrorMessage name='confirm_password'>
              {errMsg => <div css={errCss}>{errMsg}</div>}
            </ErrorMessage>
          </div>
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
          <div css={formSubmitErrStyles}>{errors.submissionError}</div>
        )}
      </Form>
    </div>
  )
}

const formikEnhancer = withFormik({
  mapPropsToValues () {
    return { password: '', password_confirm: '' }
  },
  validationSchema: pwResetSchema,
  handleSubmit (values, { resetForm, setErrors, setSubmitting, props }) {
    props.changePassword(values.password, { resetForm, setErrors, setSubmitting })
  }
})

// styles

const changePwPage = css`
  margin: 0 auto;
  width: 90%;
  & label {
    width: 17rem !important;
  }
`

const buttonsBox = css`
  margin: 6rem auto;
  padding-left: 12.5rem;
  & button {
    margin-right: 2rem;
  }
`

const thirdPartyMsg = css``

export default formikEnhancer(ChangePasswordPage)
