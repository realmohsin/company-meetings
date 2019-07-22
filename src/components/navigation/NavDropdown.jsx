import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCaretRight,
  faPlus,
  faCalendar,
  faUsers,
  faUser,
  faCogs,
  faPowerOff
} from '@fortawesome/free-solid-svg-icons'
import anonImg from '../../assets/anonUser.png'
import * as mq from '../../emotion/breakpoints'

// nav item for right/bottom side of navbar as dropdown that reveals authed routes

class NavDropdown extends React.Component {
  state = {
    isOpen: false
  }

  navDropdownRef = React.createRef()

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = e => {
    if (this.navDropdownRef.current && !this.navDropdownRef.current.contains(e.target)) {
      this.setState({
        isOpen: false
      })
    }
  }

  toggleDropdown = () => {
    this.setState(state => ({ isOpen: !state.isOpen }))
  }

  render () {
    const { content, image, logout, sideDrawer } = this.props
    const { isOpen } = this.state
    return (
      <div css={navDropdown} onClick={this.toggleDropdown} ref={this.navDropdownRef}>
        <img src={image || anonImg} alt='Nav Item Icon' css={imgCss} />
        <div css={textBox}>{content}</div>
        <FontAwesomeIcon
          icon={sideDrawer ? faCaretRight : faCaretDown}
          css={sideDrawer && sd_caret}
        />
        {isOpen && (
          <ul css={dropdownEle}>
            <Link to='/people/profile/userIdHere'>
              <div css={iconBox}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>My Profile</div>
            </Link>
            <Link to='/people'>
              <div css={iconBox}>
                <FontAwesomeIcon icon={faUsers} css={tooBigIcon} />
              </div>
              <div>My Network</div>
            </Link>
            <Link to='/meetings/create-meeting'>
              <div css={iconBox}>
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <div> Create Meeting</div>
            </Link>
            <Link to='/meetings/my-meetings'>
              <div css={iconBox}>
                <FontAwesomeIcon icon={faCalendar} />
              </div>
              <div> My Meetings</div>
            </Link>
            <Link to='/settings'>
              <div css={iconBox}>
                <FontAwesomeIcon icon={faCogs} css={tooBigIcon} />
              </div>
              <div>Settings</div>
            </Link>
            <a onClick={logout}>
              <div css={iconBox}>
                <FontAwesomeIcon icon={faPowerOff} />
              </div>
              <div>Sign Out</div>
            </a>
          </ul>
        )}
      </div>
    )
  }
}

const dropdownEle = css`
  font-size: 0.9em;
  color: black;
  list-style: none;
  position: absolute;
  top: 94%;
  left: 14%;
  right: -15%;
  background: white;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-top: transparent;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.25);
  border-radius: 0.3rem;
  &::before {
    content: '';
    background: white;
    position: absolute;
    top: -0.25em;
    left: 1em;
    width: 2rem;
    height: 2rem;
    transform: rotate(-45deg);
    z-index: -10;
  }
  & a {
    padding: 1rem 1.6rem;
    display: flex;
  }
  & a:hover {
    background: rgba(0, 0, 0, 0.08);
  }
  ${mq.bp1} {
    top: -333%;
    right: -62%;
    left: 105%;
    border-top: 1px solid rgba(34, 36, 38, 0.15);
    border-left: transparent;
    &::before {
      top: 71%;
      left: -3%;
    }
  }
`

const navDropdown = css`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
  cursor: pointer;
  ${mq.bp1} {
    padding: 1rem 2rem;
    justify-content: center;
  }
`

const textBox = css`
  padding: 0 1rem;
`

const imgCss = css`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  ${mq.bp1} {
    margin-left: auto;
  }
`

const iconBox = css`
  color: rgba(34, 36, 38, 0.65);
  width: 20%;
  margin-right: 0.7rem;
`

const tooBigIcon = css`
  transform: scale(0.94) translateX(-4px);
`

const sd_caret = css`
  margin-left: auto;
`

export default NavDropdown
