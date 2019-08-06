import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import TimePicker, { formatTime } from 'rc-time-picker-date-fns'
import 'rc-time-picker-date-fns/assets/index.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { pagePadding, appBorderColor } from '../../emotion/variables'
import { inputBoxCss, inputCss, errCss } from '../../emotion/textInputCss'
import { createMeeting } from '../../store/actions/actions'
import buttonCss from '../../emotion/buttonCss'

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
        <Form css={formCss} autoComplete='off'>
          <div
            css={css`
              ${inputBoxCss};
              ${flexInputBox};
            `}
          >
            <label>Title</label>
            <Field type='text' name='title' css={inputCss} />

            <ErrorMessage name='title'>
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
            <label>Date: </label>
            <DatePicker selected={values.date} onChange={e => setFieldValue('date', e)} />
            <ErrorMessage name='startTime'>
              {errMsg => <div css={errCss}>{errMsg}</div>}
            </ErrorMessage>
          </div>

          <div
            css={css`
              ${inputBoxCss};
              ${flexInputBox};
              ${timepickerBoxCss}
            `}
          >
            <label>Start Time: </label>
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

          <div
            css={css`
              ${inputBoxCss};
              ${flexInputBox};
              ${timepickerBoxCss}
            `}
          >
            <label>End Time: </label>
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
            `}
          >
            <label>Building: </label>
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
                Select a Building
              </option>
              <option value='companyHeadquarters'>Company Headquarters</option>
              <option value='easternBranch'>Eastern Branch</option>
              <option value='midtownBranch'>Midtown Office</option>
              <option value='upstateBranch'>Upstate Office</option>
            </select>
            <ErrorMessage name='building'>
              {errMsg => <div css={errCss}>{errMsg}</div>}
            </ErrorMessage>
          </div>

          <div
            css={css`
              ${inputBoxCss};
              ${flexInputBox};
            `}
          >
            <label>Room</label>
            <Field type='text' name='room' css={inputCss} />

            <ErrorMessage name='room'>
              {errMsg => <div css={errCss}>{errMsg}</div>}
            </ErrorMessage>
          </div>
          <div css={buttonsBox}>
            <button type='submit' disabled={isSubmitting || !dirty} css={buttonCss}>
              Create Meeting
            </button>
            <button
              onClick={() => history.push('/meetings')}
              disabled={isSubmitting}
              css={buttonCss}
            >
              Cancel
            </button>
          </div>

          {errors && errors.submissionError && (
            <div css={submissionError}>{errors.submissionError}</div>
          )}
        </Form>
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
    title: yup.string().required('Title is required'),
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
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 2rem;
`

const timepickerBoxCss = css`
    & .rc-time-picker-input {
    font-family: inherit;
    letter-spacing: 0.1rem;
    padding: 2rem 1.1rem;
    font-size: 1.8rem;
  }
`

const headerCss = css`
  text-align: center;
  margin-top: 4rem;
`

const formCss = css``

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

const selectCss = css`
  width: 100%;
  font-family: inherit;
`

const buttonsBox = css`
  margin: 4rem auto;
  & button {
    margin: 0 2rem;
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

export default connect(
  null,
  { createMeeting }
)(formikEnhancer(CreateMeeting))
