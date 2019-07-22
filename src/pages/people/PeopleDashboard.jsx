import React from 'react'
import { css } from '@emotion/core'
import { pagePadding } from '../../emotion/variables'

const PeopleDashboard = props => {
  return <div css={peopleDashboard}>People Dashboard</div>
}

// styles

const peopleDashboard = css`
  ${pagePadding};
`

export default PeopleDashboard
