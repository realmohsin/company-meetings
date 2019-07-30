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
