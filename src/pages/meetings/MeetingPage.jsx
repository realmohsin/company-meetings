import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import format from 'date-fns/format'
import { pagePadding } from '../../emotion/variables'
import {
  selectMeetingsError,
  selectSelectedMeeting
} from '../../store/selectors/meetingSelectors'
import { fetchSelectedMeeting } from '../../store/actions/actions'
import AttendeesList from '../../components/meetings/AttendeesList'

const mapStateToProps = state => ({
  selectedMeeting: selectSelectedMeeting(state),
  error: selectMeetingsError(state)
})

class MeetingPage extends React.Component {
  componentDidMount () {
    this.props.fetchSelectedMeeting(this.props.match.params.meetingId)
  }

  render () {
    const { selectedMeeting, error } = this.props
    if (error) return <div css={meetingPage}>Cannot Retreive Meeting</div>
    if (!selectedMeeting) return <div>hello</div>
    const attendees = Object.keys(selectedMeeting.attendees).map(uid => ({
      uid,
      ...selectedMeeting.attendees[uid]
    }))
    return (
      <div css={meetingPageCss}>
        <div>
          <div>{selectedMeeting.title}</div>
          <div>{format(selectedMeeting.date.toDate(), 'MMMM')}</div>
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
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 2rem;
`

export default connect(
  mapStateToProps,
  { fetchSelectedMeeting }
)(MeetingPage)
