import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";
import EditBusinessInfoModal from "../modals/EditBusinessInfoModal";
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
    };
    setValueAndValidate: (name: keyof ProfileFormData, value: SetValueType) => Promise<boolean>;
    isUpdating: boolean;
    validationErrors: {
        businessName?: string;
        description?: string;
        openingDate?: string;
    };
};

type EditModalType = 'businessName' | 'description' | 'openingDate' | null;

const FIELD_MAP: Record<Exclude<EditModalType, null>, keyof ProfileFormData> = {
    businessName: 'title',
    description: 'description',
    openingDate: 'openingDate',
};

export default function OverviewTab({
    register,
    errors,
    values,
    setValueAndValidate,
    isUpdating,
    validationErrors
}: Props) {
    const [editModalType, setEditModalType] = useState<EditModalType>(null);

    const handleSave = async (value: string | Date) => {
        if (!editModalType) return false;
        const fieldName = FIELD_MAP[editModalType];

        const isValid = await setValueAndValidate(fieldName, value);
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
        </Wrapper>
    );
}

const formatDateToJapanese = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
};
