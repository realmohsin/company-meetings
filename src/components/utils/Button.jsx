import styled from '@emotion/styled'

const Button = styled.a`
  display: inline-block;
  cursor: pointer;
  padding: 0.6rem 2.4rem;
  margin: 0 1.6rem;
  color: white;
  background: ${props => props.color};
  border-radius: 0.3rem;
`

export default Button
