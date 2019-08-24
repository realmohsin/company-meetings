import React from 'react'
import { css } from '@emotion/core'
import { appBorderColor } from '../../emotion/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const PhotoList = ({ user, photos, setMainPhoto, deletePhotoFromProfile }) => {
  console.log('from photoList: ', photos)
  if (!user) return null
  return (
    <div css={photoListCss}>
      <div css={card}>
        <img src={user.photoURL} alt='main photo' css={cardImg} />
        <div css={mainPhotoBottom}>Main Photo</div>
      </div>
      {photos &&
        photos.map(photo => (
          <div key={photo.id} css={card}>
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
        ))}
    </div>
  )
}

const photoListCss = css`
  display: flex;
`

const card = css`
  margin: 2rem;
  height: 19rem;
  width: 15rem;
  border-radius: 0.8rem;
  border: 1px solid ${appBorderColor};
  overflow: hidden;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
`

const cardImg = css`
  display: block;
  height: 82%;
  width: 100%;
`

const mainPhotoBottom = css`
  height: 18%;
  width: 100%;
  background: green;
  color: white;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
`

const setMainButton = css`
  border: 1px solid green;
  border-bottom-left-radius: 0.8rem;
  color: green;
  font-size: 1.5rem;
  &:hover {
    color: white;
    background: green;
  }
`

const trashButton = css`
  color: red;
  border: 1px solid red;
  border-bottom-right-radius: 0.8rem;
  &:hover {
    color: white;
    background: red;
  }
`

export default PhotoList
