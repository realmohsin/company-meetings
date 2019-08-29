import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import TimePicker from 'rc-time-picker-date-fns'
import 'rc-time-picker-date-fns/assets/index.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import { pagePadding } from '../../emotion/variables'
import { inputCss, errCss } from '../../emotion/textInputCss'
import { createMeeting } from '../../store/actions/actions'
import Button from '../../components/utils/Button'
import timepickerStyles from '../../emotion/timepickerStyles'
import datepickerStyles from '../../emotion/datepickerStyles'
import pageTitleStyles from '../../emotion/pageTitleStyles'
import inputContainerStyles from '../../emotion/inputContainerStyles'
import formSubmitErrStyles from '../../emotion/formSubmitErrStyles'
import meetingValidationSchema from '../../validation/meetingValidation'

class CreateMeeting extends React.Component {
  render () {
    const {
      values,
      errors,
      dirty,
      isSubmitting,
      setFieldValue,
      handleChange,
      history
    } = this.props
    return (
      <div css={createMeetingPage}>
        <div>
          <h1 css={pageTitleStyles}>Create New Meeting</h1>

          <Form autoComplete='off'>
            <div css={inputContainerStyles}>
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
                ${inputContainerStyles};
                ${datepickerStyles};
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
                ${inputContainerStyles};
                ${timepickerStyles}
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
                ${inputContainerStyles};
                ${timepickerStyles}
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
                  <option value='Research & Development'>Research & Development</option>
                  <option value='Production'>Production</option>
                </select>
                <ErrorMessage name='department'>
                  {errMsg => <div css={errCss}>{errMsg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div css={inputContainerStyles}>
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

            <div css={inputContainerStyles}>
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
              <div css={formSubmitErrStyles}>{errors.submissionError}</div>
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
  validationSchema: meetingValidationSchema,
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

// styles

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

export default connect(
  null,
  { createMeeting }
)(formikEnhancer(CreateMeeting))
