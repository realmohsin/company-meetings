import React from 'react'
import { css } from '@emotion/core'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { pagePadding } from '../../emotion/variables'

class CreateMeeting extends React.Component {
  render () {
    const { values, errors, touched, isSubmitting } = this.props
    return (
      <Form css={form}>
        <div>
          <ErrorMessage name='email'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
          <Field type='email' name='email' placeholder='Email' css={input} />
        </div>
        <div>
          <ErrorMessage name='password'>
            {errMsg => <div css={errCss}>{errMsg}</div>}
          </ErrorMessage>
          <Field type='password' name='password' placeholder='Password' css={input} />
        </div>
        <div>
          <label>
            <Field type='checkbox' name='isSubscribed' checked={values.isSubscribed} />
            Subscribe to our Newsletter
          </label>
        </div>
        <div>
          <Field component='select' name='plan'>
            <option value='free'>Free</option>
            <option value='premium'>Premium</option>
          </Field>
        </div>
        <button disabled={isSubmitting}>Submit</button>
      </Form>
    )
  }
}

const mapPropsToValues = function ({ email, password, isSubscribed, plan }) {
  return {
    email: email || 'afa',
    password: password || '',
    isSubscribed: isSubscribed || false,
    plan: plan || 'premium'
  }
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email not valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be 6 characters or longer')
    .required('Password is required')
})

const handleSubmit = function (values, { resetForm, setErrors, setSubmitting }) {
  console.log(values)
  setSubmitting(false)
}

// const formikEnhancer = withFormik({
//   mapPropsToValues ({ email, password, isSubscribed, plan }) {
//     return {
//       email: email || '',
//       password: password || '',
//       isSubscribed: isSubscribed || false,
//       plan: plan || 'premium'
//     }
//   },
//   validationSchema: yup.object().shape({
//     email: yup
//       .string()
//       .email('Email not valid')
//       .required('Email is required'),
//     password: yup
//       .string()
//       .min(6, 'Password must be 6 characters or longer')
//       .required('Password is required')
//   }),
//   handleSubmit (values, { resetForm, setErrors, setSubmitting }) {
//     console.log(values)
//     setSubmitting(false)
//   }
// })

const form = css`
  width: 700px;
  margin: 0 auto;
  padding: 25px;
  ${pagePadding};
`
const input = css`
  appearance: none;
  transition: all 0.5s ease;
  width: 100%;
  padding: 5px;
  margin: 5px;
  border-radius: 3px;
  background-color: #e2e5e5;
  border: 2px solid #e2e5e5;
  &:focus {
    border-color: #919faf;
    background-color: #919faf;
  }
`

const errCss = css`
  color: yellow;
`

const createMeetingCss = css`
  ${pagePadding};
`

// export default formikEnhancer(CreateMeeting)
export default withFormik({ mapPropsToValues, validationSchema, handleSubmit })(
  CreateMeeting
)
