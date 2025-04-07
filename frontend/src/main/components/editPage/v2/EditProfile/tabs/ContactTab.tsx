import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";
import EditOtherModal from "../modals/EditOtherModal";
import { useState } from "react";
import { UseFormRegister, FieldErrors, Path } from "react-hook-form";
import { ProfileFormData } from "@/main/schemas/profileSchema";

type Props = {
    register: UseFormRegister<ProfileFormData>;
    errors: FieldErrors<ProfileFormData>;
    values: {
        phoneNumber?: string;
        website?: string;
        menuLink?: string;
    };
    setValueAndValidate: (name: Path<ProfileFormData>, value: ProfileFormData[keyof ProfileFormData] | string[] | { [key: string]: unknown }) => Promise<boolean>;
    isUpdating: boolean;
    validationErrors: {
        phoneNumber?: string;
        website?: string;
        menuLink?: string;
    };
};

type EditModalType = 'phoneNumber' | 'website' | 'menuLink' | null;

export default function ContactTab({
    values,
    setValueAndValidate,
    isUpdating,
    validationErrors
}: Props) {
    const [editModalType, setEditModalType] = useState<EditModalType>(null);

    const handleSave = async (value: string) => {
        let isValid = false;
        switch (editModalType) {
            case 'phoneNumber':
                isValid = await setValueAndValidate('phoneNumbers.primaryPhone', value);
                break;
            case 'website':
                isValid = await setValueAndValidate('websiteUri', value);
                break;
            case 'menuLink':
                isValid = await setValueAndValidate('menuUri', value);
                break;
        }
        if (isValid) {
            setEditModalType(null);
        }
        return isValid;
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
                            content={values.phoneNumber || ''}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('phoneNumber')}
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
                            content={values.website || ''}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('website')}
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
                            content={values.menuLink || ''}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('menuLink')}
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
                <EditOtherModal
                    isOpen={true}
                    onClose={() => setEditModalType(null)}
                    title={
                        editModalType === 'phoneNumber' ? '電話番号' :
                        editModalType === 'website' ? 'ウェブサイト' :
                        'メニューリンク'
                    }
                    content={
                        editModalType === 'phoneNumber' ? values.phoneNumber || '' :
                        editModalType === 'website' ? values.website || '' :
                        values.menuLink || ''
                    }
                    onSave={handleSave}
                    error={
                        editModalType === 'phoneNumber' ? validationErrors.phoneNumber :
                        editModalType === 'website' ? validationErrors.website :
                        validationErrors.menuLink
                    }
                />
            )}
        </Wrapper>
    );
}
