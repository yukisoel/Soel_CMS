import React, { useState } from 'react';
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";
import EditOtherModal from '../modals/EditOtherModal';
import { ServiceAreaInfo } from '@/main/model/LocationModel';

type EditModalConfig = {
    isOpen: boolean;
    title: string;
    content: string;
    onSave: (value: string) => void;
};

type Props = {
    address: string;
    serviceArea: ServiceAreaInfo;
    onAddressChange: (address: string) => void;
    onServiceAreaChange: (serviceArea: ServiceAreaInfo) => void;
    isUpdating: boolean;
};

export default function LocationTab({
    address,
    serviceArea,
    onAddressChange,
    onServiceAreaChange,
    isUpdating
}: Props) {
    const [editModalConfig, setEditModalConfig] = useState<EditModalConfig>({
        isOpen: false,
        title: '',
        content: '',
        onSave: () => {},
    });

    const handleOpenModal = (title: string, content: string, onSave: (value: string) => void) => {
        setEditModalConfig({
            isOpen: true,
            title,
            content,
            onSave,
        });
    };

    const handleCloseModal = () => {
        setEditModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    const handleServiceAreaChange = (value: string) => {
        const placeInfos = value.split('、')
            .filter(area => area.trim() !== '')
            .map(area => ({
                placeId: '', // placeIdは必要に応じてGoogle Places APIから取得
                placeName: area
            }));

        // businessTypeは既存の値を維持
        onServiceAreaChange({
            ...serviceArea, // 既存のserviceAreaの値（businessTypeを含む）を保持
            places: {
                placeInfos
            }
        });
    };

    return (
        <Wrapper direction="col" gap="3rem" className={styles.main_content}>
            {/* 店舗の住所 */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="店舗の住所"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={address}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => handleOpenModal('住所', address, onAddressChange)}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* サービス提供地域 */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="サービス提供地域"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={serviceArea.places?.placeInfos.map(place => place.placeName).join('、') || ''}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => handleOpenModal(
                            'サービス提供地域',
                            serviceArea.places?.placeInfos.map(place => place.placeName).join('、') || '',
                            handleServiceAreaChange
                        )}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* 編集モーダル */}
            <EditOtherModal
                isOpen={editModalConfig.isOpen}
                onClose={handleCloseModal}
                title={editModalConfig.title}
                content={editModalConfig.content}
                onSave={editModalConfig.onSave}
            />
        </Wrapper>
    );
}
