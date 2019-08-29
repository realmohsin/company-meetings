import { css } from '@emotion/core'
import { appBorderColor } from './variables'

const timepickerStyles = css`
  & .rc-time-picker-input {
    font-family: inherit;
    letter-spacing: 0.1rem;
    padding: 2.1rem 1.1rem;
    font-size: 1.8rem;
    border: 1px solid ${appBorderColor};
  }
`

export default timepickerStyles
