import styled from '@emotion/styled'

const Button = styled.a`
  display: inline-block;
  padding: 0.8rem 1.6rem;
  margin: 0 0.8rem;
  border-radius: 0.3rem;
  cursor: pointer;
  color: white;
  background: ${props => props.color};
  user-select: none;
`

export default Button
