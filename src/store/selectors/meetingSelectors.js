import { createSelector } from 'reselect'

export const selectMeetingsState = state => state.meetings

export const selectMeetingsLoading = createSelector(
  [selectMeetingsState],
  meetingsState => meetingsState.loading
)

export const selectMeetingsError = createSelector(
  [selectMeetingsState],
  meetingsState => meetingsState.error
)

export const selectDashboardState = createSelector(
  [selectMeetingsState],
  meetingsState => meetingsState.dashboard
)

export const selectWillBeInitialFetch = createSelector(
  [selectDashboardState],
  dashboardState => dashboardState.willBeInitialFetch
)

export const selectAllFetchedMeetings = createSelector(
  [selectDashboardState],
  dashboardState => dashboardState.allFetchedMeetings
)

export const selectNewlyFetchedMeetings = createSelector(
  [selectDashboardState],
  dashboardState => dashboardState.newlyFetchedMeetings
)

export const selectIsMoreToFetch = createSelector(
  [selectNewlyFetchedMeetings, selectWillBeInitialFetch],
  (newlyFetchedMeetings, willBeInitialFetch) =>
    willBeInitialFetch || newlyFetchedMeetings.length === 2
)

export const selectSelectedMeeting = createSelector(
  [selectMeetingsState],
  meetingsState => meetingsState.selectedMeeting
)
