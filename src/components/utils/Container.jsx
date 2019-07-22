import styled from '@emotion/styled'
import * as mq from '../../emotion/breakpoints'

const Container = styled.div`
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

export default Container
