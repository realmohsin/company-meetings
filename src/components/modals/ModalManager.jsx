import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import Backdrop from '../utils/Backdrop'
import { selectModalType, selectModalProps } from '../../store/selectors/modalSelectors'
import { closeModal } from '../../store/actions/actions'

const mapStateToProps = state => ({
  modalType: selectModalType(state),
  modalProps: selectModalProps(state)
})

const ModalManager = ({ modalType, modalProps }) => {
  const modalLookup = {
    LoginModal,
    RegisterModal
  }
  let ModalComponent
  if (modalType) {
    ModalComponent = modalLookup[modalType]
    return (
      <>
        <Backdrop show={!!modalType} handleClick={closeModal} />
        <ModalComponent {...modalProps} />
      </>
    )
  }

  return null
}

export default connect(
  mapStateToProps,
  { closeModal }
)(ModalManager)
