import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import MeetingList from '../../components/meetings/MeetingList'
import Activity from '../../components/activities/Activity'
import { pagePadding } from '../../emotion/variables'
import {
  fetchMeetingsForDashboard,
  resetDashboardState
} from '../../store/actions/actions'
import {
  selectAllFetchedMeetings,
  selectIsMoreToFetch,
  selectMeetingsError
} from '../../store/selectors/meetingSelectors'

const mapStateToProps = state => ({
  meetings: selectAllFetchedMeetings(state),
  isMoreToFetch: selectIsMoreToFetch(state),
  error: selectMeetingsError(state)
})

class MeetingDashboard extends React.Component {
  componentDidMount () {
    console.log('meeting dashboard')
    this.props.fetchMeetingsForDashboard()
  }

  componentWillUnmount () {
    this.props.resetDashboardState()
  }

  render () {
    const { meetings, isMoreToFetch, fetchMeetingsForDashboard } = this.props
    return (
      <div css={meetingDashboard}>
        <MeetingList
          meetings={meetings}
          isMoreToFetch={isMoreToFetch}
          fetchMeetingsForDashboard={fetchMeetingsForDashboard}
        />
        <Activity />
      </div>
    )
  }
}

// styles
const meetingDashboard = css`
  ${pagePadding};
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 2rem;
`

export default connect(
  mapStateToProps,
  { fetchMeetingsForDashboard, resetDashboardState }
)(MeetingDashboard)
