import React from 'react'
import { css } from '@emotion/core'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import {
  pagePadding,
  appBorderColor,
  appColor1,
  appColor2
} from '../../emotion/variables'
import { inputBoxCss, inputCss, errCss } from '../../emotion/textInputCss'
import buttonCss from '../../emotion/buttonCss'
import Button from '../../components/utils/Button'

const BasicSettingsPage = ({ values, errors, isSubmitting, setFieldValue }) => {
  return (
    <div>
      <h1 css={title}>Edit Basic Settings</h1>
      <Form css={formCss} autoComplete='off'>
        <div
          css={css`
            ${inputBoxCss};
            ${flexInputBox};
          `}
        >
          <label>Name: </label>
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
          <label>Email:</label>
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
        <div css={buttonsBox}>
          <Button
            type='submit'
            color='appColor2'
            disabled={isSubmitting}
            content='Edit Profile'
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
  enableReinitialize: true,
  mapPropsToValues ({ user }) {
    return {
      username: user.username,
      email: user.email,
      birthday: user.birthday ? user.birthday.toDate() : new Date()
    }
  },
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .min(2, 'Username is too short')
      .required('Username is required'),
    email: yup
      .string()
      .email('Not Valid Email')
      .required('Email is required'),
    birthday: yup.date().required('Birthday is required')
  }),
  async handleSubmit (values, { resetForm, setErrors, setSubmitting, props }) {
    console.log('from handleSubmit of BasicsSettingsPage')
    // props.updateProfileBasics(values, { resetForm, setErrors, setSubmitting })
  }
})

const title = css`
  color: ${appColor2};
  text-decoration: underline;
  padding: 0 0 2rem 6rem;
`

const formCss = css`
  width: 80%;
`

const flexInputBox = css`
  display: flex;
  & > label {
    color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    width: 15rem;
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

const buttonsBox = css`
  margin: 6rem auto;
  padding-left: 12.5rem;
  & button {
    margin-right: 2rem;
  }
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
