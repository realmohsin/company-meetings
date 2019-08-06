import React from 'react'
import { css } from '@emotion/core'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { pagePadding, appBorderColor } from '../../emotion/variables'
import { inputBoxCss, inputCss, errCss } from '../../emotion/textInputCss'
import buttonCss from '../../emotion/buttonCss'

const BasicSettingsPage = props => {
  console.log('from BasicSettingsPage: ', props)
  const { values, errors, isSubmitting, setFieldValue } = props
  return (
    <div>
      <h2>Basic Profile Settings</h2>
      <Form css={formCss} autoComplete='off'>
        <div
          css={css`
            ${inputBoxCss};
            ${flexInputBox};
          `}
        >
          <label>Username</label>
          <Field type='text' name='username' css={inputCss} />

          <ErrorMessage name='username'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
        </div>

        <div
          css={css`
            ${inputBoxCss};
            ${flexInputBox};
          `}
        >
          <label>Email</label>
          <Field type='email' name='email' css={inputCss} />

          <ErrorMessage name='email'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
        </div>

        <div
          css={css`
            ${inputBoxCss};
            ${flexInputBox};
            ${datePickerBox};
          `}
        >
          <label>Birthday: </label>
          <DatePicker
            selected={values.birthday}
            onChange={e => setFieldValue('birthday', e)}
            showYearDropdown
          />
          <ErrorMessage name='birthday'>
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
  enableReinitialize: true,
  mapPropsToValues ({ user }) {
    return {
      username: user.username,
      email: user.email,
      birthday: user.birthday ? user.birthday.toDate() : new Date()
    }
  },
  async handleSubmit (values, { resetForm, setErrors, setSubmitting, props }) {
    console.log('from handleSubmit: ', props)
    props.updateProfileBasics(values, { resetForm, setErrors, setSubmitting })
  }
})

const formCss = css`
  width: 80%;
`

const flexInputBox = css`
  display: flex;
  & > label {
    display: flex;
    align-items: center;
    width: 10rem;
  }
  & > span {
    width: 100%;
  }
`

const datePickerBox = css`
  & input {
    width: 100%;
    background: white;
    color: gray;
    font-size: 1.8rem;
    padding: 1rem;
    border: 1px solid ${appBorderColor};
    border-radius: 0.5rem;
    font-family: inherit;
  }
  & .react-datepicker-wrapper {
    width: 100%;
  }

  & .react-datepicker__input-container {
    width: 100%;
  }
  & .react-datepicker-popper {
    transform: translate(100px, 90px) scale(1.5) !important;
    will-change: auto !important;
  }

  & .react-datepicker {
    font-family: inherit !important;
  }
`

const authButton = css`
  ${buttonCss};
  margin-top: 1.9rem;
  padding: 1rem 0;
  width: 100%;
`

const submissionError = css`
  border: 1px solid red;
  border-radius: 0.4rem;
  color: red;
  text-align: center;
  padding: 1rem 0;
  margin-top: 2rem;
`

export default formikEnhancer(BasicSettingsPage)
