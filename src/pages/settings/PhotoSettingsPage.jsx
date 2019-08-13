import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { appBorderColor } from '../../emotion/variables'
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
            <PhotoDropzone setFiles={setFiles} />
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
                  <button onClick={handleUploadImage} css={buttonCss}>
                    ✔️
                  </button>
                  <button onClick={handleCancelCrop} css={buttonCss}>
                    ❌
                  </button>
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
  width: 84rem;
  height: 90rem;
  border: 1px solid ${appBorderColor};
  border-radius: 0.4rem;
  background: white;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`

const headerCss = css`
  height: 3.5rem;
  line-height: 3.5rem;
  border-bottom: 1px solid ${appBorderColor};
`

const rowOneCss = css`
  border-bottom: 1px solid ${appBorderColor};
  height: 30.5rem;
  display: flex;
  justify-content: space-around;
  & h4 {
    font-size: 1.4rem;
    color: #00b5ad;
    margin-bottom: 1rem;
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

const rowTwoCss = css``

const buttonContainer = css`
  margin: 2rem 0;
  display: flex;
  justify-content: space-around;
`

export default connect(
  mapStateToProps,
  { addPhotoToProfile, setMainPhoto, deletePhotoFromProfile }
)(PhotoSettingsPage)
