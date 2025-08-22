import { useState } from "react";
import FileUploadModal from './FileUploadModal';
import { GoogleRepository } from "@/main/repositories/GoogleRepository";

type Props = {
    size?: 'regular' | 'large';
    googleRepository: GoogleRepository;
    accountId?: string;
    locationId?: string;
    onUploadSuccess?: () => void;
}

export default function useFileUploadModal({
    size = 'regular',
    googleRepository,
    accountId,
    locationId,
    onUploadSuccess
}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [uploadedPhotoFiles, setUploadedPhotoFiles] = useState<File[]>([]);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setUploadedPhotoFiles([]);
    };

    const handleUpload = async () => {
        if (accountId && locationId && uploadedPhotoFiles.length > 0) {
            try {
                // Convert File[] to FileList-like object for the API
                const dataTransfer = new DataTransfer();
                uploadedPhotoFiles.forEach(file => {
                    dataTransfer.items.add(file);
                });
                await googleRepository.postLocationPhoto(accountId, locationId, dataTransfer.files);
                onUploadSuccess?.();
                closeModal();
            } catch (error) {
                console.error("写真のアップロードに失敗しました:", error);
            }
        }
    };

    const handleAddFiles = (fileList: FileList) => {
        const newFiles = Array.from(fileList);
        setUploadedPhotoFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleRemoveFile = (index: number) => {
        setUploadedPhotoFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const render = () => (
        <FileUploadModal
            isOpen={isOpen}
            onClose={closeModal}
            size={size}
            uploadedPhotoFiles={uploadedPhotoFiles}
            onAddFiles={handleAddFiles}
            onRemoveFile={handleRemoveFile}
            onUpload={handleUpload}
        />
    );

    return {
        render,
        openModal,
        closeModal,
        uploadedPhotoFiles
    }
}
