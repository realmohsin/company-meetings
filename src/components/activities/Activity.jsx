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
  @media (max-width: 1500px) {
    left: 64vw;
  }
  @media (max-width: 1400px) {
    left: 65vw;
  }
  @media (max-width: 1295px) {
    width: 30rem;
    left: 66vw;
  }
  @media (max-width: 1225px) {
    left: 65vw;
  }
  @media (max-width: 1200px) {
    left: 64vw;
  }
  @media (max-width: 1145px) {
    left: 62vw;
  }
  @media (max-width: 1020px) {
    width: 28rem;
  }
  @media (max-width: 925px) {
    position: static;
    width: 34rem;
    margin: 5rem auto;
    left: 0;
  }
  @media (max-width: 435px) {
    width: auto;
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
