import { useState } from 'react';
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";
import EditOtherModal from '../modals/EditOtherModal';
import { ServiceAreaInfo } from '@/main/model/LocationModel';
import { UseFormRegister, FieldErrors, Path } from "react-hook-form";
import { ProfileFormData } from "@/main/schemas/profileSchema";

type EditModalType = 'address' | 'serviceArea' | null;

type Props = {
    register: UseFormRegister<ProfileFormData>;
    errors: FieldErrors<ProfileFormData>;
    values: {
        address: string;
        serviceArea: ServiceAreaInfo;
    };
    setValueAndValidate: (name: Path<ProfileFormData>, value: ProfileFormData[keyof ProfileFormData] | string[] | { [key: string]: unknown }) => Promise<boolean>;
    isUpdating: boolean;
    validationErrors: {
        address?: string;
        serviceArea?: string;
    };
};

export default function LocationTab({
    values,
    setValueAndValidate,
    isUpdating,
    validationErrors
}: Props) {
    const [editModalType, setEditModalType] = useState<EditModalType>(null);

    const handleSave = async (value: string) => {
        let isValid = false;
        switch (editModalType) {
            case 'address': {
                const [addressLine, locality, administrativeArea, postalCode] = value.split(',').map(s => s.trim());

                // すべてのフィールドを更新し、最後のバリデーション結果を使用
                await setValueAndValidate('storefrontAddress.addressLines' as Path<ProfileFormData>, [addressLine]);
                await setValueAndValidate('storefrontAddress.locality' as Path<ProfileFormData>, locality);
                await setValueAndValidate('storefrontAddress.administrativeArea' as Path<ProfileFormData>, administrativeArea);
                await setValueAndValidate('storefrontAddress.postalCode' as Path<ProfileFormData>, postalCode);
                isValid = await setValueAndValidate('storefrontAddress.regionCode' as Path<ProfileFormData>, 'JP');
                break;
            }
            case 'serviceArea': {
                const placeInfos = value.split('、')
                    .filter(area => area.trim() !== '')
                    .map(area => ({
                        placeId: '',
                        displayName: area,
                        placeName: area
                    }));

                isValid = await setValueAndValidate('serviceArea.places' as Path<ProfileFormData>, { placeInfos });
                break;
            }
        }
        if (isValid) {
            setEditModalType(null);
        }
        return isValid;
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
                            content={values.address}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('address')}
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
                            content={values.serviceArea.places?.placeInfos.map(place => place.displayName).join('、') || ''}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('serviceArea')}
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
                    title={editModalType === 'address' ? '住所' : 'サービス提供地域'}
                    content={
                        editModalType === 'address'
                            ? values.address
                            : values.serviceArea.places?.placeInfos.map(place => place.displayName).join('、') || ''
                    }
                    onSave={handleSave}
                    error={
                        editModalType === 'address'
                            ? validationErrors.address
                            : validationErrors.serviceArea
                    }
                />
            )}
        </Wrapper>
    );
}
