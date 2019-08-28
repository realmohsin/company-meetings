import { css } from '@emotion/core'
import { appBorderColor } from './variables'

export const inputBoxCss = css`
  position: relative;
  margin-top: 2.8rem;
`

export const labelCss = css`
  color: gray;
  font-size: 2rem;
  position: absolute;
  pointer-events: none;
  letter-spacing: 0.5px;
  left: 1.4rem;
  top: 0.88rem;
  transition: all 300ms ease;
`

export const shrunkLabelCss = css`
  top: -2.2rem;
  left: 1rem;
  font-size: 1.5rem;
  color: black;
`

export const errCss = css`
  position: absolute;
  color: red;
  top: -2.2rem;
  right: 1rem;
  font-size: 1.6rem;
`

export const inputCss = css`
  &[type='password'] {
    letter-spacing: 0.3rem;
  }
  display: block;
  width: 100%;
  background: white;
  color: gray;
  font-size: 1.8rem;
  padding: 1rem;
  border: 1px solid ${appBorderColor};
  border-radius: 0.5rem;
  &:focus ~ label {
    ${shrunkLabelCss}
  }
  @media (max-width: 355px) {
    font-size: 1.6rem;
  }
`
