import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
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
import defaultUserPhoto from '../../assets/defaultUserPhoto.png'
import * as mq from '../../emotion/breakpoints'
import { logout } from '../../store/actions/actions'
import { selectUser } from '../../store/selectors/authSelectors'
import {
  appIconColor,
  appAqua,
  appColor2,
  appColor1,
  appBorderColor,
  darkTextColor,
  appColor2Hover
} from '../../emotion/variables'

// nav item for right/bottom side of navbar as dropdown that reveals authed routes

const mapStateToProps = state => ({
  user: selectUser(state)
})

class NavDropdown extends React.Component {
  state = {
    isOpen: false
  }

  navDropdownRef = React.createRef()

  // componentDidMount () {
  //   document.addEventListener('mousedown', this.handleClickOutside)
  // }

  // componentWillUnmount () {
  //   document.removeEventListener('mousedown', this.handleClickOutside)
  // }

  handleClickOutside = e => {
    if (this.navDropdownRef.current && !this.navDropdownRef.current.contains(e.target)) {
      this.setState({
        isOpen: false
      })
    }
  }

  toggleDropdown = () => {
    this.setState(
      state => ({ isOpen: !state.isOpen }),
      () => {
        if (this.state.isOpen) {
          document.addEventListener('mousedown', this.handleClickOutside)
        } else if (!this.state.isOpen) {
          document.removeEventListener('mousedown', this.handleClickOutside)
        }
      }
    )
  }

  render () {
    const { user, logout, sideDrawer, hideSideDrawer } = this.props
    const { isOpen } = this.state
    return (
      <div css={navDropdown} onClick={this.toggleDropdown} ref={this.navDropdownRef}>
        <img src={user.photoURL || defaultUserPhoto} alt='Nav Item Icon' css={imgCss} />
        <div css={textBox}>{user.username}</div>
        <FontAwesomeIcon
          icon={sideDrawer ? faCaretRight : faCaretDown}
          css={sideDrawer && sd_caret}
        />
        {isOpen && (
          <ul css={dropdownEle}>
            <Link
              to='/people/profile/userIdHere'
              onClick={() => sideDrawer && hideSideDrawer()}
            >
              <div css={iconBox}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>My Profile</div>
            </Link>
            <Link
              to='/meetings/create-meeting'
              onClick={() => sideDrawer && hideSideDrawer()}
            >
              <div css={iconBox}>
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <div> Create Meeting</div>
            </Link>
            <Link to='/settings' onClick={() => sideDrawer && hideSideDrawer()}>
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
  color: white;
  list-style: none;
  position: absolute;
  top: 7rem;
  right: 0.5rem;
  width: 19rem;
  background: ${appColor2Hover};
  border-top: transparent;
  box-shadow: 0px 3px 10px -3px rgba(34, 36, 38, 0.65);
  border-radius: 0.6rem;
  &::before {
    content: '';
    background: ${appColor2Hover};
    position: absolute;
    top: -0.25em;
    left: 2em;
    width: 2rem;
    height: 2rem;
    transform: rotate(-45deg);
    z-index: -10;
    box-shadow: 0 0px 7px 0 rgba(34, 36, 38, 0.25);
  }
  & a {
    padding: 1.4rem 1.8rem;
    display: flex;
  }
  & a:first-of-type {
    border-radius: 0.6rem 0.6rem 0 0;
  }
  & a:last-of-type {
    padding-bottom: 1.8rem;
    border-radius: 0 0 0.6rem 0.6rem;
  }
  & a:hover {
    background-color: white;
    color: ${appColor2Hover};
  }
  ${mq.bp1} {
    font-size: 0.7em;
    top: -14rem;
    right: 0rem;
    width: 18rem;
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-left: transparent;
    box-shadow: none;
    &::before {
      top: 71%;
      left: -3%;
      box-shadow: none;
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
  width: 20%;
  margin-left: 0.75rem;
  ${mq.bp1} {
    margin-right: 0;
  }
`

const tooBigIcon = css`
  transform: scale(0.94) translateX(-4px);
`

const sd_caret = css`
  margin-right: 6rem;
`

export default connect(
  mapStateToProps,
  { logout }
)(NavDropdown)
