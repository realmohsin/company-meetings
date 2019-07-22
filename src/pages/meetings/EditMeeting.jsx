import React from 'react'
import { css } from '@emotion/core'
import { pagePadding } from '../../emotion/variables'

const EditMeeting = props => {
  return <div css={editMeetingCss}>Edit Meeting Form</div>
}

// styles

const editMeetingCss = css`
  ${pagePadding};
`

export default EditMeeting
