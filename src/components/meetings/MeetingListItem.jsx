import React from 'react'
import { css } from '@emotion/core'
import { Link, withRouter } from 'react-router-dom'
import format from 'date-fns/format'
import {
  appBorderColor,
  appIconColor,
  appColor1,
  appColor1Hover,
  appColor2,
  appColor2Hover
} from '../../emotion/variables'
import defaultUserPhoto from '../../assets/defaultUserPhoto.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBuilding,
  faClock,
  faMapMarker,
  faCalendar
} from '@fortawesome/free-solid-svg-icons'
import buttonCss from '../../emotion/buttonCss'
import Ribbon from '../utils/Ribbon'
import Button from '../utils/Button'
import AttendeeIcon from './AttendeeIcon'

const MeetingListItem = ({ meeting, history }) => {
  const attendeesMap = meeting.attendees
  const attendees = Object.keys(attendeesMap).map(id => ({ ...attendeesMap[id], id }))
  return (
    <div css={meetingListItem}>
      <Ribbon color='blue' fontSize='20px' css={ribbonPosition}>
        {meeting.department}
      </Ribbon>
      <div css={headerCss}>
        <div css={headerImage}>
          {/* <img src={meeting.hostPhotoURL || defaultUserPhoto} alt='host photo' /> */}
        </div>
        <div css={headerText}>
          <h2>
            <Link to={`/meetings/${meeting.id}`}>{meeting.title}</Link>
          </h2>
          <p>
            Hosted by <span>{meeting.hostName}</span>
          </p>
        </div>
      </div>
      <div css={dateCss}>
        <div>
          <FontAwesomeIcon css={iconCss} icon={faCalendar} />
          <span>{format(meeting.date.toDate(), 'MMMM Do, YYYY')}</span>
        </div>

        <div>
          <FontAwesomeIcon css={iconCss} icon={faClock} />
          <span>
            {format(meeting.startTime.toDate(), 'h:mm A')} to{' '}
            {format(meeting.endTime.toDate(), 'h:mm A')}
          </span>
        </div>
      </div>
      <div css={attendeesCss}>
        {attendees &&
          attendees.map(attendee => (
            <AttendeeIcon key={attendee.id} photoURL={attendee.photoURL} />
          ))}
      </div>
      <div css={locationCss}>
        <div>
          <FontAwesomeIcon css={iconCss} icon={faBuilding} />
          <span>{meeting.building}</span>
        </div>

        <div>
          <FontAwesomeIcon css={iconCss} icon={faMapMarker} />
          <span>Room: {meeting.room}</span>
        </div>
      </div>
      <Button
        onClick={() => history.push(`/meetings/${meeting.id}`)}
        css={viewButtonCss}
        content='View'
      />
    </div>
  )
}

const borderBottom = `border-bottom: 1px solid ${appBorderColor}`
const padding = 'padding: 3rem 4rem'

const meetingListItem = css`
  position: relative;
  margin: 3rem auto;
  border-radius: 0.4rem;
  background: white;
  border: 1px solid ${appBorderColor};
  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12), 0 2px 10px 0 rgba(34, 36, 38, 0.15);
  color: rgba(34, 36, 38, 0.75);
`

const headerCss = css`
  ${padding};
  ${borderBottom};
  display: flex;
`

const headerImage = css`
  height: 10rem;
  margin-right: 3rem;
  & img {
    height: 100%;
    border-radius: 50%;
  }
`

const headerText = css`
  flex: 3.5;
  padding-left: 0rem;
  & h2 {
    padding-top: 0.5rem;
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
    color: ${appColor1};
    text-decoration: underline;
  }
  & h2:hover {
    color: ${appColor1Hover};
  }
  & p {
    font-size: 1.6rem;
    color: ${appIconColor};
  }
  & span {
    font-weight: bold;
    color: ${appColor2};
  }
  & span:hover {
    cursor: pointer;
    color: ${appColor2Hover};
  }
`

const dateCss = css`
  ${padding};
  ${borderBottom};
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 1.8rem;
`

const attendeesCss = css`
  ${padding};
  ${borderBottom};
  background: #f3f4f5;
`

const locationCss = css`
  ${padding};
  padding-bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 1.8rem;
`

const iconCss = css`
  color: ${appColor2};
  margin: 0 1rem;
  font-size: 2.4rem;
`

const viewButtonCss = css`
  display: block;
  margin: 0.2rem 5rem 3rem auto;
`

const ribbonPosition = css`
  top: 9rem;
  right: -2.1rem;
`

export default withRouter(MeetingListItem)
