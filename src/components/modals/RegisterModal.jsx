import React from 'react'
import { css } from '@emotion/core'

const RegisterModal = props => {
  return <div css={registerModal}>Register Modal</div>
}

const registerModal = css`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 200;
`

export default RegisterModal
