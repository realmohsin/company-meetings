import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import format from 'date-fns/format'
import {
  pagePadding,
  appBorderColor,
  appIconColor,
  darkTextColor,
  appBoxShadow
} from '../../emotion/variables'
import {
  selectMeetingsError,
  selectSelectedMeeting,
  selectIsAttendee
} from '../../store/selectors/meetingSelectors'
import { selectUser } from '../../store/selectors/authSelectors'
import {
  fetchSelectedMeeting,
  joinMeeting,
  leaveMeeting
} from '../../store/actions/actions'
import AttendeesList from '../../components/meetings/AttendeesList'
import MeetingChat from '../../components/meetings/MeetingChat'
import buttonCss from '../../emotion/buttonCss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrow,
  faClock,
  faMapMarker,
  faCalendar
} from '@fortawesome/free-solid-svg-icons'
import departments from '../../data/departments'
import Button from '../../components/utils/Button'

const mapStateToProps = state => ({
  user: selectUser(state),
  selectedMeeting: selectSelectedMeeting(state),
  isAttendee: selectIsAttendee(state),
  error: selectMeetingsError(state)
})

class MeetingPage extends React.Component {
  componentDidMount () {
    this.props.fetchSelectedMeeting(this.props.match.params.meetingId)
  }

  render () {
    const {
      selectedMeeting,
      error,
      user,
      isAttendee,
      history,
      joinMeeting,
      leaveMeeting
    } = this.props
    console.log('from render of MeetingPage', selectedMeeting)
    if (error) return <div css={meetingPageCss}>Cannot Retreive Meeting</div>
    if (!selectedMeeting) return <div>hello</div>
    const attendees = Object.keys(selectedMeeting.attendees).map(uid => ({
      uid,
      ...selectedMeeting.attendees[uid]
    }))
    return (
      <div css={meetingPageCss}>
        <div css={leftGridContainer}>
          <section css={headerCss}>
            <div
              css={css`
                ${imgContainer};
                &::before {
                  background: ${departments[selectedMeeting.department].rgba};
                }
              `}
            >
              <img
                src={departments[selectedMeeting.department].imageURL}
                alt='department'
              />
              <div>
                <h2>{selectedMeeting.title}</h2>
                <p>Hosted by: {selectedMeeting.hostName}</p>
              </div>
            </div>
            <div css={headerBottom}>
              {user.uid === selectedMeeting.hostUid ? (
                <button
                  onClick={() => history.push(`/meetings/edit/${selectedMeeting.id}`)}
                  css={buttonCss}
                >
                  Manage Meeting
                </button>
              ) : isAttendee ? (
                <Button
                  onClick={() => leaveMeeting(selectedMeeting.id)}
                  content='Cancel My Place'
                  color='red'
                />
              ) : (
                <button onClick={() => joinMeeting(selectedMeeting.id)} css={buttonCss}>
                  Join Meeting
                </button>
              )}
            </div>
          </section>
          <section css={detailsCss}>
            <div
              css={css`
                ${detailSection};
                color: ${departments[selectedMeeting.department].hex};
                font-size: 3.2rem;
              `}
            >
              <FontAwesomeIcon css={iconCss} icon={faArrow} />
              {selectedMeeting.department}
            </div>
            <div css={detailSection}>
              <span>{format(selectedMeeting.date.toDate(), 'MMMM Do, YYYY')}</span> at{' '}
              <span>
                {format(selectedMeeting.startTime.toDate(), 'h:mm A')} to{' '}
                {format(selectedMeeting.endTime.toDate(), 'h:mm A')}
              </span>
            </div>
            <div css={detailSection}>
              <span>{selectedMeeting.building}</span> in{' '}
              <span>Room: {selectedMeeting.room}</span>
            </div>
          </section>
          <div>
            <MeetingChat meetingId={selectedMeeting.id} />
          </div>
        </div>
        <AttendeesList attendees={attendees} />
      </div>
    )
  }
}

// styles

const meetingPageCss = css`
  ${pagePadding};
  color: ${darkTextColor};
  padding-top: 11rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 4rem;
`

const leftGridContainer = css`
  margin: 0 2rem;
`

const headerCss = css`
  border: 1px solid ${appBorderColor};
  border-radius: 0.6rem;
  box-shadow: ${appBoxShadow};
  height: 30rem;
  width: 100%;
  overflow: hidden;
`
const imgContainer = css`
  position: relative;
  height: 20rem;
  width: 100%;
  overflow: hidden;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.9);
  & img {
    width: 100%;
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  & > div {
    position: absolute;
    bottom: 10%;
    left: 7%;
    width: 100%;
    height: auto;
    color: white;
  }
  & h2 {
    font-size: 4rem;
  }
  & p {
    font-size: 2.5rem;
  }
`

const headerBottom = css`
  display: flex;
  height: 10rem;
  align-items: center;
  padding-left: 7rem;
  background: #fff;
`

const detailsCss = css`
  border: 1px solid ${appBorderColor};
  border-radius: 0.6rem;
  box-shadow: ${appBoxShadow};
  background: #fff;
  height: 29rem;
  width: 100%;
  margin: 3rem 0;
`

const detailSection = css`
  height: 33.33%;
  border-bottom: 1px solid ${appBorderColor};
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 5rem;
  &:first-of-type {
    padding-left: 7rem;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.4);
  }
  & span {
    margin: 0 2rem;
  }
`

const iconCss = css`
  color: ${appIconColor};
  margin: 0 3rem;
  font-size: 2.3rem;
`

export default connect(
  mapStateToProps,
  { fetchSelectedMeeting, joinMeeting, leaveMeeting }
)(MeetingPage)
