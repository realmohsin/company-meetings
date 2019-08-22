import React from 'react'
import { css } from '@emotion/core'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import TimePicker, { formatTime } from 'rc-time-picker-date-fns'
import 'rc-time-picker-date-fns/assets/index.css'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { pagePadding, appBorderColor, appColor2 } from '../../emotion/variables'
import { inputBoxCss, inputCss, errCss } from '../../emotion/textInputCss'
import buttonCss from '../../emotion/buttonCss'
import Button from '../../components/utils/Button'

const AboutSettingsPage = ({
  values,
  errors,
  isSubmitting,
  setFieldValue,
  handleChange
}) => {
  return (
    <div>
      <h1 css={title}>About Me</h1>
      <Form css={formCss} autoComplete='off'>
        <div
          css={css`
            ${inputBoxCss};
            ${flexInputBox};
          `}
        >
          <label>Job Title:</label>
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
          <label>Lunch Break: </label>
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

        <div
          css={css`
            ${inputBoxCss};
            ${flexInputBox};
          `}
        >
          <label>Hours: </label>
          <select
            name='hours'
            css={css`
              ${inputCss};
              ${selectCss};
            `}
            value={values.hours}
            onChange={handleChange}
          >
            <option value='' disabled>
              Select Hours
            </option>
            <option value='Full-Time'>Full-Time</option>
            <option value='Part-Time'>Part-Time</option>
          </select>
          <ErrorMessage name='hours'>
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
  mapPropsToValues ({ user }) {
    return {
      jobTitle: user.jobTitle || '',
      department: user.department || '',
      lunchBreak: user.lunchBreak ? user.lunchBreak.toDate() : new Date(),
      hours: user.hours || ''
    }
  },
  validationSchema: yup.object().shape({
    jobTitle: yup.string().required('Job Title is required'),
    department: yup.string().required('Department is required'),
    lunchBreak: yup.date().required('Lunch Break time is required'),
    hours: yup.string().required('Hours is required')
  }),
  async handleSubmit (values, { resetForm, setErrors, setSubmitting, props }) {
    props.updateProfileAbout(values, { resetForm, setErrors, setSubmitting })
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

const timepickerBoxCss = css`
  & .rc-time-picker-input {
    font-family: inherit;
    letter-spacing: 0.1rem;
    padding: 2rem 1.1rem;
    font-size: 1.8rem;
  }
`

const selectCss = css`
  width: 100%;
  font-family: inherit;
`

export default formikEnhancer(AboutSettingsPage)
