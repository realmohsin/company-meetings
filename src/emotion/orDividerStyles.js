import { css } from '@emotion/core'
import { appBorderColor } from './variables'

const orDividerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 11rem;
    height: 1px;
    top: 49%;
    left: 0.1rem;
    background: ${appBorderColor};
  }
  &::after {
    content: '';
    position: absolute;
    width: 11rem;
    height: 1px;
    top: 49%;
    right: 0.1rem;
    background: ${appBorderColor};
  }
`

export default orDividerStyles
