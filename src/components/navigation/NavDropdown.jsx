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
  appBorderColor
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
            <Link to='/people' onClick={() => sideDrawer && hideSideDrawer()}>
              <div css={iconBox}>
                <FontAwesomeIcon icon={faUsers} css={tooBigIcon} />
              </div>
              <div>My Network</div>
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
            <Link
              to='/meetings/my-meetings'
              onClick={() => sideDrawer && hideSideDrawer()}
            >
              <div css={iconBox}>
                <FontAwesomeIcon icon={faCalendar} />
              </div>
              <div> My Meetings</div>
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
  color: black;
  list-style: none;
  position: absolute;
  top: 118%;
  left: -10%;
  right: 0%;
  background: white;
  border-top: transparent;
  box-shadow: 0px 3px 10px -3px rgba(34, 36, 38, 0.65);
  border-radius: 0.6rem;
  &::before {
    content: '';
    background: ${appColor2};
    position: absolute;
    top: -0.25em;
    left: 1em;
    width: 2rem;
    height: 2rem;
    transform: rotate(-45deg);
    z-index: -10;
    box-shadow: 0 0px 7px 0 rgba(34, 36, 38, 0.25);
  }
  & a {
    padding: 1rem 1.6rem;
    display: flex;
  }
  & a:hover {
    background: rgba(0, 0, 0, 0.08);
  }
  ${mq.bp1} {
    font-size: 0.7em;
    top: -273%;
    right: -40%;
    left: 78%;
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
  color: white;
  width: 20%;
  margin-left: 1rem;
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
