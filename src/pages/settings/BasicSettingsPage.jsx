import React from 'react'
import { css } from '@emotion/core'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import { inputCss, errCss } from '../../emotion/textInputCss'
import Button from '../../components/utils/Button'
import pageTitleStyles from '../../emotion/pageTitleStyles'
import basicSettingsSchema from '../../validation/basicSettingsSchema'
import inputContainerStyles from '../../emotion/inputContainerStyles'
import datepickerStyles from '../../emotion/datepickerStyles'
import formSubmitErrStyles from '../../emotion/formSubmitErrStyles'

import TimePicker from 'rc-time-picker-date-fns'
import 'rc-time-picker-date-fns/assets/index.css'
import timepickerStyles from '../../emotion/timepickerStyles'

const BasicSettingsPage = ({
  values,
  errors,
  isSubmitting,
  setFieldValue,
  handleChange
}) => {
  return (
    <div css={basicSettingsPage}>
      <h1 css={pageTitleStyles}>About Me Settings</h1>
      <Form autoComplete='off'>
        <div css={inputContainerStyles}>
          <label>Name:</label>
          <div>
            <Field type='text' name='username' css={inputCss} />
            <ErrorMessage name='username'>
              {errMsg => <div css={errCss}>{errMsg}</div>}
            </ErrorMessage>
          </div>
        </div>

        <div css={inputContainerStyles}>
          <label>Email:</label>
          <div>
            <Field type='email' name='email' css={inputCss} />

            <ErrorMessage name='email'>
              {errMsg => <div css={errCss}>{errMsg}</div>}
            </ErrorMessage>
          </div>
        </div>

        <div
          css={css`
            ${inputContainerStyles};
            ${datepickerStyles};
          `}
        >
          <label>Birthday:</label>
          <div>
            <DatePicker
              selected={values.birthday}
              onChange={e => setFieldValue('birthday', e)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
            />
            <ErrorMessage name='birthday'>
              {errMsg => <div css={errCss}>{errMsg}</div>}
            </ErrorMessage>
          </div>
        </div>

        <div css={inputContainerStyles}>
          <label>Job Title:</label>
          <div>
            <Field type='text' name='jobTitle' css={inputCss} />
            <ErrorMessage name='jobTitle'>
              {errMsg => <div css={errCss}>{errMsg}</div>}
            </ErrorMessage>
          </div>
        </div>

        <div css={inputContainerStyles}>
          <label>Department: </label>
          <div>
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
              <option value='Accounting'>Accounting</option>
              <option value='Human Resources'>Human Resources</option>
              <option value='Customer Service'>Customer Service</option>
              <option value='Marketing'>Marketing</option>
              <option value='R & D'>Research & Development</option>
              <option value='Production'>Production</option>
            </select>
            <ErrorMessage name='department'>
              {errMsg => <div css={errCss}>{errMsg}</div>}
            </ErrorMessage>
          </div>
        </div>

        <div
          css={css`
            ${inputContainerStyles};
            ${timepickerStyles};
          `}
        >
          <label>Lunch Break: </label>
          <div>
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
        </div>

        <div css={inputContainerStyles}>
          <label>Hours: </label>
          <div>
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
          <div css={formSubmitErrStyles}>{errors.submissionError}</div>
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
      birthday: user.birthday ? user.birthday.toDate() : new Date(),
      jobTitle: user.jobTitle || '',
      department: user.department || '',
      lunchBreak: user.lunchBreak ? user.lunchBreak.toDate() : new Date(),
      hours: user.hours || ''
    }
  },
  validationSchema: basicSettingsSchema,
  async handleSubmit (values, { resetForm, setErrors, setSubmitting, props }) {
    props.updateProfileBasics(values, { resetForm, setErrors, setSubmitting })
  }
})

// styles

const basicSettingsPage = css`
  margin: 0 auto;
  width: 90%;
  & label {
    width: 13rem !important;
  }
`

const buttonsBox = css`
  margin: 6rem auto;
  padding-left: 12.5rem;
  & button {
    margin-right: 2rem;
  }
  @media (max-width: 360px) {
    padding-left: 6rem;
    & button {
      margin-right: 0rem;
    }
  }
`

const selectCss = css`
  width: 100%;
  font-family: inherit;
`

export default formikEnhancer(BasicSettingsPage)
