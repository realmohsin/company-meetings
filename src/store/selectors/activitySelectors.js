import { createSelector } from 'reselect'

export const selectActivityState = state => state.activities

export const selectActivities = createSelector(
  [selectActivityState],
  activityState => activityState.activities
)

export const selectActivitiesError = createSelector(
  [selectActivityState],
  activityState => activityState.error
)
