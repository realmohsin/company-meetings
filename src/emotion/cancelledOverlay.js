import { css } from '@emotion/core'

const cancelledOverlay = css`
  &::before {
    content: 'CANCELLED';
    color: red;
    font-size: 3.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: -1px;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 0.4rem;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
`

export default cancelledOverlay
