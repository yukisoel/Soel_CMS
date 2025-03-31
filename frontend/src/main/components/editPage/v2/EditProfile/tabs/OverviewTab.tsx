import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";
import EditBusinessInfoModal from "../modals/EditBusinessInfoModal";
import EditBusinessCategoriesModal from "../modals/EditBusinessCategoriesModal";
import { useState } from "react";

type Props = {
    businessName: string;
    businessCategories: string[];
    description: string;
    openingDate: string;
    isUpdating: boolean;
    onUpdateBusinessName: (name: string) => void;
    onUpdateDescription: (description: string) => void;
    onUpdateOpeningDate: (date: Date) => void;
    onUpdateBusinessCategories: (categories: string[]) => void;
};

type EditModalType = 'businessName' | 'description' | 'openingDate' | null;

export default function OverviewTab({
    businessName,
    businessCategories,
    description,
    openingDate,
    isUpdating,
    onUpdateBusinessName,
    onUpdateDescription,
    onUpdateOpeningDate,
    onUpdateBusinessCategories
}: Props) {
    const [editModalType, setEditModalType] = useState<EditModalType>(null);
    const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

    const handleSave = (value: string | Date) => {
        switch (editModalType) {
            case 'businessName':
                onUpdateBusinessName(value as string);
                break;
            case 'description':
                onUpdateDescription(value as string);
                break;
            case 'openingDate':
                onUpdateOpeningDate(value as Date);
                break;
        }
    };

    return (
        <Wrapper direction="col" gap="3rem" className={styles.main_content}>
            {/* ビジネス名セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="ビジネス名"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={businessName}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('businessName')}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* ビジネスカテゴリセクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="ビジネスカテゴリ"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={businessCategories.join(', ')}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setIsCategoriesModalOpen(true)}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* 説明セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="説明"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={description}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('description')}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* 開業日セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="開業日"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={openingDate}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('openingDate')}
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
            {editModalType && (
                <EditBusinessInfoModal
                    isOpen={true}
                    onClose={() => setEditModalType(null)}
                    type={editModalType}
                    content={
                        editModalType === 'businessName' ? businessName :
                        editModalType === 'description' ? description :
                        openingDate
                    }
                    onSave={handleSave}
                />
            )}

            {/* ビジネスカテゴリ編集モーダル */}
            <EditBusinessCategoriesModal
                isOpen={isCategoriesModalOpen}
                onClose={() => setIsCategoriesModalOpen(false)}
                categories={businessCategories}
                onSave={onUpdateBusinessCategories || (() => {})}
            />
        </Wrapper>
    );
}
