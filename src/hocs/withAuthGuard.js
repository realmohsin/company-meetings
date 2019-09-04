import React from 'react'

const withAuthGuard = (isAuthenticated, openModal, Component, props) => {
  if (isAuthenticated) return <Component {...props} />
  openModal('UnauthorizedModal')
  return <div />
}

export default withAuthGuard
