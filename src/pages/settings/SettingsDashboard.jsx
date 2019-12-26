import React from 'react'
import { css } from '@emotion/core'
import { NavLink, Switch, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import BasicSettingsPage from './BasicSettingsPage'
import AboutSettingsPage from './AboutSettingsPage'
import ChangePasswordPage from './ChangePasswordPage'
import { pagePadding, appBorderColor } from '../../emotion/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCogs } from '@fortawesome/free-solid-svg-icons'
import { selectUser } from '../../store/selectors/authSelectors'
import {
  updateProfileBasics,
  updateProfileAbout,
  changePassword,
  setUserPhotos
} from '../../store/actions/actions'
import PhotoSettingsPage from './PhotoSettingsPage'
import { firestore } from '../../firebase/firebase'

const mapStateToProps = state => ({
  user: selectUser(state)
})

class SettingsDashboard extends React.Component {
  componentDidMount () {
    this.unsubProfilePhotosObserver = firestore
      .collection('users')
      .doc(`${this.props.user.uid}`)
      .collection('photos')
      .onSnapshot(querySnapshot => {
        if (querySnapshot.size === 0) {
          this.props.setUserPhotos([])
        }
        const photos = []
        querySnapshot.forEach(docSnapshot => {
          console.log('from onSnapshot of photos ', docSnapshot)
          photos.push({
            ...docSnapshot.data(),
            id: docSnapshot.id
          })
        })
        this.props.setUserPhotos(photos)
      })
  }

  componentWillUnmount () {
    this.props.setUserPhotos([])
    this.unsubProfilePhotosObserver()
  }

  render () {
    const {
      user,
      updateProfileBasics,
      updateProfileAbout,
      changePassword
    } = this.props
    return (
      <div css={settingsCss}>
        <div css={contentGridSection}>
          <Switch>
            <Redirect exact from='/settings' to='/settings/basic' />
            <Route
              path='/settings/basic'
              render={props => (
                <BasicSettingsPage
                  user={user}
                  updateProfileBasics={updateProfileBasics}
                  {...props}
                />
              )}
            />
            <Route
              path='/settings/about'
              render={props => (
                <AboutSettingsPage
                  user={user}
                  updateProfileAbout={updateProfileAbout}
                  {...props}
                />
              )}
            />
            <Route
              path='/settings/change_password'
              render={props => (
                <ChangePasswordPage
                  user={user}
                  changePassword={changePassword}
                  {...props}
                />
              )}
            />
            <Route
              path='/settings/photos'
              render={props => (
                <PhotoSettingsPage
                  user={user}
                  updateProfileAbout={updateProfileAbout}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>

        <div css={navGridSection}>
          <div css={navSection}>
            <div css={headerBorder}>
              <div css={header}>
                <FontAwesomeIcon css={iconCss} icon={faUser} /> Profile
              </div>
            </div>
            <div css={navBody}>
              <NavLink css={navItem} to='/settings/basic'>
                About Me
              </NavLink>
              {/* <NavLink css={navItem} to='/settings/about'>
                About Me
              </NavLink> */}
              <NavLink css={navItem} to='/settings/photos'>
                My Photos
              </NavLink>
            </div>
          </div>

          <div css={navSection}>
            <div css={headerBorder}>
              <div css={header}>
                <FontAwesomeIcon css={iconCss} icon={faCogs} />
                Account
              </div>
            </div>

            <div css={navBody}>
              <NavLink css={navItem} to='/settings/change_password'>
                Change Password
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// styles

const settingsCss = css`
  ${pagePadding};
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 2rem;
  @media (max-width: 1050px) {
    padding-top: 5rem;
  }
`

const contentGridSection = css`
  @media (max-width: 1050px) {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }
`

const navGridSection = css`
  justify-self: center;
  @media (max-width: 1050px) {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    display: flex;
    justify-content: space-between;
    justify-self: stretch;
  }
  @media (max-width: 665px) {
    display: block;
    justify-self: center;
  }
`

const navSection = css`
  color: #dcddde;
  font-size: 2rem;
  width: 20rem;
  list-style: none;
  margin-bottom: 3rem;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  & .active {
    background: rgba(0, 0, 0, 0.03);
  }
  @media (max-width: 1050px) {
    width: 28rem;
  }
`

const header = css`
  padding: 0 1rem;
  line-height: 4.4rem;
  height: 4.4rem;
  border-bottom: 1px solid ${appBorderColor};
  background-color: #535353;
`

const navBody = css`
  border: 1px solid ${appBorderColor};
  @media (max-width: 1050px) {
    display: flex;
  }
`

const navItem = css`
  padding: 0 1rem;
  line-height: 4.4rem;
  height: 4.4rem;
  border-bottom: 1px solid ${appBorderColor};
  background: white;
  font-size: 1.7rem;
  color: black;
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.03);
  }
  @media (max-width: 1050px) {
    flex: 1;
    text-align: center;
    &:not(:last-of-type) {
      border-right: 1px solid ${appBorderColor};
    }
  }
`

const iconCss = css`
  margin-right: 1rem;
`

const headerBorder = css`
  border: 1px solid #535353;
`

export default connect(mapStateToProps, {
  updateProfileBasics,
  updateProfileAbout,
  changePassword,
  setUserPhotos
})(SettingsDashboard)

/*

<Switch>
        <Redirect exact from='/settings' to='/settings/basic' />
        <Route
          path='/settings/basic'
          render={props => (
            <BasicSettingsPage
              initialValues={user}
              {...props}
              updateProfile={updateProfile}
            />
          )}
        />
        <Route
          path='/settings/about'
          render={() => (
            <SettingsAboutPage initialValues={user} updateProfile={updateProfile} />
          )}
        />
        <Route path='/settings/photos' component={SettingsPhotosPage} />
        <Route
          path='/settings/account'
          render={() => (
            <SettingsAccountPage
              updatePassword={updatePassword}
              providerId={providerId}
            />
          )}
        />
      </Switch>

*/
