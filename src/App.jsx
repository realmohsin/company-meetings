import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Global, css } from '@emotion/core'

class App extends React.Component {
  render () {
    return (
      <>
        <Global styles={globalStyles} />
        <h1>rm-create-spa-2</h1>
        <Switch>
          <Route exact path='/' render={() => <h2>Home Page</h2>} />
          <Route path='*' render={() => <h2>Page Not Found</h2>} />
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
    font-family: sans-serif;
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }
`

export default App
