import styles from '@/main/common/FileUpload/FileUpload.module.scss';
import { useRef, useState } from "react";
import Typography from '../Typography';
import Button from '../Button';

type Props = {
    setUploadedPhotoFileList: (fileList: FileList) => void
    size: 'regular' | 'large'
    onReset?: () => void
}

export default function FileUpload({setUploadedPhotoFileList, size, onReset}: Props) {
    const [uploadedPhotoUrlList, setUploadedPhotoUrlList] = useState<string[]>([])
    const [showAddPhotoListPage, setShowAddPhotoListPage] = useState<boolean>(false)
    const fileUploadInputRef = useRef<HTMLInputElement>(null)

    const onDivDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const onDivDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        if (event.dataTransfer.files.length > 0) {
            const files = event.dataTransfer.files
            handleFileUpload(files)
        }
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) handleFileUpload(event.target.files)
    }

    const handleFileUpload = (files: FileList) => {
        const urls = []
        for (let i = 0; i < files.length; i++) {
          urls.push(URL.createObjectURL(files[i]))
        }
        setUploadedPhotoFileList(files)
        setUploadedPhotoUrlList(urls)
        setShowAddPhotoListPage(true)
    }

    const clickSelectFileButton = () => {
        if (fileUploadInputRef.current) {
          fileUploadInputRef.current.click()
        }
    }

    const handleReset = () => {
        setUploadedPhotoUrlList([]);
        setShowAddPhotoListPage(false);
        if (fileUploadInputRef.current) {
            fileUploadInputRef.current.value = ''
        }
        onReset?.();
    }

    return (
    <>
        {!showAddPhotoListPage && (
            <div className={styles.file_upload_area_container}>
                <div className={styles[`file_upload_area_${size}`]}
                    onDragEnter={onDivDragOver}
                    onDragOver={onDivDragOver}
                    onDrop={onDivDrop}
                >
                    <input
                        type="file"
                        multiple
                        hidden
                        ref={fileUploadInputRef}
                        onChange={onInputChange}
                    />
                    <div className={styles[`file_upload_text_${size}`]}>
                        <p>写真をドラッグ&ドロップ</p>
                        <p>または</p>
                        <button className={styles.select_file_button}
                            onClick={clickSelectFileButton}>
                            コンピュータから選択
                        </button>
                    </div>
                </div>
            </div>
        )}
        {showAddPhotoListPage && (
            <div className={styles.photo_list_container}>
            {uploadedPhotoUrlList.map((url, index) => {
                return (
                <img
                    key={index}
                    className={styles.photo}
                    src={url}
                    alt={"photo"}
                />
                )
            })}
                <Button bgColor="black" padding="3px 7px" onClick={handleReset}>
                    <Typography content="削除" color="yellow" size="xsmall" weight="normal" />
                </Button>
            </div>
        )}
    </>
  )
}
