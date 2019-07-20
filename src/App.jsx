import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Global, css } from '@emotion/core'
import * as bps from './emotion/breakpoints'
import NavBar from './components/navigation/NavBar'
import Container from './components/Container'

class App extends React.Component {
  render () {
    return (
      <>
        <Global styles={globalStyles} />
        <Switch>
          <Route exact path='/' render={() => <p>Home Page</p>} />
          <Route
            render={() => (
              <>
                <NavBar />
                <Container>
                  <Switch>
                    <Route exact path='/meetings' render={() => <p>Meetings Page</p>} />
                    <Route render={() => <p>404</p>} />
                  </Switch>
                </Container>
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
    ${bps.bp3} {
      font-size: 56.25%;
    }
    ${bps.bp2} {
      font-size: 50%;
    }
  }

  body {
    font-size: 2rem;
    font-family: 'Open Sans Condensed', sans-serif;
    background: #eaeaea;
    height: 2000rem;
    padding-top: 5.6rem;
  }

  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
`

export default App
