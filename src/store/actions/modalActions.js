import { OPEN_MODAL, CLOSE_MODAL } from './actionTypes'
import { hideSideDrawer } from './sideDrawerActions'

export const openModal = (modalType, modalProps) => (dispatch, getState) => {
  if (getState().isSideDrawerOpen) {
    dispatch(hideSideDrawer())
  }
  dispatch({
    type: OPEN_MODAL,
    modalType,
    modalProps
  })
}

export const closeModal = () => ({ type: CLOSE_MODAL })
