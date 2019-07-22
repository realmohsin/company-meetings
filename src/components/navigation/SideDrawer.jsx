import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import Backdrop from '../utils/Backdrop'
import LeftNavItems from './LeftNavItems'
import RightNavItems from './RightNavItems'
import { login, logout, hideSideDrawer } from '../../store/actions/actions'
import { selectIsAuth } from '../../store/selectors/authSelectors'
import { selectIsSideDrawerOpen } from '../../store/selectors/sideDrawerSelectors'
import * as mq from '../../emotion/breakpoints'
import { mainGradient } from '../../emotion/variables'

const mapStateToProps = state => ({
  isAuth: selectIsAuth(state),
  show: selectIsSideDrawerOpen(state)
})

const SideDrawer = ({ show, isAuth, login, logout, hideSideDrawer }) => {
  const styles = show ? open : closed

  return (
    <>
      <Backdrop show={show} handleClick={hideSideDrawer} />
      <nav
        css={css`
          ${sideDrawer};
          ${styles};
        `}
      >
        <LeftNavItems sideDrawer isAuth={isAuth} />
        <RightNavItems sideDrawer isAuth={isAuth} login={login} logout={logout} />
      </nav>
    </>
  )
}

const sideDrawer = css`
  display: none;
  ${mq.bp1} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    width: 28rem;
    max-width: 70%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 200;
    color: white;
    background: ${mainGradient};
    transition: transform 0.3s ease-out;
  }
`

const open = css`
  transform: translateX(0);
`

const closed = css`
  transform: translateX(-100%);
`

export default connect(
  mapStateToProps,
  { login, logout, hideSideDrawer }
)(SideDrawer)
