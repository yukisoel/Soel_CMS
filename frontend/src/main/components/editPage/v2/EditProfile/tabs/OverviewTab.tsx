import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";
import EditBusinessInfoModal from "../modals/EditBusinessInfoModal";
import EditBusinessCategoriesModal from "../modals/EditBusinessCategoriesModal";
import { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProfileFormData } from "@/main/schemas/profileSchema";
import { SetValueType } from "../EditProfileLayoutV2";

type Props = {
    register: UseFormRegister<ProfileFormData>;
    errors: FieldErrors<ProfileFormData>;
    values: {
        businessName: string;
        description?: string;
        openingDate?: Date;
        categories?: string[];
    };
    setValueAndValidate: (name: keyof ProfileFormData, value: SetValueType) => Promise<boolean>;
    isUpdating: boolean;
    validationErrors: {
        businessName?: string;
        description?: string;
        openingDate?: string;
        categories?: string;
    };
};

type EditModalType = 'businessName' | 'description' | 'openingDate' | null;

const FIELD_MAP: Record<Exclude<EditModalType, null>, keyof ProfileFormData> = {
    businessName: 'title',
    description: 'description',
    openingDate: 'openingDate',
};

export default function OverviewTab({
    values,
    setValueAndValidate,
    isUpdating,
    validationErrors
}: Props) {
    const [editModalType, setEditModalType] = useState<EditModalType>(null);
    const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
    const [businessCategories, setBusinessCategories] = useState<string[]>(values.categories || []);

    const handleSave = async (value: string | Date) => {
        if (!editModalType) return false;
        const fieldName = FIELD_MAP[editModalType];

        const isValid = await setValueAndValidate(fieldName, value);
        return isValid;
    };

    const handleSaveCategories = async (categories: string[]) => {
        setBusinessCategories(categories);
        const isValid = await setValueAndValidate('categories', categories);
        return isValid;
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
                            content={values.businessName}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('businessName')}
                        disabled={isUpdating}
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
                            content={businessCategories.length > 0 ? businessCategories.join(', ') : 'カテゴリが設定されていません'}
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
                            content={values.description || ''}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('description')}
                        disabled={isUpdating}
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
                            content={values.openingDate ? formatDateToJapanese(values.openingDate) : ''}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('openingDate')}
                        disabled={isUpdating}
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
                        editModalType === 'businessName' ? values.businessName :
                        editModalType === 'description' ? values.description || '' :
                        values.openingDate ? formatDateToJapanese(values.openingDate) : ''
                    }
                    onSave={handleSave}
                    error={
                        editModalType === 'businessName' ? validationErrors.businessName :
                        editModalType === 'description' ? validationErrors.description :
                        validationErrors.openingDate
                    }
                />
            )}

            {/* カテゴリ編集モーダル */}
            <EditBusinessCategoriesModal
                isOpen={isCategoriesModalOpen}
                onClose={() => setIsCategoriesModalOpen(false)}
                categories={businessCategories}
                onSave={handleSaveCategories}
            />
        </Wrapper>
    );
}

const formatDateToJapanese = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
};
