import { css } from '@emotion/core'

const buttonCss = css`
  display: inline-block;
  padding: 0.5rem 1.7rem 0.6rem;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  color: white;
  user-select: none;
  font: inherit;
  background: #218aae;
  &:hover {
    background: #196f83;
  }
  &:disabled {
    cursor: not-allowed;
    background: red;
  }
`

export default buttonCss
