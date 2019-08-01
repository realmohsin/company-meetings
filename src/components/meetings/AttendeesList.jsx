import React from 'react'
import { css } from '@emotion/core'
import { appBorderColor, appAqua } from '../../emotion/variables'
import AttendeeListItem from './AttendeeListItem'

const AttendeesList = ({ attendees }) => {
  return (
    <div>
      <div css={attendeesListCss}>
        <div css={headerCss}>{attendees.length} People Going</div>
        <div>
          {attendees &&
            attendees.map(attendee => (
              <AttendeeListItem key={attendee.uid} attendee={attendee} />
            ))}
        </div>
      </div>
    </div>
  )
}

const attendeesListCss = css`
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  height: auto;
`

const headerCss = css`
  background: ${appAqua};
  text-align: center;
  height: 4rem;
`

export default AttendeesList
