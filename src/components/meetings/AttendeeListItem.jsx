import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'
import { appBorderColor, appColor2, appColor2Hover } from '../../emotion/variables'
import Ribbon from '../utils/Ribbon'

const AttendeeListItem = ({ attendee }) => {
  console.log(attendee)
  return (
    <div css={attendeeListItemCss}>
      {attendee.isHost && (
        <Ribbon fontSize='1.3rem' color='teal' css={ribbonStyles}>
          Host
        </Ribbon>
      )}
      <img src={attendee.photoURL} alt='attendee' />
      <Link to={`/profile/${attendee.uid}`} css={nameStyles}>
        {attendee.username}
      </Link>
    </div>
  )
}

const attendeeListItemCss = css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${appBorderColor};
  background: white;
  padding: 1rem;
  height: 8rem;
  position: relative;
  & img {
    height: 100%;
  }
  &:last-of-type {
    border-bottom: none;
  }
`

const nameStyles = css`
  padding-left: 2rem;
  color: ${appColor2};
  &:hover {
    ${appColor2Hover};
  }
`

const ribbonStyles = css`
  top: 1rem;
  right: -1.4rem;
  min-width: 6em;
`

export default AttendeeListItem
