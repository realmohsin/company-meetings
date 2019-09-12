import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { Global, css } from '@emotion/core'
import NavBar from './components/navigation/NavBar'
import SideDrawer from './components/navigation/SideDrawer'
import MeetingDashboard from './pages/meetings/MeetingDashboard'
import TitlePage from './pages/TitlePage'
import EditMeeting from './pages/meetings/EditMeeting'
import CreateMeeting from './pages/meetings/CreateMeeting'
import MeetingPage from './pages/meetings/MeetingPage'
import ProfilePage from './pages/people/ProfilePage'
import SettingsDashboard from './pages/settings/SettingsDashboard'
import ModalManager from './components/modals/ModalManager'
import containerCss from './emotion/containerCss'
import { firebaseAuth, firestore } from './firebase/firebase'
import { setUser, openModal } from './store/actions/actions'
import { selectIsAuth } from './store/selectors/authSelectors'
import withAuthGuard from './hocs/withAuthGuard'

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuth(state)
})

class App extends React.Component {
  componentDidMount () {
    window.unsubFromAuthIndexPage()
    const { setUser } = this.props
    this.unsubAuth = firebaseAuth.onAuthStateChanged(async userInAuth => {
      if (!userInAuth) {
        this.unsubUserSnapshot && this.unsubUserSnapshot()
        return setUser(null)
      }
      const userRef = firestore.doc(`users/${userInAuth.uid}`)
      this.unsubUserSnapshot = userRef.onSnapshot(userSnapshot => {
        if (!userSnapshot.exists) {
          setUser(null)
        } else {
          setUser({
            uid: userSnapshot.id,
            ...userSnapshot.data()
          })
        }
      })
    })
  }

  componentWillUnmount () {
    this.unsubAuth()
    this.unsubUserSnapshot()
  }

  render () {
    const { isAuthenticated, openModal } = this.props
    return (
      <>
        <Global styles={globalStyles} />
        <Switch>
          <Route exact path='/' component={TitlePage} />
          <Route
            render={() => (
              <>
                <NavBar />
                <ModalManager />
                <SideDrawer />
                <div css={containerCss}>
                  <Switch>
                    <Route exact path='/meetings' component={MeetingDashboard} />
                    <Route
                      path='/meetings/edit/:meetingId'
                      render={props =>
                        withAuthGuard(isAuthenticated, openModal, EditMeeting, props)
                      }
                    />
                    <Route
                      path='/meetings/create-meeting'
                      render={props =>
                        withAuthGuard(isAuthenticated, openModal, CreateMeeting, props)
                      }
                    />
                    <Route
                      path='/meetings/:meetingId'
                      render={props =>
                        withAuthGuard(isAuthenticated, openModal, MeetingPage, props)
                      }
                    />
                    <Route path='/people/:userId' component={ProfilePage} />
                    <Route
                      path='/settings'
                      render={props =>
                        withAuthGuard(
                          isAuthenticated,
                          openModal,
                          SettingsDashboard,
                          props
                        )
                      }
                    />
                    <Route render={() => <h1 style={{ marginTop: 58 }}>404</h1>} />
                  </Switch>
                </div>
              </>
            )}
          />
        </Switch>
      </>
    )
  }
}

const globalStyles = css`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 67.5%;
    @media (max-width: 1124px) {
      font-size: 65.25%;
    }
    @media (max-width: 1090px) {
      font-size: 63.25%;
    }
    @media (max-width: 1060px) {
      font-size: 62.25%;
    }
    @media (max-width: 985px) {
      font-size: 60.25%;
    }
  }

  body {
    font-size: 2rem;
    font-family: 'Roboto Condensed', sans-serif;
    background: #eaeaea;
  }

  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .rc-time-picker-panel {
    font-family: inherit;
    transform: scale(1.4);
  }
  @media (max-width: 500px) {
    .rc-time-picker-panel {
      transform: scale(1.3);
    }
  }
`

export default connect(
  mapStateToProps,
  { setUser, openModal }
)(process.env.NODE_ENV === 'development' ? hot(App) : App)
