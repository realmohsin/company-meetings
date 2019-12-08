import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'
import {
  appBorderColor,
  appColor2,
  appColor2Hover
} from '../../emotion/variables'
import Ribbon from '../utils/Ribbon'
import defaultUserPhoto from '../../assets/defaultUserPhoto.png'

console.log('default user photo from attendeelistitem', defaultUserPhoto)

const AttendeeListItem = ({ attendee }) => {
  console.log('attendee photoURL: ', attendee.photoURL)
  return (
    <div css={attendeeListItemCss}>
      {attendee.isHost && (
        <Ribbon fontSize='1.4rem' color='teal' css={ribbonStyles}>
          Host
        </Ribbon>
      )}
      <img src={attendee.photoURL || defaultUserPhoto} alt='attendee' />
      <Link to={`/people/${attendee.uid}`} css={nameStyles}>
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
  height: 7rem;
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
  font-size: 1.8rem;
  margin-right: 4rem;
  &:hover {
    ${appColor2Hover};
  }
`

const ribbonStyles = css`
  top: 0.7rem;
  right: -1.6rem;
  min-width: 4.5em;
`

export default AttendeeListItem
