import { useState } from "react";
import FileUploadModal from './FileUploadModal';

type Props = {
    size?: 'regular' | 'large'
}

export default function useFileUploadModal({size = 'regular'}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [uploadedPhotoFileList, setUploadedPhotoFileList] = useState<FileList | null>(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setUploadedPhotoFileList(null);
    };

    const render = () => (
        <FileUploadModal
            isOpen={isOpen}
            onClose={closeModal}
            size={size}
            uploadedPhotoFileList={uploadedPhotoFileList}
            setUploadedPhotoFileList={setUploadedPhotoFileList}
        />
    );

    return {
        render,
        openModal,
        closeModal,
        uploadedPhotoFileList
    }
}
