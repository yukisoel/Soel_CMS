import styles from '@/main/common/FileUpload/FileUpload.module.scss';
import { useRef, useState } from "react";

type Props = {
    setUploadedPhotoFileList: (fileList: FileList) => void
    size: 'regular' | 'large'
}

export default function FileUpload({setUploadedPhotoFileList, size}: Props) {
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

    const regularButton = () => (
        <>
            <div className={styles.file_upload_text_regular}>
                <p>写真をドラッグアンドドロップ</p>
                <p>または</p>
                <button className={styles.select_file_button}
                    onClick={clickSelectFileButton}>
                    ファイルを選択
                </button>
            </div>
        </>
    )

    const largeButton = () => (
        <>
            <div className={styles.file_upload_text_large}>
                <p>写真をドラッグアンドドロップ</p>
                <p>または</p>
            </div>
            <button className={styles.select_file_button}
                    onClick={clickSelectFileButton}
            >
                ファイルを選択
            </button>
        </>
    )

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
                    {size === 'regular' && regularButton()}
                    {size === 'large' && largeButton()}
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
            </div>
        )}
    </>
  )
}
