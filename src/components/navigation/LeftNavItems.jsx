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

const LeftNavItems = ({ sideDrawer, isAuth }) => {
  const leftNav = sideDrawer ? sd_LeftNav : nb_LeftNav
  const navItem = sideDrawer ? sd_NavItem : nb_NavItem
  const logoCss = sideDrawer ? sd_Logo : nb_Logo
  const meetingButton = sideDrawer ? sd_MeetingButton : nb_MeetingButton
  const meetingButtonBox = sideDrawer ? sd_MeetingButtonBox : nb_MeetingButtonBox

  return (
    <div css={leftNav}>
      <NavLink exact to='/' css={navItem}>
        <div css={logoCss}>
          <Logo />
        </div>
      </NavLink>
      <NavLink exact to='/meetings' css={navItem}>
        Meetings
      </NavLink>
      {isAuth && (
        <>
          <NavLink to='/people' css={navItem}>
            People
          </NavLink>
          <div
            css={css`
              ${navItem};
              ${meetingButtonBox};
            `}
          >
            <button
              css={meetingButton}
              onClick={() => history.push('/meetings/create-meeting')}
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

const nb_LeftNav = css`
  display: flex;
  ${mq.bp1} {
    display: none;
  }
`

let nb_NavItem = css`
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

const nb_Logo = css`
  width: 5.8rem;
  height: 5.8rem;
  padding: 0.7rem;
`

const nb_MeetingButtonBox = css`
  &:hover {
    background: none;
  }
  &::after {
    height: 0;
  }
`

const nb_MeetingButton = css`
  ${buttonCss};
  padding: 0.74rem 1.38rem 0.76rem;
  margin: 0.78rem 0rem;
  border: 2px solid #fff;
  font-weight: bold;
  background: #21ba45;
  &:hover {
    background: #16ab39;
  }
`

// styles in SideDrawer

let sd_LeftNav = css`
  display: none;
  ${mq.bp1} {
    display: flex;
    flex-direction: column;
  }
`

let sd_NavItem = css`
  padding: 1.4rem 0;
  display: flex;
  justify-content: center;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`

const sd_Logo = css`
  width: 9.8rem;
  height: 9.8rem;
`

const sd_MeetingButtonBox = css`
  ${nb_MeetingButtonBox};
`

const sd_MeetingButton = css`
  ${nb_MeetingButton};
  padding: 0.8rem 1.6rem;
  margin: 1.4rem 1rem;
  font-weight: normal;
`

export default LeftNavItems
