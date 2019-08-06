import React from 'react'
import { css } from '@emotion/core'
import { NavLink, Switch, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import BasicSettingsPage from './BasicSettingsPage'
import AboutSettingsPage from './AboutSettingsPage'
import { pagePadding, appBorderColor } from '../../emotion/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCogs } from '@fortawesome/free-solid-svg-icons'
import { selectUser } from '../../store/selectors/authSelectors'
import { updateProfileBasics } from '../../store/actions/actions'

const mapStateToProps = state => ({
  user: selectUser(state)
})

const SettingsDashboard = ({ user, updateProfileBasics }) => {
  return (
    <div css={settingsCss}>
      <div>
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
            render={props => <AboutSettingsPage user={user} {...props} />}
          />
        </Switch>
      </div>
      <div>
        <div css={navSection}>
          <div css={headerBorder}>
            <div css={header}>
              <FontAwesomeIcon css={iconCss} icon={faUser} /> Profile
            </div>
          </div>
          <div css={navBodyBorder}>
            <NavLink css={navItem} to='/settings/basic'>
              Basics
            </NavLink>
            <NavLink css={navItem} to='/settings/about'>
              About Me
            </NavLink>
            <NavLink css={navItem} to='/settings/photos'>
              My Photos
            </NavLink>
          </div>
        </div>
        <div css={navSection}>
          <div css={header}>
            <FontAwesomeIcon css={iconCss} icon={faCogs} />
            Account
          </div>
          <NavLink css={navItem} to='/settings/password_change'>
            Change Password
          </NavLink>
        </div>
      </div>
    </div>
  )
}

const settingsCss = css`
  ${pagePadding};
  padding: 10rem 0;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 2rem;
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
`

const header = css`
  padding: 0 1rem;
  line-height: 4.4rem;
  height: 4.4rem;
  border-bottom: 1px solid ${appBorderColor};
  background-color: #535353;
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
`

const iconCss = css`
  margin-right: 1rem;
`

const headerBorder = css`
  border: 1px solid #535353;
`

const navBodyBorder = css`
  border: 1px solid ${appBorderColor};
`

export default connect(
  mapStateToProps,
  { updateProfileBasics }
)(SettingsDashboard)

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
