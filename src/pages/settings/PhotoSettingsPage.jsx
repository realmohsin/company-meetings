import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import {
  appBorderColor,
  appColor1,
  appColor2,
  appColor1Hover,
  appBoxShadow
} from '../../emotion/variables'
import buttonCss from '../../emotion/buttonCss'
import PhotoDropzone from '../../components/photoSettings/PhotoDropzone'
import CropperInput from '../../components/photoSettings/CropperInput'
import PhotoList from '../../components/photoSettings/PhotoList'
import {
  addPhotoToProfile,
  setMainPhoto,
  deletePhotoFromProfile
} from '../../store/actions/actions'
import { selectPhotos, selectUser } from '../../store/selectors/authSelectors'
import Button from '../../components/utils/Button'

const mapStateToProps = state => ({
  user: selectUser(state),
  photos: selectPhotos(state)
})

const PhotoSettingsPage = ({
  user,
  photos,
  addPhotoToProfile,
  setMainPhoto,
  deletePhotoFromProfile
}) => {
  const [files, setFiles] = useState([])
  const [croppedImage, setCroppedImage] = useState(null)

  useEffect(
    () => {
      return () => {
        files.forEach(file => URL.revokeObjectURL(file.preview))
      }
    },
    [files]
  )

  const handleCancelCrop = () => {
    setFiles([])
    setCroppedImage(null)
  }

  const handleUploadImage = async () => {
    try {
      await addPhotoToProfile(croppedImage)
      handleCancelCrop()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div css={photoSettingsCss}>
      <h1 css={headerCss}>My Photos</h1>

      <div css={uploadedSection}>
        <PhotoList
          user={user}
          photos={photos}
          setMainPhoto={setMainPhoto}
          deletePhotoFromProfile={deletePhotoFromProfile}
        />
      </div>

      <div css={inputsContainer}>
        <div css={photoInputComponent}>
          <h2>STEP 1 - ADD PHOTO</h2>
          <div>
            <div css={dropzoneContainer}>
              {photos.length < 3 ? (
                <PhotoDropzone setFiles={setFiles} />
              ) : (
                <div css={maxPhotosStyles}>Maximum Photos Reached</div>
              )}
            </div>
          </div>
        </div>

        <div css={photoInputComponent}>
          <h2>STEP 2 - RESIZE IMAGE</h2>
          <div>
            <div>
              {files.length > 0 && (
                <CropperInput
                  setCroppedImage={setCroppedImage}
                  imagePreview={files[0].preview}
                />
              )}
            </div>
          </div>
        </div>

        <div css={photoInputComponent}>
          <h2>STEP 3 - PREVIEW & UPLOAD</h2>
          <div>
            {/* The styles below seem necessary */}
            <div>
              {files.length > 0 && (
                <>
                  <div
                    className='img-preview'
                    style={{ minWidth: '210px', minHeight: '210px', overflow: 'hidden' }}
                  />
                  <div css={buttonContainer}>
                    <Button onClick={handleUploadImage} content='✔️' />
                    <Button onClick={handleCancelCrop} content='❌' />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// styles

const photoSettingsCss = css``

const headerCss = css`
  color: ${appColor1Hover};
  text-decoration: underline;
  margin-bottom: 3rem;
  text-align: center;
  @media (max-width: 600px) {
    margin-bottom: 1px;
  }
  @media (max-width: 355px) {
    font-size: 29px;
  }
`

const inputsContainer = css`
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  box-shadow: ${appBoxShadow};
  background: white;
  display: flex;
  padding: 2rem 0.5rem;
  margin-bottom: 5rem;
  & h2 {
    font-size: 1.7rem;
    color: ${appColor1Hover};
    margin: 1.5rem 0 2.5rem;
  }
  @media (max-width: 800px) {
    display: block;
  }
`

const photoInputComponent = css`
  flex: 1;
  & h2 {
    text-align: center;
  }
  & > div {
    height: 275px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const dropzoneContainer = css`
  width: 210px;
  height: 210px;
`

const uploadedSection = css`
  ${'' /* border: 1px solid ${appBorderColor};
  border-radius: 0.5rem;
  background: white;
  box-shadow: ${appBoxShadow}; */}
  margin-bottom: 2rem;
`

const buttonContainer = css`
  margin-top: 1.5rem;
  font-size: 1.7rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
`

const maxPhotosStyles = css`
  margin: 20% auto;
  text-align: center;
  color: red;
`

export default connect(
  mapStateToProps,
  { addPhotoToProfile, setMainPhoto, deletePhotoFromProfile }
)(PhotoSettingsPage)
