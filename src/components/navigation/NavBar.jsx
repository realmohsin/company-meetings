import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo'
import Toggler from '../utils/Toggler'
import LeftNavItems from './LeftNavItems'
import RightNavItems from './RightNavItems'
import { login, logout, toggleSideDrawer, openModal } from '../../store/actions/actions'
import { selectIsAuth } from '../../store/selectors/authSelectors'
import * as mq from '../../emotion/breakpoints'
import { mainGradient } from '../../emotion/variables'
import containerCss from '../../emotion/containerCss'

const mapStateToProps = state => ({
  isAuth: selectIsAuth(state)
})

const NavBar = ({ isAuth, login, logout, toggleSideDrawer, openModal }) => {
  return (
    <nav css={navCss}>
      <div css={container}>
        <Toggler styles={bp1} handleToggle={toggleSideDrawer} />
        <NavLink exact to='/' css={bp1}>
          <div css={logoCss}>
            <Logo />
          </div>
        </NavLink>
        <LeftNavItems isAuth={isAuth} />
        <RightNavItems isAuth={isAuth} openModal={openModal} logout={logout} />
      </div>
    </nav>
  )
}

const navCss = css`
  height: 5.8rem;
  width: 100%;
  position: fixed;
  top: 0;
  background: ${mainGradient};
  color: white;
  & .active {
    background: rgba(255, 255, 255, 0.08);
  }
`

const container = css`
  ${containerCss};
  height: 100%;
  display: flex;
  justify-content: space-between;
`

const logoCss = css`
  width: 5.8rem;
  height: 5.8rem;
  padding: 0.7rem;
`

const bp1 = css`
  display: none;
  ${mq.bp1} {
    display: flex;
  }
`

export default connect(
  mapStateToProps,
  { login, logout, toggleSideDrawer, openModal }
)(NavBar)
