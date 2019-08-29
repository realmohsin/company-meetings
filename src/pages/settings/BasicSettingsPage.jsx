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

const BasicSettingsPage = ({ values, errors, isSubmitting, setFieldValue }) => {
  return (
    <div css={basicSettingsPage}>
      <h1 css={pageTitleStyles}>Edit Basic Settings</h1>
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
              showYearDropdown
              scrollableYearDropdown
            />
            <ErrorMessage name='birthday'>
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
      birthday: user.birthday ? user.birthday.toDate() : new Date()
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
`

export default formikEnhancer(BasicSettingsPage)
