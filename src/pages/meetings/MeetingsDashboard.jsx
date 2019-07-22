import React from 'react'
import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { pagePadding } from '../../emotion/variables'

const MeetingsDashboard = props => {
  return (
    <div css={meetingsDashboard}>
      <h1>Meetings Dashboard</h1>
    </div>
  )
}

// styles
const meetingsDashboard = css`
  ${pagePadding};
`

export default MeetingsDashboard
