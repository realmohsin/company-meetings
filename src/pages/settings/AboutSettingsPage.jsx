import React from 'react'
import { css } from '@emotion/core'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import TimePicker, { formatTime } from 'rc-time-picker-date-fns'
import 'rc-time-picker-date-fns/assets/index.css'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { pagePadding, appBorderColor } from '../../emotion/variables'
import { inputBoxCss, inputCss, errCss, selectCss } from '../../emotion/textInputCss'
import buttonCss from '../../emotion/buttonCss'

const BasicSettingsPage = ({
  values,
  errors,
  isSubmitting,
  setFieldValue,
  handleChange
}) => {
  return (
    <div>
      <h2>About Me Settings</h2>
      <Form css={formCss} autoComplete='off'>
        <div
          css={css`
            ${inputBoxCss};
            ${flexInputBox};
          `}
        >
          <label>Job Title</label>
          <Field type='text' name='jobTitle' css={inputCss} />

          <ErrorMessage name='jobTitle'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
        </div>

        <div
          css={css`
            ${inputBoxCss};
            ${flexInputBox};
          `}
        >
          <label>Department: </label>
          <select
            name='department'
            css={css`
              ${inputCss};
              ${selectCss};
            `}
            value={values.department}
            onChange={handleChange}
          >
            <option value='' disabled>
              Select a Department
            </option>
            <option value='accounting'>Accounting</option>
            <option value='humanResources'>Human Resources</option>
            <option value='customerService'>Customer Service</option>
            <option value='marketing'>Marketing</option>
            <option value='researchAndDevelopment'>Research & Development</option>
            <option value='production'>Production</option>
          </select>
          <ErrorMessage name='department'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
        </div>

        <div
          css={css`
            ${inputBoxCss};
            ${flexInputBox};
            ${timepickerBoxCss};
          `}
        >
          <label>Lunch Break Time: </label>
          <TimePicker
            showSecond={false}
            value={values.lunchBreak}
            onChange={e => setFieldValue('lunchBreak', e)}
            format={'h:mm a'}
            use12Hours
          />
          <ErrorMessage name='lunchBreak'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
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
      birthday: new Date()
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
    date: yup.date().required('Date is required')
  }),
  async handleSubmit (values, { resetForm, setErrors, setSubmitting, props }) {
    const newMeeting = await props.createMeeting(values, {
      resetForm,
      setErrors,
      setSubmitting
    })
    if (newMeeting) {
      props.history.push('/meetings')
    }
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

const timepickerBoxCss = css`
  & .rc-time-picker-input {
    font-family: inherit;
    letter-spacing: 0.1rem;
    padding: 2rem 1.1rem;
    font-size: 1.8rem;
  }
`

export default formikEnhancer(BasicSettingsPage)
