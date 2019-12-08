import React from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCaretUp,
  faPlus,
  faUser,
  faCogs,
  faPowerOff,
  faColumns
} from '@fortawesome/free-solid-svg-icons'
import defaultUserPhoto from '../../assets/defaultUserPhoto.png'
import * as mq from '../../emotion/breakpoints'
import { logout } from '../../store/actions/actions'
import { selectUser } from '../../store/selectors/authSelectors'
import { appColor2Hover } from '../../emotion/variables'

console.log('default user photo from nav dropdown: ', defaultUserPhoto)

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
    if (
      this.navDropdownRef.current &&
      !this.navDropdownRef.current.contains(e.target)
    ) {
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
      <div
        css={navDropdown}
        onClick={this.toggleDropdown}
        ref={this.navDropdownRef}
      >
        <img
          src={user.photoURL || defaultUserPhoto}
          alt='Nav Item Icon'
          css={imgCss}
        />
        <div css={textBox}>{user.username}</div>
        <FontAwesomeIcon
          icon={sideDrawer ? faCaretUp : faCaretDown}
          css={sideDrawer && sdCaret}
        />
        {isOpen && (
          <ul css={dropdownEle}>
            <Link
              to={`/people/${user.uid}`}
              onClick={() => sideDrawer && hideSideDrawer()}
              css={!sideDrawer && firstLinkStyles}
            >
              <div css={iconBox}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>My Profile</div>
            </Link>
            <Link to='/meetings' onClick={() => sideDrawer && hideSideDrawer()}>
              <div css={iconBox}>
                <FontAwesomeIcon icon={faColumns} />
              </div>
              <div>Dashboard</div>
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
            <a onClick={logout} css={sideDrawer && lastLinkStyles}>
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

const navDropdown = css`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
  cursor: pointer;
  ${mq.bp1} {
    font-size: 0.95em;
    padding: 0 1rem 0 2rem;
  }
`

const textBox = css`
  padding: 0 1.5rem;
  ${mq.bp1} {
    padding: 1.5rem;
    margin-right: auto;
  }
`

const imgCss = css`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
`

const iconBox = css`
  width: 20%;
  margin-left: 0.75rem;
  ${mq.bp1} {
    margin-right: 0;
  }
`

const dropdownEle = css`
  color: white;
  list-style: none;
  position: absolute;
  top: 7rem;
  right: 0.5rem;
  width: 19rem;
  background: ${appColor2Hover};
  box-shadow: 0px 3px 10px -3px rgba(34, 36, 38, 0.65);
  border-top: transparent;
  border-radius: 0.6rem;
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
  @media (max-width: 750px) {
    &::before {
      display: block;
    }
  }
  ${mq.bp1} {
    font-size: 0.7em;
    top: -19.5rem;
    right: -7rem;
    width: 18rem;
    border: 1px solid rgba(34, 36, 38, 0.15);
    border: transparent;
    box-shadow: none;
    & a {
      padding: 1.2rem 1.8rem;
    }
  }
`

const firstLinkStyles = css`
  border-top: transparent;
  &::after {
    content: '';
    background: ${appColor2Hover};
    position: absolute;
    top: -0.25em;
    left: 2em;
    width: 2rem;
    height: 2rem;
    transform: rotate(-45deg);
    z-index: 9;
  }
  &:hover::after {
    background: white;
  }
`

const lastLinkStyles = css`
  &::before {
    content: '';
    background: ${appColor2Hover};
    position: absolute;
    width: 2rem;
    height: 2rem;
    transform: rotate(-45deg);
    z-index: -10;
    top: 94%;
    left: 46.5%;
  }
  &:hover::before {
    background: white;
  }
`

const tooBigIcon = css`
  transform: scale(0.94) translateX(-4px);
`

const sdCaret = css``

export default connect(
  mapStateToProps,
  { logout }
)(NavDropdown)
