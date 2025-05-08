import styles from './FileUploadModal.module.scss';
import FileUpload from '../FileUpload/FileUpload';
import Modal from '../Modal/Modal';
import Button from '../Button';
import Typography from '../Typography';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    size: 'regular' | 'large';
    uploadedPhotoFileList: FileList | null;
    setUploadedPhotoFileList: (fileList: FileList | null) => void;
    onUpload: () => void;
};

export default function FileUploadModal({ isOpen, onClose, size, uploadedPhotoFileList, setUploadedPhotoFileList, onUpload }: Props) {
    if (!isOpen) return null;

    const handleReset = () => {
        setUploadedPhotoFileList(null);
    };

    return (
        <Modal headerContent="写真をアップロード" isOpen={isOpen} onClose={onClose} contentRender={() => (
            <>
                <FileUpload
                    setUploadedPhotoFileList={setUploadedPhotoFileList}
                    size={size}
                    onReset={handleReset}
                />
                {uploadedPhotoFileList && (
                    <>
                        <div className={styles.uploaded_files}>
                            {Array.from(uploadedPhotoFileList).map((file, index) => (
                                <div key={index} className={styles.uploaded_file}>
                                    {file.name}
                                </div>
                            ))}
                        </div>
                        <div className={styles.button_container}>
                            <Button bgColor="primary" padding="0.7rem 1.8rem" onClick={onUpload}>
                                <Typography content="アップロード" color="primary" size="normal" weight="normal" />
                            </Button>
                        </div>
                    </>
                )}
            </>)}
        />
    );
}
