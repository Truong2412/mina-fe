import React, { useState, useEffect, useMemo } from 'react'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import ImgCrop from 'antd-img-crop'
import { message, Upload } from 'antd'
import { ACCEPT_FILE } from '../../const/app-const'
import { uploadFileApiURL } from '../../network/file-api'
import { useUser } from '../../hooks'

// types
interface Props {
  setValue: (value: string[]) => void
  maxLength: number
}

//

export const CropImageUploader: React.FC<Props> = ({ maxLength, setValue }) => {
  const { token } = useUser()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [fileUploadedUrls, setFileUploadedUrls] = useState<string[]>([])
  const urlsMemo = useMemo(() => fileUploadedUrls, [fileUploadedUrls])

  //for reuturn new field Values
  useEffect(() => {
    setValue(urlsMemo)
  }, [urlsMemo])

  //set urls file uploaded
  useEffect(() => {
    const newUrlList = [] as string[]
    fileList.forEach((file) => {
      if (file.status === 'done') {
        newUrlList.push(file.response.data)
      }
    })
    setFileUploadedUrls(newUrlList)
  }, [fileList])
  //

  //onChange file
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  //
  // onPreview file
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  //

  const beforeUpload = (file: File) => {
    const isValidType = ACCEPT_FILE.includes(file.type)
    if (!isValidType) {
      message.error(` Chỉ chấp nhận các file ${ACCEPT_FILE.toString()}`)
    }
    return isValidType
  }

  return (
    <ImgCrop rotate>
      <Upload
        name="file"
        action={uploadFileApiURL}
        headers={{ 'x-access-token': token ?? '' }}
        listType="picture-card"
        beforeUpload={beforeUpload}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < maxLength && '+ Tải lên'}
      </Upload>
    </ImgCrop>
  )
}
