import React from 'react'
import { css } from '@emotion/core'
import { Link, withRouter } from 'react-router-dom'
import format from 'date-fns/format'
import { appBorderColor, appIconColor } from '../../emotion/variables'
import defaultUserPhoto from '../../assets/defaultUserPhoto.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBuilding,
  faClock,
  faMapMarker,
  faCalendar
} from '@fortawesome/free-solid-svg-icons'
import buttonCss from '../../emotion/buttonCss'

const MeetingListItem = ({ meeting, history }) => {
  return (
    <div css={meetingListItem}>
      <div css={headerCss}>
        <div css={headerImage}>
          <img src={meeting.hostPhotoURL || defaultUserPhoto} alt='host photo' />
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
      <div css={departmentCss}>
        <FontAwesomeIcon css={iconCss} icon={faBuilding} />
        Department: {meeting.department}
      </div>
      <div css={attendeesCss}>attendees</div>
      <div css={locationCss}>
        <FontAwesomeIcon css={iconCss} icon={faCalendar} />
        <span>{format(meeting.date.toDate(), 'MMMM Do, YYYY')}</span>

        <FontAwesomeIcon css={iconCss} icon={faClock} />
        <span>
          {format(meeting.startTime.toDate(), 'h:mm A')} to{' '}
          {format(meeting.endTime.toDate(), 'h:mm A')}
        </span>

        <FontAwesomeIcon css={iconCss} icon={faMapMarker} />
        <span>
          Building: {meeting.building}, Room {meeting.room}
        </span>

        <button
          onClick={() => history.push(`/meetings/${meeting.id}`)}
          css={viewButtonCss}
        >
          View
        </button>
      </div>
    </div>
  )
}

const borderBottom = `border-bottom: 1px solid ${appBorderColor}`
const padding = 'padding: 3rem 4rem'

const meetingListItem = css`
  margin: 3rem auto;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
  background: white;
`

const headerCss = css`
  ${padding};
  ${borderBottom};
  display: flex;
`

const headerImage = css`
  flex: 1;
  height: 10rem;
  & img {
    height: 100%;
    border-radius: 50%;
  }
`

const headerText = css`
  flex: 3.5;
  padding-left: 3rem;
`

const departmentCss = css`
  ${padding};
  ${borderBottom};
`

const attendeesCss = css`
  ${padding};
  ${borderBottom};
  background: #f3f4f5;
`

const locationCss = css`
  ${padding};
  & span {
    margin-right: 3rem;
  }
`

const iconCss = css`
  color: ${appIconColor};
  margin: 0 1rem;
  font-size: 2.3rem;
`

const viewButtonCss = css`
  ${buttonCss};
  display: block;
  margin: 1rem 1rem 1rem auto;
`

export default withRouter(MeetingListItem)
