import React from 'react'
import { css } from '@emotion/core'
import logo from '../assets/globe-256.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { mainGradient } from '../emotion/variables'
import buttonCss from '../emotion/buttonCss'

const TitlePage = ({ history }) => {
  return (
    <div css={titlePage}>
      <div css={topDiv}>
        <img src={logo} alt='main logo' css={logoCss} />
        <h1 css={title}>Company Meetings</h1>
      </div>
      <button css={titleButton} onClick={() => history.push('/meetings')}>
        Get Started
        <FontAwesomeIcon icon={faLongArrowAltRight} css={iconCss} />
      </button>
    </div>
  )
}

const titlePage = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${mainGradient};
  height: 100vh;
  color: white;
  padding-bottom: 4rem;
`

const topDiv = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4rem;
`

const title = css`
  font-weight: normal;
  font-size: 8rem;
`

const logoCss = css`
  height: 13rem;
  width: 13rem;
  margin-right: 4rem;
`

const titleButton = css`
  ${buttonCss}
  font-size: 2.2rem;
  letter-spacing: 1px;
  padding: 1rem 3rem 1rem 4rem;
  border: 3px solid #fff;
  border-radius: 1rem;
  &:hover {
    color: rgb(33, 138, 174);
    background: white;
  }
  &:hover i {
    color: rgb(33, 138, 174);
  }
`

const iconCss = css`
  margin-left: 2rem;
`

export default TitlePage
