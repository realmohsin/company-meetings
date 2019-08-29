import { css } from '@emotion/core'
import { appTeal } from './variables'

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

export const authButton = css`
  ${buttonCss};
  margin-top: 1.9rem;
  padding: 1rem 0;
  width: 100%;
  background: ${appTeal};
`

export const googleButton = css`
  ${buttonCss};
  padding: 1rem 0;
  width: 100%;
  background: #dd4b39;
`

export default buttonCss
