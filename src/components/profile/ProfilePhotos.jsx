import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { appBorderColor, appColor1 } from '../../emotion/variables'

const PhotoItem = styled.img`
  display: block;
  width: 25%;
  margin: 2rem;
  border-radius: 5px;
  @media (max-width: 00px) {
    width: 28%;
  }
  @media (max-width: 600px) {
    width: 60%;
    margin: 4rem auto;
  }
  @media (max-width: 500px) {
    width: 70%;
  }
  @media (max-width: 400px) {
    width: 80%;
  }
`

const ProfilePhotos = ({ photos }) => {
  return (
    <>
      <h4 css={photoTitleBox}>Photos</h4>
      <div
        css={css`
          ${photosContainer};
          ${!photos.length &&
            css`
              justify-content: center;
            `};
          ${photos.length === 3 &&
            css`
              justify-content: space-between;
            `};
          ${(photos.length === 2 || photos.length === 1) &&
            css`
              justify-content: center;
            `}
        `}
      >
        {photos.length === 0 && <div css={noPhotosStyles}>No Photos</div>}
        {photos &&
          photos.map(photo => (
            <PhotoItem src={photo.url} alt='profile-photos' key={photo.id} />
          ))}
      </div>
    </>
  )
}

const photosContainer = css`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
  height: 80%;
  @media (max-width: 600px) {
    display: block;
  }
`

const photoTitleBox = css`
  color: ${appColor1};
  font-size: 4rem;
  border-bottom: 1px solid ${appBorderColor};
  margin-bottom: 1rem;
  height: 20%;
  text-align: center;
`

const noPhotosStyles = css`
  height: 26rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default ProfilePhotos
