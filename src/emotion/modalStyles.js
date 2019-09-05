import { css } from '@emotion/core'
import { appBorderColor } from './variables'

export const modalStyles = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  width: 37rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
  @media (max-width: 460px) {
    width: 35rem;
  }
  @media (max-width: 410px) {
    width: 33.5rem;
  }
  @media (max-width: 365px) {
    width: 32.5rem;
  }
  @media (max-width: 345px) {
    width: 31rem;
  }
`

export const headerCss = css`
  font-weight: bold;
  text-align: center;
  font-size: 2.4rem;
  border-bottom: 1px solid ${appBorderColor};
  padding: 1.3rem 0;
`

export const authBodyBox = css`
  margin: 1.5rem;
  padding: 0 2.6rem 3rem;
  border: 1px solid ${appBorderColor};
  border-radius: 0.5rem;
`

export const googleIcon = css`
  margin-right: 1rem;
`
