import React from 'react'
import { css } from '@emotion/core'
import { appBorderColor, appColor2Hover, appColor1Hover } from '../../emotion/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const PhotoList = ({ user, photos, setMainPhoto, deletePhotoFromProfile }) => {
  console.log('from photoList: ', photos)
  if (!user) return null
  return (
    <div css={photoListCss}>
      <div
        css={css`
          ${cardContainer};
          ${mainCardContainer};
        `}
      >
        <div css={card}>
          <img src={user.photoURL} alt='main photo' css={cardImg} />
          <div css={mainPhotoBottom}>Main Photo</div>
        </div>
      </div>

      {photos &&
        photos.map(photo => (
          <div key={photo.id} css={cardContainer}>
            <div css={card}>
              <img css={cardImg} src={photo.url} alt='user photo' />
              <div css={photoBottom}>
                <button
                  onClick={() => setMainPhoto(photo.url)}
                  css={css`
                    ${photoButton};
                    ${setMainButton};
                  `}
                >
                  Set Main
                </button>
                <button
                  onClick={() =>
                    deletePhotoFromProfile(photo.id, photo.photoName, photo.url)
                  }
                  css={css`
                    ${photoButton};
                    ${trashButton};
                  `}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

// styles

const photoListCss = css`
  padding: 3rem 1rem;
  display: flex;
  @media (max-width: 750px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2.5rem;
  }
  @media (max-width: 600px) {
    display: block;
  }
`

const cardContainer = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const mainCardContainer = css`
  grid-column-start: 1;
  grid-column-end: 4;
`

const card = css`
  height: 19rem;
  width: 15rem;
  border-radius: 0.8rem;
  border: 1px solid ${appBorderColor};
  overflow: hidden;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  @media (max-width: 600px) {
    width: 60%;
    height: auto;
    margin: 2rem auto;
  }
  @media (max-width: 500px) {
    width: 70%;
  }
`

const cardImg = css`
  display: block;
  height: 82%;
  width: 100%;
`

const mainPhotoBottom = css`
  height: 18%;
  width: 100%;
  background: ${appColor1Hover};

  color: white;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const photoBottom = css`
  height: 18%;
  width: 100%;
  display: flex;
  overflow: hidden;
`

const photoButton = css`
  background: white;
  cursor: pointer;
  display: block;
  width: 50%;
  outline: none;
  user-select: none;
  font: inherit;
  border: none;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`

const setMainButton = css`
  border-right: 1px solid ${appBorderColor};
  border-bottom-left-radius: 0.8rem;
  color: ${appColor1Hover};
  font-size: 1.5rem;
  &:hover {
    color: white;
    background: ${appColor1Hover};
  }
`

const trashButton = css`
  color: red;
  border-bottom-right-radius: 0.8rem;
  &:hover {
    color: white;
    background: red;
  }
`

export default PhotoList
