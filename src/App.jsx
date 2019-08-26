import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { Global, css } from '@emotion/core'
import * as mq from './emotion/breakpoints'
import NavBar from './components/navigation/NavBar'
import SideDrawer from './components/navigation/SideDrawer'
import MeetingDashboard from './pages/meetings/MeetingDashboard'
import TitlePage from './pages/TitlePage'
import EditMeeting from './pages/meetings/EditMeeting'
import CreateMeeting from './pages/meetings/CreateMeeting'
import MeetingPage from './pages/meetings/MeetingPage'
import MyMeetingsPage from './pages/meetings/MyMeetingsPage'
import PeopleDashboard from './pages/people/PeopleDashboard'
import ProfilePage from './pages/people/ProfilePage'
import SettingsDashboard from './pages/settings/SettingsDashboard'
import ModalManager from './components/modals/ModalManager'
import containerCss from './emotion/containerCss'
import { firebaseAuth, firestore } from './firebase/firebase'
import { setUser } from './store/actions/actions'

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
                    <Route path='/meetings/edit/:meetingId' component={EditMeeting} />
                    <Route path='/meetings/create-meeting' component={CreateMeeting} />
                    <Route path='/meetings/my-meetings' component={MyMeetingsPage} />
                    <Route path='/meetings/:meetingId' component={MeetingPage} />
                    <Route path='/people/:userId' component={ProfilePage} />
                    <Route path='/people' component={PeopleDashboard} />
                    <Route path='/settings' component={SettingsDashboard} />
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
`

export default connect(
  null,
  { setUser }
)(process.env.NODE_ENV === 'development' ? hot(App) : App)
