import React from 'react'
import { css } from '@emotion/core'
import NavDropdown from './NavDropdown'
import * as mq from '../../emotion/breakpoints'
import buttonCss from '../../emotion/buttonCss'

// This component is used in NavBar and SideDrawer.
// Styles change based on sidedrawer boolean prop.
// Styles for Navbar start with nb_.
// Styles for SideDrawer start with sd_.

const RightNavItems = ({ sideDrawer, isAuth, openModal, hideSideDrawer }) => {
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
          <NavDropdown sideDrawer={sideDrawer} hideSideDrawer={hideSideDrawer} />
        </div>
      ) : (
        <div css={navItem}>
          <button css={authButton} onClick={() => openModal('LoginModal')}>
            Sign In
          </button>
          <button css={authButton} onClick={() => openModal('RegisterModal')}>
            Register
          </button>
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
  ${buttonCss};
  background: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
  font-size: 0.9em;
  margin-left: 1.5rem;
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
  ${buttonCss};
  background: none;
  text-align: center;
  margin: 1.4rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  font-size: 0.9em;
  &:hover {
    border-color: #f9fafb;
  }
`

export default RightNavItems
