import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import {
  selectActivities,
  selectActivitiesError
} from '../../store/selectors/activitySelectors'

const mapStateToProps = state => ({
  activities: selectActivities(state),
  error: selectActivitiesError(state)
})

const Activity = ({ activities, error }) => {
  if (error) return <div>Cannot Retrieve Activity</div>
  return (
    <div>
      <h3>Activity Feed</h3>
      {activities.map(activity => (
        <p>activity: {activity.type}</p>
      ))}
    </div>
  )
}

export default connect(mapStateToProps)(Activity)
