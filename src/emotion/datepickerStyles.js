import { css } from '@emotion/core'
import { appBorderColor } from './variables'

const datepickerStyles = css`
  & input {
    width: 100%;
    background: white;
    color: gray;
    font-size: 1.8rem;
    padding: 1.05rem;
    border: 1px solid ${appBorderColor};
    border-radius: 0.5rem;
    font-family: inherit;
  }
  & .react-datepicker-wrapper {
    width: 100%;
  }

  & .react-datepicker__input-container {
    width: 100%;
  }
  & .react-datepicker-popper {
    transform: translate(14rem, 13rem) scale(2) !important;
    will-change: auto !important;
  }

  & .react-datepicker {
    font-family: inherit !important;
  }
  @media (max-width: 475px) {
    & .react-datepicker-popper {
      transform: translate(9rem, 11rem) scale(1.8) !important;
    }
  }
  @media (max-width: 375px) {
    & .react-datepicker-popper {
      transform: translate(7rem, 11rem) scale(1.8) !important;
    }
  }
  @media (max-width: 335px) {
    & .react-datepicker-popper {
      transform: translate(6rem, 11rem) scale(1.8) !important;
    }
  }
`

export default datepickerStyles
