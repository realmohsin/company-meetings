import { css } from '@emotion/core'
import * as mq from './breakpoints'

const containerCss = css`
  max-width: 112rem;
  margin: 0 auto;
  @media (max-width: 1340px) {
    margin: 0 6.5rem;
  }
  @media (max-width: 1150px) {
    margin: 0 5.5rem;
  }
  @media (max-width: 560px) {
    margin: 0 4.5rem;
  }
  @media (max-width: 410px) {
    margin: 0 4rem;
  }
  @media (max-width: 400px) {
    margin: 0 3.5rem;
  }
  @media (max-width: 385px) {
    margin: 0 3.5rem;
  }
  @media (max-width: 350px) {
    margin: 0 3rem;
  }
`

export default containerCss
