import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import {
  selectActivities,
  selectActivitiesError
} from '../../store/selectors/activitySelectors'
import styled from '@emotion/styled'
import Segment from '../utils/Segment'
import { appBorderColor, appColor1 } from '../../emotion/variables'
import ActivityItem from './ActivityItem'

const mapStateToProps = state => ({
  activities: selectActivities(state),
  error: selectActivitiesError(state)
})

const ActivitySegment = styled(Segment)`
  position: fixed;
  left: 63vw;
  width: 34rem;
  border: none;
  margin: 3rem;
  padding: 0;
  height: auto;
  background: white;

  & > header {
    background: ${appColor1};
    padding: 1rem;
    height: 4rem;
    text-align: center;
    color: white;
    border-radius: 5px 5px 0 0;
  }
`

const Activity = ({ activities, error }) => {
  console.log(activities)
  if (error) return <div>Cannot Retrieve Activity</div>
  return (
    <ActivitySegment>
      <header>Recent Activity</header>
      {activities.map(activity => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </ActivitySegment>
  )
}

export default connect(mapStateToProps)(Activity)
