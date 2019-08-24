import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { appBorderColor, appColor1, appColor2 } from '../../emotion/variables'
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
      <header css={headerCss}>My Photos</header>
      <div css={rowOneCss}>
        <div>
          <h4>STEP 1 - ADD PHOTO</h4>
          <div>
            {photos.length < 3 ? (
              <PhotoDropzone setFiles={setFiles} />
            ) : (
              <div css={maxPhotosStyles}>Maximum Photos Reached</div>
            )}
          </div>
        </div>
        <div>
          <h4>STEP 2 - RESIZE IMAGE</h4>
          <div>
            {files.length > 0 && (
              <CropperInput
                setCroppedImage={setCroppedImage}
                imagePreview={files[0].preview}
              />
            )}
          </div>
        </div>
        <div>
          <h4>STEP 3 - PREVIEW & UPLOAD</h4>
          <div css={previewContainer}>
            {/* The styles below seem necessary */}
            {files.length > 0 && (
              <>
                <div
                  className='img-preview'
                  style={{ minWidth: '200px', minHeight: '200px', overflow: 'hidden' }}
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
      <div css={rowTwoCss}>
        <PhotoList
          user={user}
          photos={photos}
          setMainPhoto={setMainPhoto}
          deletePhotoFromProfile={deletePhotoFromProfile}
        />
      </div>
    </div>
  )
}

const photoSettingsCss = css`
  height: 76rem;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  background: white;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`

const headerCss = css`
  height: 12%;
  font-size: 4rem;
  color: ${appColor2};
  text-decoration: underline;
  font-weight: bold;
  border-bottom: 1px solid ${appBorderColor};
  display: flex;
  align-items: center;
  padding-left: 5rem;
`

const rowOneCss = css`
  border-bottom: 1px solid ${appBorderColor};
  height: 44%;
  display: flex;
  justify-content: space-around;
  & h4 {
    font-size: 1.4rem;
    color: #00b5ad;
    margin-bottom: 3rem;
  }
  & > div {
    width: 22rem;
    margin: 2rem;
  }
`

const previewContainer = css`
  width: 21rem;
  height: 21rem;
`

const rowTwoCss = css`
  height: 44%;
  display: flex;
  align-items: center;
`

const buttonContainer = css`
  width: 18.5rem;
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
`

const maxPhotosStyles = css`
  margin-top: 5rem;
  color: red;
`

export default connect(
  mapStateToProps,
  { addPhotoToProfile, setMainPhoto, deletePhotoFromProfile }
)(PhotoSettingsPage)
