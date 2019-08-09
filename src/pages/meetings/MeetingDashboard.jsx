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
import {
  onSuccessActivityListener,
  onErrorActivityListener
} from '../../store/actions/actions'
import { firestore } from '../../firebase/firebase'

const mapStateToProps = state => ({
  meetings: selectAllFetchedMeetings(state),
  isMoreToFetch: selectIsMoreToFetch(state),
  error: selectMeetingsError(state)
})

class MeetingDashboard extends React.Component {
  componentDidMount () {
    console.log('from meeting dashboard componentDidMount, props: ', this.props)
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
  {
    fetchMeetingsForDashboard,
    resetDashboardState,
    onSuccessActivityListener,
    onErrorActivityListener
  }
)(MeetingDashboard)
