import React from 'react'
import { css } from '@emotion/core'
import { pagePadding } from '../../emotion/variables'

const MyMeetings = props => {
  return <div css={myMeetings}>My Meetings</div>
}

// styles

const myMeetings = css`
  ${pagePadding};
`

export default MyMeetings
