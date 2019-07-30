import React from 'react'
import { css } from '@emotion/core'
import { appBorderColor } from '../../emotion/variables'

const AttendeeListItem = ({ attendee }) => {
  return (
    <div css={attendeeListItemCss}>
      <img src={attendee.photoURL} alt='attendee' />
      <div>{attendee.username}</div>
    </div>
  )
}

const attendeeListItemCss = css`
  display: flex;
  border-bottom: 1px solid ${appBorderColor};
  background: white;
  padding: 1rem;
  height: 8rem;
  & img {
    height: 100%;
  }
  &:last-of-type {
    border-bottom: none;
  }
`

export default AttendeeListItem
