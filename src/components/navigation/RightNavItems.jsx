import React from 'react'
import { css } from '@emotion/core'
import Button from '../utils/Button'
import NavDropdown from './NavDropdown'
import * as mq from '../../emotion/breakpoints'

// This component is used in NavBar and SideDrawer.
// Styles change based on sidedrawer boolean prop.
// Styles for Navbar start with nb_.
// Styles for SideDrawer start with sd_.

const RightNavItems = ({ sideDrawer, isAuth, login, logout }) => {
  const rightNav = sideDrawer ? sd_RightNav : nb_RightNav
  const navItem = sideDrawer ? sd_NavItem : nb_NavItem
  const authButton = sideDrawer ? sd_AuthButton : nb_AuthButton
  return (
    <div css={rightNav}>
      {isAuth ? (
        <div
          css={css`
            ${navItem};
            ${userDropdown};
          `}
        >
          <NavDropdown content='Real Mohsin' logout={logout} sideDrawer={sideDrawer} />
        </div>
      ) : (
        <div css={navItem}>
          <Button css={authButton} onClick={login}>
            Sign In
          </Button>
          <Button css={authButton} onClick={login}>
            Register
          </Button>
        </div>
      )}
    </div>
  )
}

// styles when in NavBar

const nb_RightNav = css`
  display: flex;
  user-select: none;
  ${mq.bp1} {
    display: none;
  }
`

const nb_NavItem = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const userDropdown = css`
  position: relative;
  &::before {
    content: '';
    width: 1px;
    height: 100%;
    position: absolute;
    left: 0;
    background: rgba(255, 255, 255, 0.08);
  }
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`

const nb_AuthButton = css`
  border: 2px solid rgba(255, 255, 255, 0.5);
  font-size: 0.9em;
  &:hover {
    border-color: #f9fafb;
  }
`

// styles when in SideDrawer

const sd_RightNav = css`
  display: none;
  ${mq.bp1} {
    display: flex;
    flex-direction: column;
  }
`

const sd_NavItem = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 8rem;
`

const sd_AuthButton = css`
  text-align: center;
  margin: 1.4rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  font-size: 0.9em;
  &:hover {
    border-color: #f9fafb;
  }
`

export default RightNavItems
