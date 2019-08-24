import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import {
  pagePadding,
  appBorderColor,
  appMidColor,
  appTeal,
  appColor2,
  appColor1
} from '../../emotion/variables'

const PhotoItem = styled.img`
  display: block;
  width: 26%;
  border-radius: 5px;
  margin-right: 6rem;
`

const ProfilePhotos = ({ photos }) => {
  return (
    <>
      <h4 css={photoTitleBox}>Photos</h4>
      <div css={photosContainers}>
        {photos &&
          photos.map(photo => (
            <PhotoItem src={photo.url} alt='profile-photos' key={photo.id} />
          ))}
      </div>
    </>
  )
}

const photosContainers = css`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
  height: 80%;
`

const photoTitleBox = css`
  color: ${appColor1};
  padding-left: 3rem;
  font-size: 4rem;
  border-bottom: 1px solid ${appBorderColor};
  margin-bottom: 1rem;
  height: 20%;
`

const iconCss = css`
  font-size: 5rem;
`

export default ProfilePhotos
