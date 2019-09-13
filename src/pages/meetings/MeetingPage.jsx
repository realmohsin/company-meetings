import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import format from 'date-fns/format'
import {
  pagePadding,
  appBorderColor,
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
import departments from '../../data/departments'
import Button from '../../components/utils/Button'
import cancelledOverlay from '../../emotion/cancelledOverlay'

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
          <section
            css={css`
              ${headerCss};
              ${selectedMeeting.cancelled && cancelledOverlayMP}
            `}
          >
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
                <p>Held by {selectedMeeting.hostName}</p>
              </div>
            </div>
            <div css={headerBottom}>
              {user.uid === selectedMeeting.hostUid ? (
                <button
                  onClick={() => history.push(`/meetings/edit/${selectedMeeting.id}`)}
                  css={css`
                    ${buttonCss};
                    ${selectedMeeting.cancelled &&
                      css`
                        z-index: 11;
                      `}
                  `}
                >
                  {selectedMeeting.cancelled
                    ? 'Reactivate Meeting'
                    : 'Edit or Cancel Meeting'}
                </button>
              ) : isAttendee ? (
                <Button
                  onClick={() => leaveMeeting(selectedMeeting.id)}
                  content='Cancel My Place'
                  color='red'
                />
              ) : (
                <Button
                  onClick={() => joinMeeting(selectedMeeting.id)}
                  content='Join Meeting'
                  color='teal'
                />
              )}
            </div>
          </section>
          <section
            css={css`
              ${detailsCss};
              ${selectedMeeting.cancelled && cancelledOverlayMP}
            `}
          >
            <div
              css={css`
                ${detailSection};
                color: ${departments[selectedMeeting.department].hex};
              `}
            >
              {selectedMeeting.department}
            </div>
            <div css={detailSection}>
              <span>{format(selectedMeeting.date.toDate(), 'MMMM Do, YYYY')}</span> at{' '}
              <span>
                {format(selectedMeeting.startTime.toDate(), 'h:mm A')} -{' '}
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

export const meetingPageCss = css`
  ${pagePadding};
  color: ${darkTextColor};
  padding-top: 11rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 6rem;
  @media (max-width: 1400px) {
    grid-gap: 4rem;
  }
  @media (max-width: 1295px) {
    grid-template-columns: 2.4fr 1fr;
  }
  @media (max-width: 945px) {
    grid-template-columns: 1fr;
  }
`

const leftGridContainer = css`
  ${''}
`

const cancelledOverlayMP = css`
  ${cancelledOverlay};
  &::before {
    justify-content: flex-end;
    align-items: flex-end;
    padding: 3rem;
    z-index: 10;
  }
`

const headerCss = css`
  border: 1px solid ${appBorderColor};
  border-radius: 0.6rem;
  box-shadow: ${appBoxShadow};
  height: 30rem;
  width: 100%;
  overflow: hidden;
  position: relative;
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
    font-size: 2rem;
  }
  @media (max-width: 720px) {
    & h2 {
      font-size: 3.3rem;
    }
    & p {
      font-size: 1.6rem;
      margin-right: 1rem;
    }
  }
  @media (max-width: 500px) {
    & > div {
      width: auto;
    }
    & h2 {
      font-size: 2.6rem;
      margin-right: 1rem;
    }
  }
`

const headerBottom = css`
  display: flex;
  height: 10rem;
  align-items: center;
  padding-left: 4rem;
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
  position: relative;
  @media (max-width: 460px) {
    height: 32rem;
  }
`

const detailSection = css`
  height: 33.33%;
  border-bottom: 1px solid ${appBorderColor};
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 5rem;
  font-size: 0.9em;
  &:first-of-type {
    padding-left: 7rem;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.4);
    font-size: 2.8rem;
  }
  & span {
    margin: 0 2rem;
    font-weight: bold;
  }
  @media (max-width: 625px) {
    padding-left: 0;
    justify-content: center;
    font-size: 0.85em;
    &:first-of-type {
      padding-left: 0;
      font-size: 2.6rem;
    }
  }
  @media (max-width: 460px) {
    flex-direction: column;
    &:first-of-type {
      font-size: 2.2rem;
    }
  }
`

// const iconCss = css`
//   color: ${appIconColor};
//   margin: 0 3rem;
//   font-size: 2.3rem;
// `

export default connect(
  mapStateToProps,
  { fetchSelectedMeeting, joinMeeting, leaveMeeting }
)(MeetingPage)
