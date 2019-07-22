// all application actions
import {
  LOGIN,
  LOGOUT,
  SHOW_SIDEDRAWER,
  HIDE_SIDEDRAWER,
  TOGGLE_SIDEDRAWER,
  OPEN_MODAL,
  CLOSE_MODAL
} from './actionTypes'

export const login = () => ({ type: LOGIN })
export const logout = () => ({ type: LOGOUT })
export const showSideDrawer = () => ({ type: SHOW_SIDEDRAWER })
export const hideSideDrawer = () => ({ type: HIDE_SIDEDRAWER })
export const toggleSideDrawer = () => ({ type: TOGGLE_SIDEDRAWER })

export const openModal = (modalType, modalProps) => ({
  type: OPEN_MODAL,
  modalType,
  modalProps
})

export const closeModal = () => ({ type: CLOSE_MODAL })
