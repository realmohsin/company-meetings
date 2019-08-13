import React, { useCallback } from 'react'
import { css } from '@emotion/core'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const PhotoDropzone = ({ setFiles }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    },
    [setFiles]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*'
  })

  return (
    <div
      {...getRootProps()}
      css={css`
        ${dropzoneCss};
        ${isDragActive && dropzoneActive};
      `}
    >
      <input {...getInputProps()} />
      <div>
        <FontAwesomeIcon icon={faUpload} css={iconCss} />
      </div>
      <p>Drop Image Here</p>
    </div>
  )
}

const dropzoneCss = css`
  width: 100%;
  height: 16rem;
  border: dashed 3px #888;
  border-radius: 0.5rem;
  text-align: center;
  padding-top: 2.5rem;
`

const dropzoneActive = css`
  border: dashed 3px green;
`

const iconCss = css`
  font-size: 7rem;
  margin-bottom: 1rem;
`

export default PhotoDropzone
