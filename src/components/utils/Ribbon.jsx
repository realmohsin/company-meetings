import styled from '@emotion/styled'

// documentation

const colors = {
  red: {
    color: '#DB2828',
    shadow: '#b21e1e'
  },
  blue: {
    color: '#2185D0',
    shadow: '#1A69A4'
  },
  green: {
    color: '#21BA45',
    shadow: '#198F35'
  },
  teal: {
    color: '#00B5AD',
    shadow: '#00827C'
  },
  black: {
    color: '#1B1C1D',
    shadow: '#805031'
  },
  yellow: {
    color: '#FBBD08',
    shadow: '#CD9903'
  },
  orange: {
    color: '#F2711C',
    shadow: '#CF590C'
  },
  pink: {
    color: '#E03997',
    shadow: '#C71F7E'
  },
  purple: {
    color: '#A333C8',
    shadow: '#82299F'
  },
  brown: {
    color: '#A5673F',
    shadow: '#805031'
  }
}

const Ribbon = styled.div`
  font-size: ${props => props.fontSize};
  display: inline-block;
  position: absolute;
  min-width: 10em;
  padding: 0.4em 1em;
  border-radius: 0.3em 0em 0em 0.3em;
  background-color: ${props => colors[props.color].color};
  color: white;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.6);
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 0;
    border-style: solid;
    border-color: ${props => colors[props.color].shadow} transparent transparent
      transparent;
    border-width: 1.1em 1.1em 0em 0em;
  }
`

export default Ribbon
