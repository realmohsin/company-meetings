import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { appColor1 } from '../../emotion/variables'

const loadAnimation = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  margin: 100px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(0, 187, 187, 0.2);
  border-right: 1.1em solid rgba(0, 187, 187, 0.2);
  border-bottom: 1.1em solid rgba(0, 187, 187, 0.2);
  border-left: 1.1em solid ${appColor1};
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${loadAnimation} 1.1s infinite linear;
  animation: ${loadAnimation} 1.1s infinite linear;
  border-radius: 50%;
  width: 10em;
  height: 10em;
  &::after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`

export default Loader
