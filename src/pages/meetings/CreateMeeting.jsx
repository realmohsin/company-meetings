import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import TimePicker, { formatTime } from 'rc-time-picker-date-fns'
import 'rc-time-picker-date-fns/assets/index.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import {
  pagePadding,
  appBorderColor,
  appColor2,
  appColor1,
  appColor1Hover
} from '../../emotion/variables'
import { inputBoxCss, inputCss, errCss } from '../../emotion/textInputCss'
import { createMeeting } from '../../store/actions/actions'
import buttonCss from '../../emotion/buttonCss'
import Button from '../../components/utils/Button'

class CreateMeeting extends React.Component {
  render () {
    const {
      values,
      errors,
      isValid,
      dirty,
      isSubmitting,
      setFieldValue,
      handleChange,
      history
    } = this.props
    return (
      <div css={createMeetingPage}>
        <div>
          <h1 css={title}>Create New Meeting</h1>
          <Form autoComplete='off'>
            <div
              css={css`
                ${inputBoxCss};
                ${flexInputBox};
              `}
            >
              <label>Title:</label>
              <div>
                <Field type='text' name='title' css={inputCss} />

                <ErrorMessage name='title'>
                  {errMsg => <div css={errCss}>{errMsg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div
              css={css`
                ${inputBoxCss};
                ${flexInputBox};
                ${datePickerBox};
              `}
            >
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={values.date}
                  onChange={e => setFieldValue('date', e)}
                />
                <ErrorMessage name='startTime'>
                  {errMsg => <div css={errCss}>{errMsg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div
              css={css`
                ${inputBoxCss};
                ${flexInputBox};
                ${timepickerBoxCss}
              `}
            >
              <label>Start Time: </label>
              <div>
                <TimePicker
                  showSecond={false}
                  value={values.startTime}
                  onChange={e => setFieldValue('startTime', e)}
                  format={'h:mm a'}
                  use12Hours
                />
                <ErrorMessage name='startTime'>
                  {errMsg => <div css={errCss}>{errMsg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div
              css={css`
                ${inputBoxCss};
                ${flexInputBox};
                ${timepickerBoxCss}
              `}
            >
              <label>End Time: </label>
              <div>
                <TimePicker
                  showSecond={false}
                  value={values.endTime}
                  onChange={e => setFieldValue('endTime', e)}
                  format={'h:mm a'}
                  use12Hours
                />
                <ErrorMessage name='endTime'>
                  {errMsg => <div css={errCss}>{errMsg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div
              css={css`
                ${inputBoxCss};
                ${flexInputBox};
              `}
            >
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
                  <option value='Research & Development'>Research & Development</option>
                  <option value='Production'>Production</option>
                </select>
                <ErrorMessage name='department'>
                  {errMsg => <div css={errCss}>{errMsg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div
              css={css`
                ${inputBoxCss};
                ${flexInputBox};
              `}
            >
              <label>Location: </label>
              <div>
                <select
                  name='building'
                  css={css`
                    ${inputCss};
                    ${selectCss};
                  `}
                  value={values.building}
                  onChange={handleChange}
                >
                  <option value='' disabled>
                    Select a Location
                  </option>
                  <option value='Company Headquarters'>Company Headquarters</option>
                  <option value='Eastern Branch'>Eastern Branch</option>
                  <option value='Midtown Building'>Midtown Building</option>
                  <option value='Western Branch'>Western Branch</option>
                </select>
                <ErrorMessage name='building'>
                  {errMsg => <div css={errCss}>{errMsg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div
              css={css`
                ${inputBoxCss};
                ${flexInputBox};
              `}
            >
              <label>Room:</label>
              <div>
                <Field type='text' name='room' css={inputCss} />

                <ErrorMessage name='room'>
                  {errMsg => <div css={errCss}>{errMsg}</div>}
                </ErrorMessage>
              </div>
            </div>
            <div css={buttonsBox}>
              <Button
                type='submit'
                disabled={isSubmitting || !dirty}
                color='green'
                content='Create Meeting'
              />
              <Button
                color='red'
                onClick={() => history.push('/meetings')}
                disabled={isSubmitting}
                content='Cancel'
              />
            </div>

            {errors && errors.submissionError && (
              <div css={submissionError}>{errors.submissionError}</div>
            )}
          </Form>
        </div>
      </div>
    )
  }
}

const formikEnhancer = withFormik({
  mapPropsToValues () {
    return {
      title: '',
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      department: '',
      building: '',
      room: ''
    }
  },
  validationSchema: yup.object().shape({
    title: yup
      .string()
      .max(30, 'Title is too long')
      .required('Title is required'),
    date: yup.date().required('Date is required'),
    startTime: yup.date().required('Start time is required'),
    endTime: yup.date().required('End time is required'),
    department: yup.string().required('Department is required'),
    building: yup.string().required('Building is required'),
    room: yup.string().required('Room is required')
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

const createMeetingPage = css`
  ${pagePadding};
  margin: 3rem auto;
  width: 70%;
  @media (max-width: 1100px) {
    width: 75%;
  }
  @media (max-width: 800px) {
    width: 85%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
  @media (max-width: 575px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    font-size: 0.9em;
  }
`

const flexInputBox = css`
  display: flex;
  & > label {
    color: ${appColor2};
    display: flex;
    align-items: center;
    width: 20%;
  }
  & > div {
    flex: 1;
  }
  & span {
    width: 100%;
  }
  @media (max-width: 720px) {
    & label {
      width: 25%;
    }
  }
  @media (max-width: 475px) {
    & label {
      width: 32%;
    }
  }
  @media (max-width: 355px) {
    & label {
      width: 35%;
    }
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
    transform: translate(14rem, 13rem) scale(2) !important;
    will-change: auto !important;
  }

  & .react-datepicker {
    font-family: inherit !important;
  }
  @media (max-width: 475px) {
    & .react-datepicker-popper {
      transform: translate(9rem, 11rem) scale(1.8) !important;
    }
  }
  @media (max-width: 375px) {
    & .react-datepicker-popper {
      transform: translate(7rem, 11rem) scale(1.8) !important;
    }
  }
  @media (max-width: 335px) {
    & .react-datepicker-popper {
      transform: translate(6rem, 11rem) scale(1.8) !important;
    }
  }
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

const buttonsBox = css`
  margin: 6rem auto;
  padding-left: 15.5rem;
  & button {
    margin-right: 2rem;
  }
  @media (max-width: 750px) {
    padding-left: 0;
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

const title = css`
  color: ${appColor1Hover};
  text-decoration: underline;
  margin-bottom: 4rem;
  text-align: center;
  @media (max-width: 355px) {
    font-size: 29px;
  }
`

export default connect(
  null,
  { createMeeting }
)(formikEnhancer(CreateMeeting))
