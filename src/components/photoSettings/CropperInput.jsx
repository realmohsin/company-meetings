import React, { Component, createRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

class CropperInput extends Component {
  // _crop () {
  //   // image in dataUrl
  //   console.log(this.refs.cropper.getCroppedCanvas().toDataURL())
  // }

  cropperRef = createRef()

  cropImage = () => {
    const { setCroppedImage } = this.props
    if (typeof this.cropperRef.current.getCroppedCanvas() === 'undefined') {
      return
    }

    this.cropperRef.current.getCroppedCanvas().toBlob(blob => {
      setCroppedImage(blob)
    }, 'image/jpeg')
  }

  render () {
    const { imagePreview } = this.props
    return (
      <Cropper
        ref={this.cropperRef}
        src={imagePreview}
        style={{ height: 220, width: 220 }}
        preview='.img-preview' // the classname of the div of the cropped image
        aspectRatio={1}
        viewMode={1}
        dragMode='move'
        guides={false}
        scalable
        cropBoxMovable
        cropBoxResizable
        crop={this.cropImage}
      />
    )
  }
}

export default CropperInput
