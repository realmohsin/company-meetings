import React from 'react'
import { css } from '@emotion/core'
import { appBoxShadow, appColor1 } from '../../emotion/variables'
import AttendeeListItem from './AttendeeListItem'

const AttendeesList = ({ attendees }) => {
  return (
    <div>
      <div css={attendeesListCss}>
        <div css={headerCss}>
          {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} Attending
        </div>
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
  box-shadow: ${appBoxShadow};
  @media (max-width: 945px) {
    width: 60%;
    margin: 0 auto 10rem;
  }
  @media (max-width: 945px) {
    width: 60%;
  }
  @media (max-width: 575px) {
    width: 100%;
  }
`

const headerCss = css`
  background: ${appColor1};
  font-size: 2.2rem;
  text-align: center;
  height: 5rem;
  line-height: 5rem;
  color: white;
  border-radius: 0.6rem 0.6rem 0 0;
`

export default AttendeesList
