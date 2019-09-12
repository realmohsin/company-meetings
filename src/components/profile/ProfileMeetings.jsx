import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import {
  appBorderColor,
  appColor1,
  appColor2,
  appColor2Hover
} from '../../emotion/variables'
import format from 'date-fns/format'

const ProfileMeetingsStyled = styled.div`
  font-size: 1.8rem;
  height: 100%;
  & h3 {
    color: ${appColor1};
    text-align: center;
    padding: 1.5rem;
    font-size: 3.8rem;
    border-bottom: 1px solid ${appBorderColor};
  }
`

const ProfileMeetingsBody = styled.div`
  text-align: center;
  & > div {
    height: 20rem;
  }
  & > div:not(:last-of-type) {
    border-bottom: 1px solid ${appBorderColor};
  }
  & h5 {
    color: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  & p {
    padding: 1rem 3rem;
  }
  & p:last-of-type {
    margin-bottom: 3rem;
  }
  @media (max-width: 335px) {
    & h5 {
      font-size: 1.6rem;
    }
  }
`

const meetingLinkStyles = css`
  display: inline-block;
  color: ${appColor2};
  &:hover {
    color: ${appColor2Hover};
  }
`

const noMeetingsStyles = css`
  text-align: center;
`

const MeetingListItem = ({ meetingInfo }) => (
  <p>
    {format(meetingInfo.meetingDate.toDate(), 'M/d/YYYY')} -{' '}
    <Link to={`/meetings/${meetingInfo.meetingId}`} css={meetingLinkStyles}>
      <span>{meetingInfo.meetingTitle}</span>
    </Link>
  </p>
)

const ProfileMeetings = ({ profileMeetings }) => {
  const { upcomingMeetings, attendedMeetings, hostedMeetings } = profileMeetings || {}
  return (
    <ProfileMeetingsStyled>
      <h3>Meetings</h3>
      <ProfileMeetingsBody>
        <div>
          <h5>Most Recent Upcoming Meetings</h5>
          {upcomingMeetings && upcomingMeetings.length > 0 ? (
            upcomingMeetings.map(upcomingMeeting => (
              <MeetingListItem
                meetingInfo={upcomingMeeting}
                key={upcomingMeeting.meetingId}
              />
            ))
          ) : (
            <p css={noMeetingsStyles}>No Meetings</p>
          )}
        </div>
        <div>
          <h5>Most Recently Attended Meetings</h5>
          {attendedMeetings && attendedMeetings.length > 0 ? (
            attendedMeetings.map(attendedMeeting => (
              <MeetingListItem
                meetingInfo={attendedMeeting}
                key={attendedMeeting.meetignId}
              />
            ))
          ) : (
            <div css={noMeetingsStyles}>No Meetings</div>
          )}
        </div>
        <div>
          <h5>Most Recently Hosted Meetings</h5>
          {hostedMeetings && hostedMeetings.length > 0 ? (
            hostedMeetings.map(hostedMeeting => (
              <MeetingListItem
                meetingInfo={hostedMeeting}
                key={hostedMeeting.meetignId}
              />
            ))
          ) : (
            <div css={noMeetingsStyles}>No Meetings</div>
          )}
        </div>
      </ProfileMeetingsBody>
    </ProfileMeetingsStyled>
  )
}

export default ProfileMeetings
