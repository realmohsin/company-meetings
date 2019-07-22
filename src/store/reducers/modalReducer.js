import { OPEN_MODAL, CLOSE_MODAL } from '../actions/actionTypes'

const initialState = {
  modalType: null,
  modalProps: null
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps
      }
    case CLOSE_MODAL:
      return {
        ...state,
        modalType: null,
        modalProps: null
      }
    default:
      return state
  }
}

export default modalReducer
