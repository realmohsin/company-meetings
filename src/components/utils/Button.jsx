import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { appColor2Hover, appColor2 } from '../../emotion/variables'

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
  },
  appColor2: {
    color: appColor2,
    shadow: appColor2Hover
  },
  gray: {
    color: '#E0E1E2',
    shadow: '#CACBCD'
  }
}

const ButtonStyled = styled.button`
  position: relative;
  display: inline-block;
  font: inherit;
  color: white;
  padding: 0.5em 1em;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: ${props =>
    props.color ? colors[props.color].color : colors.teal.color};
  &:hover {
    background-color: ${props =>
    props.color ? colors[props.color].shadow : colors.teal.shadow};
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #cccccc;
    color: #666666;
  }
`

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1em;
  height: 1em;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${spin} 1s ease-in-out infinite;
`

const Button = ({ content, loading, ...props }) => {
  return (
    <ButtonStyled {...props}>
      {content}
      {loading && <Loader />}
    </ButtonStyled>
  )
}

export default Button
