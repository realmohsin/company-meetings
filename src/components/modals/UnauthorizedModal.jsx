import React from 'react'
import { css } from '@emotion/core'
import { modalStyles, headerCss } from '../../emotion/modalStyles'
import { appBorderColor } from '../../emotion/variables'
import Button from '../../components/utils/Button'
import history from '../../history/history'

const UnauthorizedModal = ({ openModal, closeModal }) => {
  const handleLoginClick = () => {
    openModal('LoginModal')
  }

  const handleRegisterClick = () => {
    openModal('RegisterModal')
  }

  const handleCancelClick = () => {
    closeModal()
    history.push('/meetings')
  }

  return (
    <div css={modalStyles}>
      <div css={headerCss}>You need to login to do that!</div>
      <div>
        <div css={sectionOne}>
          <p>Please either login or register to see this page</p>
          <div css={buttonContainer}>
            <Button
              color='teal'
              content='Login'
              css={leftButtonStyles}
              onClick={handleLoginClick}
            />
            <div css={orDivider} />
            <Button
              color='appColor2'
              content='Register'
              css={rightButtonStyles}
              onClick={handleRegisterClick}
            />
          </div>
        </div>
        <div css={sectionTwo}>
          <p>Or click cancel to continue as a guest</p>
          <div css={secondButtonContainer}>
            <Button
              color='gray'
              content='Cancel'
              css={css`
                color: #888;
                font-size: 1.6rem;
              `}
              onClick={handleCancelClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// styles

const sectionOne = css`
  padding: 2rem;
  font-size: 1.8rem;
  & p {
    text-align: center;
    margin-bottom: 2rem;
  }
  border-bottom: 1px solid ${appBorderColor};
`

const buttonContainer = css`
  display: flex;
  margin: 1rem 2rem;
`

const orDivider = css`
  flex: 0 1 2%;
  position: relative;
  &::before {
    content: 'OR';
    position: absolute;
    top: 50%;
    border-radius: 50%;
    width: 2.6rem;
    height: 2.6rem;
    z-index: 2;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-40%, -50%);
    font-size: 1.25rem;
  }
`

const leftButtonStyles = css`
  flex: 1 1 49%;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-top-right-radius: initial;
  border-bottom-right-radius: initial;
`

const rightButtonStyles = css`
  flex: 1 1 47%;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-top-left-radius: initial;
  border-bottom-left-radius: initial;
`

const sectionTwo = css`
  padding: 2rem 2rem 1rem;
  font-size: 1.8rem;
  & p {
    text-align: center;
    margin-bottom: 2rem;
  }
`

const secondButtonContainer = css`
  margin: 2rem auto;
  display: flex;
  justify-content: center;
`

export default UnauthorizedModal
