import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { appBorderColor, appColor2, appColor2Hover } from '../../emotion/variables'
import AttendeeIcon from '../meetings/AttendeeIcon'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

const ActivityItemStyled = styled.div`
  padding: 1.5rem 1rem 1rem 0.5rem;
  min-height: 6rem;
  display: grid;
  grid-template-columns: 6rem 1fr;
  align-items: center;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${appBorderColor};
  }
  &:last-of-type {
    border-radius: 0 0 5px 5px;
  }
`

const MeetingTextStyled = styled.div`
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.8);
  & span {
    color: ${appColor2};
  }
  & span:hover {
    cursor: pointer;
    color: ${appColor2Hover};
  }
  & .timeAgo {
    margin-top: 0.5rem;
    color: rgba(0, 0, 0, 0.5);
  }
`

const NewMeetingActivityText = ({ hostName, title, timestamp }) => (
  <MeetingTextStyled>
    <p>
      <strong>New Meeting!</strong> <span>{hostName}</span> has created{' '}
      <span>{title}</span>.
    </p>
    <p className='timeAgo'>{distanceInWordsToNow(timestamp.toDate())} ago</p>
  </MeetingTextStyled>
)

const MeetingCancelledActivityText = ({ hostName, title, timestamp }) => (
  <MeetingTextStyled>
    <p>
      Meeting Cancelled! <span>{hostName}</span> has cancelled <span>{title}</span>.
    </p>
    <p>{distanceInWordsToNow(timestamp.toDate())} ago</p>
  </MeetingTextStyled>
)

const ActivityItem = ({ activity }) => {
  return (
    <ActivityItemStyled>
      <div
        css={css`
          width: 8rem;
        `}
      >
        <AttendeeIcon photoURL={activity.hostPhotoURL} />
      </div>
      {activity.type === 'newMeeting' ? (
        <NewMeetingActivityText {...activity} />
      ) : (
        <MeetingCancelledActivityText {...activity} />
      )}
    </ActivityItemStyled>
  )
}

export default ActivityItem
