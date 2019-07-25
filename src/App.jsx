import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { Global, css } from '@emotion/core'
import * as mq from './emotion/breakpoints'
import NavBar from './components/navigation/NavBar'
import SideDrawer from './components/navigation/SideDrawer'
import MeetingsDashboard from './pages/meetings/MeetingsDashboard'
import TitlePage from './pages/TitlePage'
import EditMeeting from './pages/meetings/EditMeeting'
import CreateMeeting from './pages/meetings/CreateMeeting'
import MeetingPage from './pages/meetings/MeetingPage'
import MyMeetings from './pages/meetings/MyMeetingsPage'
import PeopleDashboard from './pages/people/PeopleDashboard'
import ProfilePage from './pages/people/ProfilePage'
import ModalManager from './components/modals/ModalManager'
import containerCss from './emotion/containerCss'

class App extends React.Component {
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
                    <Route exact path='/meetings' component={MeetingsDashboard} />
                    <Route
                      path='/meetings/edit-meeting/:meetingId'
                      component={EditMeeting}
                    />
                    <Route path='/meetings/create-meeting' component={CreateMeeting} />
                    <Route path='/meetings/my-meetings' component={MyMeetings} />
                    <Route path='/meetings/:meetingId' component={MeetingPage} />
                    <Route path='/people/:userId' component={ProfilePage} />
                    <Route path='/people' component={PeopleDashboard} />
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
    font-size: 62.5%;
    ${mq.bp3} {
      font-size: 56.25%;
    }
  }

  body {
    font-size: 2rem;
    font-family: 'Open Sans Condensed', sans-serif;
    background: #eaeaea;
  }

  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
`

export default (process.env.NODE_ENV === 'development' ? hot(App) : App)
