import React, { useState } from 'react';
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";
import EditOtherModal from '../modals/EditOtherModal';

type Props = {
    address: string;
    accessInfo: string;
    onAddressChange: (value: string) => void;
    onAccessInfoChange: (value: string) => void;
};

export default function LocationTab({
    address,
    accessInfo,
    onAddressChange,
    onAccessInfoChange,
}: Props) {
    const [editModalConfig, setEditModalConfig] = useState<{
        isOpen: boolean;
        title: string;
        content: string;
        onSave: (value: string) => void;
    }>({
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

    return (
        <Wrapper direction="col" gap="3rem" className={styles.main_content}>
            {/* 住所 */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="住所"
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

            {/* アクセス */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="アクセス"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={accessInfo}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => handleOpenModal('アクセス', accessInfo, onAccessInfoChange)}
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
