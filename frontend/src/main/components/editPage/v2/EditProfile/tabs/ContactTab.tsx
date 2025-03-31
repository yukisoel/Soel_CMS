import React, { useState } from 'react';
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";
import EditOtherModal from '../modals/EditOtherModal';

type Props = {
    phoneNumber: string;
    website: string;
    menuLink: string;
    snsLinks: { type: string; url: string; }[];
    isUpdating: boolean;
    onPhoneNumberChange: (phone: string) => void;
    onWebsiteChange: (site: string) => void;
    onMenuLinkChange: (link: string) => void;
    onSnsLinksChange: (links: { type: string; url: string; }[]) => void;
};

export default function ContactTab({
    phoneNumber,
    website,
    menuLink,
    snsLinks,
    isUpdating,
    onPhoneNumberChange,
    onWebsiteChange,
    onMenuLinkChange,
    onSnsLinksChange,
}: Props) {
    const [editModalConfig, setEditModalConfig] = useState<{
        isOpen: boolean;
        title: string;
        content: string;
        onSave: (value: string) => void;
        isTextarea?: boolean;
    }>({
        isOpen: false,
        title: '',
        content: '',
        onSave: () => {},
    });

    const handleOpenModal = (title: string, content: string, onSave: (value: string) => void, isTextarea?: boolean) => {
        setEditModalConfig({
            isOpen: true,
            title,
            content,
            onSave,
            isTextarea,
        });
    };

    const handleCloseModal = () => {
        setEditModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    const handleSnsLinksChange = (value: string) => {
        try {
            // SNSリンクを改行で分割し、type:urlの形式をパースする
            const links = value.split('\n').map(line => {
                const [type, url] = line.split(':').map(s => s.trim());
                return { type, url };
            });
            onSnsLinksChange(links);
        } catch (error) {
            console.error('Invalid SNS links format');
        }
    };

    // SNSリンクをテキストエリア用の文字列に変換
    const formatSnsLinksForTextarea = () => {
        return snsLinks.map(link => `${link.type}: ${link.url}`).join('\n');
    };

    return (
        <Wrapper direction="col" gap="3rem" className={styles.main_content}>
            {/* 電話番号セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="電話番号"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={phoneNumber}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => handleOpenModal('電話番号', phoneNumber, onPhoneNumberChange)}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* ウェブサイトセクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="ウェブサイト"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={website}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => handleOpenModal('Webサイト', website, onWebsiteChange)}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* SNSリンクセクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="SNSリンク"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={`${styles.field_container} ${styles.sns_container}`}>
                        {snsLinks.map((sns, index) => (
                            <Wrapper key={index} className={styles.sns_item}>
                                <Typography
                                    content={`${sns.type}: ${sns.url}`}
                                    color="secondary"
                                    size="normal"
                                />
                            </Wrapper>
                        ))}
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => handleOpenModal('SNSリンク', formatSnsLinksForTextarea(), handleSnsLinksChange, true)}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* メニューリンクセクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="メニューリンク"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={menuLink}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => handleOpenModal('メニューリンク', menuLink, onMenuLinkChange)}
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
                isTextarea={editModalConfig.isTextarea}
            />
        </Wrapper>
    );
}
