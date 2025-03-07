import styles from './FileUploadModal.module.scss';
import FileUpload from '../FileUpload/FileUpload';
import Modal from '../Modal/Modal';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    size: 'regular' | 'large';
    uploadedPhotoFileList: FileList | null;
    setUploadedPhotoFileList: (fileList: FileList) => void;
};

export default function FileUploadModal({ isOpen, onClose, size, uploadedPhotoFileList, setUploadedPhotoFileList }: Props) {
    if (!isOpen) return null;

    return (
        <Modal headerContent="写真をアップロード" isOpen={isOpen} onClose={onClose} contentRender={() => (
            <>
                <FileUpload setUploadedPhotoFileList={setUploadedPhotoFileList} size={size} />
                {uploadedPhotoFileList && (
                    <div className={styles.uploaded_files}>
                        {Array.from(uploadedPhotoFileList).map((file, index) => (
                            <div key={index} className={styles.uploaded_file}>
                                {file.name}
                            </div>
                        ))}
                    </div>
                )}
            </>)}
        />
    )}
