import React from 'react'
import { css } from '@emotion/core'
import logo from '../assets/globe-256.png'

const Logo = () => {
  return <img src={logo} alt='logo' css={logoCss} />
}

const logoCss = css`
  height: 100%;
  width: 100%;
`

export default Logo
