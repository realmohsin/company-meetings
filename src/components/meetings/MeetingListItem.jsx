import React from 'react'
import { css } from '@emotion/core'
import { Link, withRouter } from 'react-router-dom'
import format from 'date-fns/format'
import {
  appBorderColor,
  appIconColor,
  appColor1,
  appColor2,
  appColor2Hover,
  darkTextColor
} from '../../emotion/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBuilding,
  faClock,
  faMapMarker,
  faCalendar
} from '@fortawesome/free-solid-svg-icons'
import Ribbon from '../utils/Ribbon'
import Button from '../utils/Button'
import AttendeeIcon from './AttendeeIcon'
import departments from '../../data/departments'
import cancelledOverlay from '../../emotion/cancelledOverlay'

const MeetingListItem = ({ meeting, history }) => {
  const attendeesMap = meeting.attendees
  const attendees = Object.keys(attendeesMap).map(id => ({ ...attendeesMap[id], id }))
  return (
    <div
      css={css`
        ${meetingListItem};
        ${meeting.cancelled && cancelledOverlay};
      `}
    >
      <Ribbon
        color={departments[meeting.department].color}
        fontSize='20px'
        css={ribbonPosition}
      >
        {meeting.department}
      </Ribbon>
      <div css={headerCss}>
        <div css={headerImage} />
        <div css={headerText}>
          <h2>
            <Link to={`/meetings/${meeting.id}`}>{meeting.title}</Link>
          </h2>
          <p>
            Hosted by{' '}
            <Link
              to={`/people/${meeting.hostUid}`}
              css={css`
                display: inline;
              `}
            >
              <span>{meeting.hostName}</span>
            </Link>
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
  color: ${darkTextColor};
  @media (max-width: 1295px) {
    width: 65rem;
    margin: 3rem 0;
  }
  @media (max-width: 1200px) {
    width: 60rem;
  }
  @media (max-width: 1145px) {
    width: 57rem;
  }
  @media (max-width: 1060px) {
    width: 55rem;
  }
  @media (max-width: 1020px) {
    width: 53rem;
  }
  @media (max-width: 925px) {
    width: auto;
  }
  @media (max-width: 665px) {
    &:not(:first-of-type) {
      margin: 8rem auto;
    }
  }
`

const headerCss = css`
  ${padding};
  ${borderBottom};
  display: flex;
  @media (max-width: 665px) {
    padding-bottom: 4rem;
  }
  @media (max-width: 640px) {
    padding-top: 5.75rem;
    padding-bottom: 3rem;
  }
`

const headerImage = css`
  height: 10rem;
  margin-right: 3rem;
  & img {
    height: 100%;
    border-radius: 50%;
  }
  @media (max-width: 615px) {
    margin-right: 1rem;
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
    color: ${appColor2};
    text-decoration: underline;
  }
  & h2:hover {
    color: ${appColor2Hover};
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
  @media (max-width: 1295px) {
    & h2 {
      font-size: 3rem;
    }
  }
  @media (max-width: 925px) {
    & h2 {
      font-size: 3.5rem;
    }
  }
  @media (max-width: 700px) {
    & h2 {
      font-size: 3rem;
    }
  }
  @media (max-width: 425px) {
    & h2 {
      font-size: 2.8rem;
    }
  }
  @media (max-width: 350px) {
    & h2 {
      font-size: 2.5rem;
    }
  }
`

const infoRowMediaQueries = css`
  @media (max-width: 615px) {
    & > div {
      margin-left: 24%;
    }
  }
  @media (max-width: 570px) {
    font-size: 1.8rem;
    & > div {
      margin-left: 19%;
    }
  }
  @media (max-width: 550px) {
    & > div {
      margin-left: 16%;
    }
  }
  @media (max-width: 480px) {
    & > div {
      margin-left: 13%;
    }
  }
  @media (max-width: 430px) {
    & > div {
      margin-left: 8%;
    }
  }
  @media (max-width: 385px) {
    font-size: 1.7rem;
    & > div {
      margin-left: 4%;
    }
  }
  @media (max-width: 350px) {
    font-size: 1.5rem;
    & > div {
      margin-left: 0;
    }
  }
`

const dateCss = css`
  ${padding};
  ${borderBottom};
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 1.8rem;
  align-items: center;
  & > div {
    display: flex;
    align-items: center;
  }
  @media (max-width: 665px) {
    grid-template-columns: 1fr;
    font-size: 1.8rem;
    & > div {
      margin-left: 28%;
    }
    & > div:last-of-type {
      margin-top: 2.9rem;
    }
  }
  ${infoRowMediaQueries};
`

const attendeesCss = css`
  ${padding};
  ${borderBottom};
  background: #f3f4f5;
`

const locationCss = css`
  ${padding};
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 1.8rem;
  & > div {
    display: flex;
    align-items: center;
  }
  @media (max-width: 665px) {
    grid-template-columns: 1fr;
    font-size: 1.8rem;
    & > div {
      margin-left: 28%;
    }
    & > div:last-of-type {
      margin-top: 2.9rem;
    }
  }
  ${infoRowMediaQueries};
`

const iconCss = css`
  color: ${appColor1};
  margin: 0 1rem;
  font-size: 3rem;
`

const viewButtonCss = css`
  display: block;
  margin: 0.2rem 5rem 3rem auto;
`

const ribbonPosition = css`
  top: 9rem;
  right: -2.1rem;
  @media (max-width: 1295px) {
    font-size: 18px;
    right: -1.8rem;
  }
  @media (max-width: 1124px) {
    right: -1.85rem;
  }
  @media (max-width: 1090px) {
    right: -1.9rem;
  }
  @media (max-width: 1060px) {
    right: -2rem;
  }
  @media (max-width: 1060px) {
    right: -2rem;
  }
  @media (max-width: 985px) {
    min-width: 7em;
    right: -2.1rem;
  }
  @media (max-width: 665px) {
    top: 10.5rem;
  }
  @media (max-width: 640px) {
    top: 1.5rem;
    font-size: 16px;
    right: -1.81rem;
  }
  @media (max-width: 560px) {
    top: 1.5rem;
  }
  @media (max-width: 525px) {
    top: 2rem;
    font-size: 14px;
    right: -1.6rem;
  }
`

export default withRouter(MeetingListItem)
