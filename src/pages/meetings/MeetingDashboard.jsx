import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import MeetingList from '../../components/meetings/MeetingList'
import Activity from '../../components/activities/Activity'
import { pagePadding } from '../../emotion/variables'
import {
  fetchMeetingsForDashboard,
  resetDashboardState,
  onSuccessActivityListener,
  onErrorActivityListener
} from '../../store/actions/actions'
import {
  selectAllFetchedMeetings,
  selectIsMoreToFetch,
  selectMeetingsError
} from '../../store/selectors/meetingSelectors'
import { firestore } from '../../firebase/firebase'

const mapStateToProps = state => ({
  meetings: selectAllFetchedMeetings(state),
  isMoreToFetch: selectIsMoreToFetch(state),
  error: selectMeetingsError(state)
})

class MeetingDashboard extends React.Component {
  componentDidMount () {
    const {
      fetchMeetingsForDashboard,
      onSuccessActivityListener,
      onErrorActivityListener
    } = this.props
    fetchMeetingsForDashboard()
    this.unsubActivitiesObserver = firestore
      .collection('activities')
      .orderBy('timestamp', 'desc')
      .limit(5)
      .onSnapshot(onSuccessActivityListener, onErrorActivityListener)
  }

  componentWillUnmount () {
    this.props.resetDashboardState()
    this.unsubActivitiesObserver()
  }

  render () {
    const { meetings, isMoreToFetch, fetchMeetingsForDashboard } = this.props
    return (
      <div css={meetingDashboard}>
        <Activity />
        <MeetingList
          meetings={meetings}
          isMoreToFetch={isMoreToFetch}
          fetchMeetingsForDashboard={fetchMeetingsForDashboard}
        />
      </div>
    )
  }
}

// styles
const meetingDashboard = css`
  ${pagePadding};
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 4rem;
  @media (max-width: 1400px) {
    grid-gap: 2rem;
  }
  @media (max-width: 1295px) {
    grid-template-columns: 2.4fr 1fr;
  }
  @media (max-width: 930px) {
    grid-template-columns: 1fr;
  }
`

export default connect(
  mapStateToProps,
  {
    fetchMeetingsForDashboard,
    resetDashboardState,
    onSuccessActivityListener,
    onErrorActivityListener
  }
)(MeetingDashboard)
