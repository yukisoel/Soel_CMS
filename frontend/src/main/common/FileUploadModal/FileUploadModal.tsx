import { useState, useEffect } from 'react'
import FileUpload from '../FileUpload/FileUpload'
import Modal from '../Modal/Modal'
import Button from '../Button'
import Typography from '../Typography'
import styles from './FileUploadModal.module.scss'

type Props = {
    isOpen: boolean;
    onClose: () => void;
    size: 'regular' | 'large';
    uploadedPhotoFiles: File[];
    onAddFiles: (fileList: FileList) => void;
    onRemoveFile: (index: number) => void;
    onUpload: () => void;
};

export default function FileUploadModal({ isOpen, onClose, size, uploadedPhotoFiles, onAddFiles, onRemoveFile, onUpload }: Props) {
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    // Create preview URLs for all files
    const newPreviewUrls: { [key: string]: string } = {}
    uploadedPhotoFiles.forEach(file => {
      newPreviewUrls[file.name] = URL.createObjectURL(file)
    })
        
    setPreviewUrls(newPreviewUrls)

    // Cleanup URLs
    return () => {
      Object.values(newPreviewUrls).forEach(url => URL.revokeObjectURL(url))
    }
  }, [uploadedPhotoFiles])

  if (!isOpen) return null

  return (
    <Modal headerContent="写真をアップロード" isOpen={isOpen} onClose={onClose} contentRender={() => (
      <>
        {uploadedPhotoFiles.length === 0 ? (
          <FileUpload
            setUploadedPhotoFileList={onAddFiles}
            size={size}
            showPreview={false}
          />
        ) : (
          <>
            <div className={styles.photo_preview_container}>
              {uploadedPhotoFiles.map((file, index) => (
                <div key={index} className={styles.photo_preview_wrapper}>
                  <img
                    className={styles.photo_preview}
                    src={previewUrls[file.name]}
                    alt={file.name}
                  />
                  <Button 
                    bgColor="black" 
                    padding="3px 7px" 
                    className={styles.remove_button}
                    onClick={() => onRemoveFile(index)}
                  >
                    <Typography content="削除" color="yellow" size="xsmall" weight="normal" />
                  </Button>
                </div>
              ))}
            </div>
            <div className={styles.button_container}>
              <FileUpload
                setUploadedPhotoFileList={onAddFiles}
                size="regular"
                showPreview={false}
              />
              <Button bgColor="primary" padding="0.7rem 1.8rem" onClick={onUpload}>
                <Typography content="アップロード" color="primary" size="normal" weight="normal" />
              </Button>
            </div>
          </>
        )}
      </>)}
    />
  )
}
