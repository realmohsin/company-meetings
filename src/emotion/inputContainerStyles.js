import { css } from '@emotion/core'
import { appColor2Hover } from './variables'

const inputContainerStyles = css`
  position: relative;
  margin-top: 2.8rem;
  display: flex;
  & > label {
    color: ${appColor2Hover};
    display: flex;
    align-items: center;
    width: 15rem;
  }
  & > div {
    flex: 1;
  }
  & span {
    width: 100%;
  }
  @media (max-width: 700px) {
    display: block;
    & > label {
      padding: 0.5rem 1rem 0.25rem;
    }
  }
`

export default inputContainerStyles
