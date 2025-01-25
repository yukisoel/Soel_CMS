import styles from './FileUploadModal.module.scss';
import FileUpload from '../FileUpload/FileUpload';
import Typography from '../Typography';
import CloseIcon from '@/main/assets/CloseIcon.svg';
import Separator from '../Separator';
import Wrapper from '../Wrapper';

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
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <Wrapper direction="col" gap="2rem">
                    <div className={styles.modal_header}>
                        <Typography content="写真をアップロード" color="primary" size="normal" />
                        <button className={styles.close_button} onClick={onClose}>
                            <img src={CloseIcon} alt="close icon"  />
                        </button>
                    </div>
                    <Separator width="100%" />
                </Wrapper>
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
            </div>
        </div>
    );
}
