import React from 'react'
import { css } from '@emotion/core'

const Backdrop = ({ show, handleClick }) =>
  show ? <div css={backdrop} onClick={handleClick} /> : null

const backdrop = css`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
`

export default Backdrop
