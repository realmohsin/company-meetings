import React from 'react'
import { css } from '@emotion/core'

const Toggler = ({ styles, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      css={css`
        ${toggler};
        ${styles};
      `}
    >
      <div />
      <div />
      <div />
    </div>
  )
}

const toggler = css`
  width: 4rem;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 1.4rem 0;
  cursor: pointer;
  & div {
    width: 90%;
    height: 3px;
    background: white;
  }
`

export default Toggler
