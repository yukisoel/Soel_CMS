import { useState } from "react";
import FileUpload from './FileUpload';

type Props = {
    size?: 'regular' | 'large'
}

export default function useFileUpload({size = 'regular'}: Props) {
    const [uploadedPhotoFileList, setUploadedPhotoFileList] = useState<FileList | null>(null)

    const render = () =>
    (<FileUpload setUploadedPhotoFileList={setUploadedPhotoFileList} size={size} />)

    console.log('size', size)
  return {
    render,
    uploadedPhotoFileList
  }
}
