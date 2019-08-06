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
import {
  editMeeting,
  fetchSelectedMeeting,
  cancelMeetingToggle
} from '../../store/actions/actions'
import buttonCss from '../../emotion/buttonCss'
import {
  selectSelectedMeeting,
  selectMeetingsError
} from '../../store/selectors/meetingSelectors'

const mapStateToProps = state => ({
  selectedMeeting: selectSelectedMeeting(state),
  meetingsError: selectMeetingsError(state)
})

class EditMeeting extends React.Component {
  componentDidMount () {
    this.props.fetchSelectedMeeting(this.props.match.params.meetingId)
  }

  render () {
    const {
      values,
      errors,
      isValid,
      dirty,
      isSubmitting,
      setFieldValue,
      handleChange,
      history,
      meetingsError,
      selectedMeeting,
      cancelMeetingToggle
    } = this.props
    if (meetingsError) return <div css={meetingPageCss}>Cannot Retreive Meeting</div>
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
            `}
          >
            <label>Start Time: </label>
            <TimePicker
              showSecond={false}
              value={values.startTime}
              className='timepickerBox'
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
            `}
          >
            <label>End Time: </label>
            <TimePicker
              showSecond={false}
              value={values.endTime}
              className='timepickerBox'
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
            <div>
              <button type='submit' disabled={isSubmitting || !dirty} css={buttonCss}>
                Create Meeting
              </button>
              <button
                onClick={() => history.push('/meetings')}
                disabled={isSubmitting}
                css={buttonCss}
              >
                Go Back
              </button>
            </div>
            <div>
              <button
                type='button'
                onClick={(e) =>
                    cancelMeetingToggle(!selectedMeeting.cancelled, selectedMeeting.id)
                }
                css={buttonCss}
              >
                {selectedMeeting && selectedMeeting.cancelled
                  ? 'Reactivate Meeting'
                  : 'Cancel Meeting'}
              </button>
            </div>
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
  enableReinitialize: true,
  mapPropsToValues ({ selectedMeeting }) {
    if (selectedMeeting) console.log(selectedMeeting.date.toDate())
    return {
      title: selectedMeeting ? selectedMeeting.title : '',
      date: selectedMeeting ? selectedMeeting.date.toDate() : new Date(),
      startTime: selectedMeeting ? selectedMeeting.startTime.toDate() : new Date(),
      endTime: selectedMeeting ? selectedMeeting.endTime.toDate() : new Date(),
      department: selectedMeeting ? selectedMeeting.department : '',
      building: selectedMeeting ? selectedMeeting.building : '',
      room: selectedMeeting ? selectedMeeting.room : ''
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
    await props.editMeeting(props.match.params.meetingId, values, {
      resetForm,
      setErrors,
      setSubmitting
    })
    if (!props.meetingsError) {
      props.history.push(`/meetings/${props.selectedMeeting.id}`)
    }
  }
})

const createMeetingPage = css`
  ${pagePadding};
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 2rem;
  & .timepickerBox {
  }
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
  display: flex;
  justify-content: space-between;
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
  mapStateToProps,
  { editMeeting, fetchSelectedMeeting, cancelMeetingToggle }
)(formikEnhancer(EditMeeting))
