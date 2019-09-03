import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import buttonCss from '../../emotion/buttonCss'
import { Field, Form, withFormik } from 'formik'
import * as yup from 'yup'
import { appBorderColor } from '../../emotion/variables'
import { addMeetingComment } from '../../store/actions/actions'

const ReplyAreaAndButton = ({ meetingId, parentId, addMeetingComment }) => {
  return (
    <Form css={formCss}>
      <Field name='comment' component='textarea' rows='7' css={textAreaCss} />
      <button
        css={css`
          ${buttonCss};
          ${localButtonCss}
        `}
      >
        <div>
          <FontAwesomeIcon css={iconCss} icon={faEdit} />
        </div>
        <div>Add Reply</div>
      </button>
    </Form>
  )
}

const formikEnhancer = withFormik({
  mapPropsToValues () {
    return { comment: '' }
  },
  validationSchema: yup.object().shape({
    comment: yup.string().required('Email is required')
  }),
  handleSubmit (values, { resetForm, setErrors, setSubmitting, props }) {
    props.addMeetingComment(values.comment, props.parentId, props.handleSelectComment, {
      resetForm,
      setErrors,
      setSubmitting
    })
  }
})

const formCss = css``

const textAreaCss = css`
  margin-bottom: 2rem;
  width: 100%;
  border: 1px solid ${appBorderColor};
  border-radius: 0.6rem;
  resize: vertical;
  padding: 1rem;
  font: inherit;
  font-size: 1.6rem;
  outline: none;
  &:focus {
    box-shadow: inset 0 0 3px 2px #4d90fe;
  }
`

const localButtonCss = css`
  display: flex;
  padding: 1rem 2rem;
  font-size: 1.8rem;
`

const iconCss = css`
  margin-right: 1rem;
`

export default connect(
  null,
  { addMeetingComment }
)(formikEnhancer(ReplyAreaAndButton))
