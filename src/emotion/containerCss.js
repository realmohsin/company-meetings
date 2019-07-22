import { css } from '@emotion/core'
import * as mq from './breakpoints'

const containerCss = css`
  max-width: 112rem;
  margin: 0 auto;
  ${mq.bp3} {
    margin: 0 3rem;
  }
  ${mq.bp1} {
    margin: 0 2rem;
  }
  ${mq.bp0} {
    margin: 0 1.6rem;
  }
`

export default containerCss
