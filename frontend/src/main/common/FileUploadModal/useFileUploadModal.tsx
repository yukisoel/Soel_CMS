import { useState } from "react";
import FileUploadModal from './FileUploadModal';
import { GoogleService } from "@/main/service/GoogleService";

type Props = {
    size?: 'regular' | 'large';
    googleService: GoogleService;
    accountId?: string;
    locationId?: string;
    onUploadSuccess?: () => void;
}

export default function useFileUploadModal({
    size = 'regular',
    googleService,
    accountId,
    locationId,
    onUploadSuccess
}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [uploadedPhotoFileList, setUploadedPhotoFileList] = useState<FileList | null>(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setUploadedPhotoFileList(null);
    };

    const handleUpload = async () => {
        if (accountId && locationId && uploadedPhotoFileList && uploadedPhotoFileList.length > 0) {
            try {
                await googleService.postLocationPhoto(accountId, locationId, uploadedPhotoFileList);
                onUploadSuccess?.();
                closeModal();
            } catch (error) {
                console.error("写真のアップロードに失敗しました:", error);
            }
        }
    };

    const render = () => (
        <FileUploadModal
            isOpen={isOpen}
            onClose={closeModal}
            size={size}
            uploadedPhotoFileList={uploadedPhotoFileList}
            setUploadedPhotoFileList={setUploadedPhotoFileList}
            onUpload={handleUpload}
        />
    );

    return {
        render,
        openModal,
        closeModal,
        uploadedPhotoFileList
    }
}
