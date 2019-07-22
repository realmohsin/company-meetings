import { createSelector } from 'reselect'

export const selectModalState = state => state.modal

export const selectModalType = createSelector(
  [selectModalState],
  modalState => modalState.modalType
)

export const selectModalProps = createSelector(
  [selectModalState],
  modalState => modalState.modalProps
)
