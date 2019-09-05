import React from 'react'
import { connect } from 'react-redux'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import UnauthorizedModal from './UnauthorizedModal'
import Backdrop from '../utils/Backdrop'
import { selectModalType, selectModalProps } from '../../store/selectors/modalSelectors'
import { openModal, closeModal } from '../../store/actions/actions'
import history from '../../history/history'

const mapStateToProps = state => ({
  modalType: selectModalType(state),
  modalProps: selectModalProps(state)
})

const ModalManager = ({ modalType, modalProps, openModal, closeModal }) => {
  const modalLookup = {
    LoginModal,
    RegisterModal,
    UnauthorizedModal
  }

  const closeModalForBackdrop = (modalType, closeModal) => {
    closeModal()
    if (modalType === 'UnauthorizedModal') {
      history.push('/meetings')
    }
  }

  let ModalComponent
  if (modalType) {
    ModalComponent = modalLookup[modalType]
    return (
      <>
        <Backdrop
          show={!!modalType}
          handleClick={() => closeModalForBackdrop(modalType, closeModal)}
        />
        <ModalComponent {...modalProps} openModal={openModal} closeModal={closeModal} />
      </>
    )
  }

  return null
}

export default connect(
  mapStateToProps,
  { openModal, closeModal }
)(ModalManager)
