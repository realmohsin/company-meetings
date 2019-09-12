import React from 'react'
import styled from '@emotion/styled'
import { appBorderColor } from '../../emotion/variables'

const AttendeeIconStyled = styled.img`
  display: inline-block;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid ${appBorderColor};
  margin: 1rem;
`

const AttendeeIcon = ({ photoURL, ...props }) => (
  <AttendeeIconStyled src={photoURL} alt='attendee' {...props} />
)

export default AttendeeIcon
