import React from 'react'
import { withRouter } from 'react-router-dom'

class PageLoadScrollTop extends React.Component {
  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return this.props.children
  }
}

export default withRouter(PageLoadScrollTop)
