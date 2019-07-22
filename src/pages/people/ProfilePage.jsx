import React from 'react'
import { css } from '@emotion/core'
import { pagePadding } from '../../emotion/variables'

const ProfilePage = props => {
  return <div css={profilePage}>Profile Page</div>
}

// styles

const profilePage = css`
  ${pagePadding};
`

export default ProfilePage
