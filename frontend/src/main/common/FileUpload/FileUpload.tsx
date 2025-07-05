import styles from '@/main/common/FileUpload/FileUpload.module.scss';
import { useRef, useState } from "react";
import Typography from '../Typography';
import Button from '../Button';
import Wrapper from '../Wrapper';
type Props = {
    setUploadedPhotoFileList: (fileList: FileList) => void
    size: 'regular' | 'large'
    onReset?: () => void
    showPreview?: boolean
}

const ACCEPTED_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
];

export default function FileUpload({setUploadedPhotoFileList, size, onReset, showPreview = true}: Props) {
    const [uploadedPhotoUrlList, setUploadedPhotoUrlList] = useState<string[]>([])
    const [showAddPhotoListPage, setShowAddPhotoListPage] = useState<boolean>(false)
    const fileUploadInputRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null);

    const onDivDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const onDivDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        if (event.dataTransfer.files.length > 0) {
            const files = event.dataTransfer.files
            const invalid = Array.from(files).find(file => !ACCEPTED_TYPES.includes(file.type));
            if (invalid) {
              setError('jpg/jpeg/png形式の画像のみアップロードできます');
              return;
            } else {
              setError(null);
            }
            handleFileUpload(files)
        }
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = event.target.files;
            const invalid = Array.from(files).find(file => !ACCEPTED_TYPES.includes(file.type));
            if (invalid) {
              setError('jpg/jpeg/png形式の画像のみアップロードできます');
              return;
            } else {
              setError(null);
            }
            handleFileUpload(event.target.files)
        }
    }

    const handleFileUpload = (files: FileList) => {
        if (showPreview) {
            const urls = []
            for (let i = 0; i < files.length; i++) {
              urls.push(URL.createObjectURL(files[i]))
            }
            setUploadedPhotoUrlList(urls)
            setShowAddPhotoListPage(true)
        }
        setUploadedPhotoFileList(files)
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
        setError(null);
        onReset?.();
    }

    return (
    <>
        {(!showAddPhotoListPage || !showPreview) && (
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
                        accept="image/jpg,image/jpeg,image/png"
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
                {error && (
                    <Wrapper justify="justify-start"  style={{width: '100%'}}>
                        <Typography content={error} size="xsmall" color="error" />
                    </Wrapper>
                )}
            </div>
        )}
        {showPreview && showAddPhotoListPage && (
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
