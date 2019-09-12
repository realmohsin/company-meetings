import React from 'react'
import { css } from '@emotion/core'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo'
import * as mq from '../../emotion/breakpoints'
import history from '../../history/history'
import buttonCss from '../../emotion/buttonCss'

// This component is used in NavBar and SideDrawer.
// Styles change based on sidedrawer boolean prop.
// Styles for Navbar start with nb_.
// Styles for SideDrawer start with sd_.

const LeftNavItems = ({ sideDrawer, isAuth, user, hideSideDrawer }) => {
  const leftNav = sideDrawer ? sdLeftNav : nbLeftNav
  const navItem = sideDrawer ? sdNavItem : nbNavItem
  const logoCss = sideDrawer ? sdLogo : nbLogo
  const meetingButton = sideDrawer ? sdMeetingButton : nbMeetingButton
  const meetingButtonBox = sideDrawer ? sdMeetingButtonBox : nbMeetingButtonBox
  return (
    <div css={leftNav}>
      <NavLink exact to='/' css={navItem}>
        <div css={logoCss}>
          <Logo />
        </div>
      </NavLink>
      <NavLink
        exact
        to='/meetings'
        css={navItem}
        onClick={() => sideDrawer && hideSideDrawer()}
      >
        Meetings
      </NavLink>
      {isAuth && user && (
        <>
          <NavLink
            to={`/people/${user && user.uid}`}
            css={navItem}
            onClick={() => sideDrawer && hideSideDrawer()}
          >
            Profile
          </NavLink>
          <div
            css={css`
              ${navItem};
              ${meetingButtonBox};
            `}
          >
            <button
              css={meetingButton}
              onClick={() => {
                history.push('/meetings/create-meeting')
                if (sideDrawer) hideSideDrawer()
              }}
            >
              Create Meeting
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// styles in NavBar

const nbLeftNav = css`
  display: flex;
  ${mq.bp1} {
    display: none;
  }
`

let nbNavItem = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2.8rem;
  position: relative;
  &::after {
    content: '';
    height: 100%;
    width: 1px;
    position: absolute;
    right: 0;
    background: rgba(255, 255, 255, 0.08);
  }
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`

const nbLogo = css`
  width: 5.8rem;
  height: 5.8rem;
  padding: 0.7rem;
`

const nbMeetingButtonBox = css`
  &:hover {
    background: none;
  }
  &::after {
    height: 0;
  }
`

const nbMeetingButton = css`
  ${buttonCss};
  padding: 0.74rem 1.38rem 0.76rem;
  margin: 0.78rem 0rem;
  border: 2px solid #fff;
  font-weight: bold;
  background: #21ba45;
  white-space: nowrap;
  &:hover {
    background: #16ab39;
  }
`

// styles in SideDrawer

let sdLeftNav = css`
  display: none;
  ${mq.bp1} {
    display: flex;
    flex-direction: column;
  }
`

let sdNavItem = css`
  padding: 1.2rem 0;
  display: flex;
  justify-content: center;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`

const sdLogo = css`
  width: 9.8rem;
  height: 9.8rem;
`

const sdMeetingButtonBox = css`
  ${nbMeetingButtonBox};
`

const sdMeetingButton = css`
  ${nbMeetingButton};
  padding: 0.8rem 1.6rem;
  margin: 1.3rem 1rem;
  font-weight: normal;
`

export default LeftNavItems
