import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { css } from '@emotion/core'
import Container from '../Container'
import Logo from '../Logo'
import Button from '../utils/Button'
import { mainGradient } from '../../emotion/colors'
import { selectUser } from '../../store/selectors/authSelectors'
import { login, logout } from '../../store/actions/actions'

const mapStateToProps = createStructuredSelector({
  user: selectUser
})

const NavBar = ({ user, login, logout }) => {
  return (
    <nav css={navBarCss}>
      <Container css={containerCss}>
        <ul>
          <li>
            <NavLink exact to='/' css={navLinkCss}>
              <div css={logoContainerCss}>
                <Logo />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to='/meetings' css={navLinkCss}>
              Meetings
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to='/people' css={navLinkCss}>
                  People
                </NavLink>
              </li>
              <li>
                <Button css={createMeetingButtonCss}>Create Meeting</Button>
              </li>
            </>
          )}
        </ul>
        <ul>
          <li>
            {user ? (
              <Button css={authButtonCss} onClick={logout}>
                Log Out
              </Button>
            ) : (
              <>
                <Button css={authButtonCss} onClick={login}>
                  Sign In
                </Button>
                <Button css={authButtonCss} onClick={login}>
                  Register
                </Button>
              </>
            )}
          </li>
        </ul>
      </Container>
    </nav>
  )
}

const navBarCss = css`
  width: 100%;
  height: 5.8rem;
  position: fixed;
  top: 0;
  left: 0;
  background: ${mainGradient};
  color: white;
  & ul {
    list-style: none;
    display: flex;
  }
  & li {
    position: relative;
  }
  & li::before {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 1px;
    background: rgba(255, 255, 255, 0.08);
  }
  & ul:first-child li::before {
    right: 0;
  }
  & ul:last-child li::before {
    left: 0;
  }
  & .active {
    background: rgba(255, 255, 255, 0.08);
  }
`

const containerCss = css`
  height: 100%;
  display: flex;
  justify-content: space-between;
`

const logoContainerCss = css`
  width: 5.8rem;
  height: 5.8rem;
  padding: 0.7rem;
`

const navLinkCss = css`
  line-height: 5.8rem;
  padding: 0 2.8rem;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`

const authButtonCss = css`
  border: 2px solid rgba(255, 255, 255, 0.5);
  font-size: 0.9em;
  margin: 0.8rem;
  &:hover {
    border-color: #f9fafb;
  }
`

const createMeetingButtonCss = css`
  margin: 0.78rem 2.8rem;
  padding: 0.7rem 1.4rem;
  background: #21ba45;
  box-shadow: 0 0 0 2px #fff inset;
  font-weight: bold;
  &:hover {
    background: #16ab39;
  }
`

export default connect(
  mapStateToProps,
  { login, logout }
)(NavBar)
