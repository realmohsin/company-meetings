import React from 'react'
import { css } from '@emotion/core'
import { pagePadding } from '../../emotion/variables'

const MeetingPage = props => {
  return <div css={meetingPage}>Meeting </div>
}

// styles

const meetingPage = css`
  ${pagePadding};
`

export default MeetingPage
