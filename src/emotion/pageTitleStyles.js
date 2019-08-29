import { css } from '@emotion/core'
import { appColor1Hover } from './variables'

const pageTitleStyles = css`
  color: ${appColor1Hover};
  text-decoration: underline;
  margin-bottom: 4rem;
  text-align: center;
  @media (max-width: 355px) {
    font-size: 29px;
  }
`

export default pageTitleStyles
