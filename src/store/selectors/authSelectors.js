import { createSelector } from 'reselect'

export const selectAuthState = state => state.auth

export const selectUser = createSelector(
  [selectAuthState],
  authState => authState.user
)

export const selectIsAuth = createSelector(
  [selectUser],
  user => !!user
)

export const selectPhotos = createSelector(
  [selectAuthState],
  authState => authState.photos
)

export const selectProfileMeetings = createSelector(
  [selectAuthState],
  authState => authState.profileMeetings
)
