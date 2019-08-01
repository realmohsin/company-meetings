import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import format from 'date-fns/format'
import { pagePadding, appBorderColor, appIconColor } from '../../emotion/variables'
import {
  selectMeetingsError,
  selectSelectedMeeting
} from '../../store/selectors/meetingSelectors'
import { selectUser } from '../../store/selectors/authSelectors'
import { fetchSelectedMeeting, resetSelectedMeeting, joinMeeting, leaveMeeting } from '../../store/actions/actions'
import AttendeesList from '../../components/meetings/AttendeesList'
import accountingImage from '../../assets/accounting.jpg'
import customerServiceImage from '../../assets/customerService.jpg'
import humanResourcesImage from '../../assets/humanResources.jpg'
import marketingImage from '../../assets/marketing.png'
import productionImage from '../../assets/production.jpg'
import researchAndDevelopmentImage from '../../assets/researchAndDevelopment.jpg'
import buttonCss from '../../emotion/buttonCss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBuilding,
  faClock,
  faMapMarker,
  faCalendar
} from '@fortawesome/free-solid-svg-icons'

const mapDepartmentToImage = {
  accounting: accountingImage,
  customerService: customerServiceImage,
  humanResources: humanResourcesImage,
  marketing: marketingImage,
  production: productionImage,
  researchAndDevelopment: researchAndDevelopmentImage
}

const mapStateToProps = state => ({
  user: selectUser(state),
  selectedMeeting: selectSelectedMeeting(state),
  error: selectMeetingsError(state)
})

class MeetingPage extends React.Component {
  componentDidMount () {
    this.props.fetchSelectedMeeting(this.props.match.params.meetingId)
  }

  componentWillUnmount () {
    this.props.resetSelectedMeeting()
  }

  render () {
    const { selectedMeeting, error, user, history, joinMeeting, leaveMeeting } = this.props
    console.log(selectedMeeting)
    if (error) return <div css={meetingPageCss}>Cannot Retreive Meeting</div>
    if (!selectedMeeting) return <div>hello</div>
    const attendees = Object.keys(selectedMeeting.attendees).map(uid => ({
      uid,
      ...selectedMeeting.attendees[uid]
    }))
    const isAttendee = selectedMeeting.attendees[user.uid]
    return (
      <div css={meetingPageCss}>
        <div css={leftGridContainer}>
          <section css={headerCss}>
            <div css={imgContainer}>
              <img
                src={mapDepartmentToImage[selectedMeeting.department]}
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
                <button onClick={joinMeeting(selectedMeeting.id)} css={buttonCss}>Cancel My Place</button>
              ) : (
                <button onClick={leaveMeeting(selectedMeeting.id)} css={buttonCss}>Join Meeting</button>
              )}
            </div>
          </section>
          <section css={detailsCss}>
            <div css={detailSection}>
              <FontAwesomeIcon css={iconCss} icon={faBuilding} />
              {selectedMeeting.department}
            </div>
            <div css={detailSection}>
              <FontAwesomeIcon css={iconCss} icon={faCalendar} />
              <span>{format(selectedMeeting.date.toDate(), 'MMMM Do, YYYY')}</span>
            </div>
            <div css={detailSection}>
              <FontAwesomeIcon css={iconCss} icon={faClock} />
              <span>
                {format(selectedMeeting.startTime.toDate(), 'h:mm A')} to{' '}
                {format(selectedMeeting.endTime.toDate(), 'h:mm A')}
              </span>
            </div>
          </section>
          <div>chat</div>
        </div>
        <AttendeesList attendees={attendees} />
      </div>
    )
  }
}

// styles

const meetingPageCss = css`
  ${pagePadding};
  padding-top: 10rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 2rem;
`

const leftGridContainer = css`
  margin: 0 2rem;
`

const headerCss = css`
  border: 1px solid ${appBorderColor};
  border-radius: 0.6rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  height: 40rem;
  width: 100%;
`
const imgContainer = css`
  position: relative;
  height: 30rem;
  width: 100%;
  & img {
    width: 100%;
    height: 100%;
    filter: brightness(30%);
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
`

const headerBottom = css`
  display: flex;
  height: 10rem;
  align-items: center;
  padding-left: 3rem;
  background: #fff;
`

const detailsCss = css`
  border: 1px solid ${appBorderColor};
  border-radius: 0.6rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  background: #fff;
  height: 30rem;
  width: 100%;
  margin: 5rem 0;
`

const detailSection = css`
  height: 33.33%;
  border-bottom: 1px solid ${appBorderColor};
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 3rem;
`

const iconCss = css`
  color: ${appIconColor};
  margin: 0 1rem;
  font-size: 2.3rem;
`

export default connect(
  mapStateToProps,
  { fetchSelectedMeeting, resetSelectedMeeting, joinMeeting, leaveMeeting }
)(MeetingPage)
