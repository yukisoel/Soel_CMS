import React, { useState } from 'react';
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";
import EditOtherModal from "../modals/EditOtherModal";
import EditServicesModal from '../modals/EditServicesModal';
import { UseFormRegister, FieldErrors, Path } from "react-hook-form";
import { ProfileFormData } from "@/main/schemas/profileSchema";

type Service = {
  id: string;
  name: string;
  isAvailable: boolean;
};

type EditModalType = 'businessOwner' | 'serviceOption' | null;

type Props = {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldErrors<ProfileFormData>;
  values: {
    businessOwnerInfo?: string;
    serviceOptionInfo?: string;
    services: Service[];
  };
  setValueAndValidate: (name: Path<ProfileFormData>, value: ProfileFormData[keyof ProfileFormData] | string[] | { [key: string]: unknown }) => Promise<boolean>;
  isUpdating: boolean;
  validationErrors: {
    businessOwnerInfo?: string;
    serviceOptionInfo?: string;
    services?: string;
  };
};

export default function OtherSectionTab({
  register,
  errors,
  values,
  setValueAndValidate,
  isUpdating,
  validationErrors
}: Props) {
  const [editModalType, setEditModalType] = useState<EditModalType>(null);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  const handleSave = async (value: string) => {
    let isValid = false;
    switch (editModalType) {
      case 'businessOwner': {
        isValid = await setValueAndValidate('businessOwnerInfo', value);
        break;
      }
      case 'serviceOption': {
        isValid = await setValueAndValidate('serviceOptionInfo', value);
        break;
      }
    }
    if (isValid) {
      setEditModalType(null);
    }
    return isValid;
  };

  const handleServicesChange = async (services: Service[]) => {
    const isValid = await setValueAndValidate('services', services);
    if (isValid) {
      setIsServicesModalOpen(false);
    }
    return isValid;
  };

  return (
    <Wrapper direction="col" gap="3rem" className={styles.main_content}>
      {/* ビジネス所有者情報セクション */}
      <Wrapper direction="col" gap="1rem">
        <Typography
          content="ビジネス所有者情報"
          color="primary"
          size="normal"
        />
        <Wrapper className={styles.field_row}>
          <Wrapper className={styles.field_container}>
            <Typography
              content={values.businessOwnerInfo || ''}
              color="secondary"
              size="normal"
            />
          </Wrapper>
          <Button
            bgColor="primary"
            padding="0.5rem 1.8rem"
            onClick={() => setEditModalType('businessOwner')}
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

      {/* サービスセクション */}
      <Wrapper direction="col" gap="1rem">
        <Typography
          content="サービス"
          color="primary"
          size="normal"
        />
        <Wrapper className={styles.field_row}>
          <Wrapper className={styles.field_container}>
            <Typography
              content={formatServices(values.services)}
              color="secondary"
              size="normal"
            />
          </Wrapper>
          <Button
            bgColor="primary"
            padding="0.5rem 1.8rem"
            onClick={() => setIsServicesModalOpen(true)}
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

      {/* サービスオプションセクション */}
      <Wrapper direction="col" gap="1rem">
        <Typography
          content="サービスオプション"
          color="primary"
          size="normal"
        />
        <Wrapper className={styles.field_row}>
          <Wrapper className={styles.field_container}>
            <Typography
              content={values.serviceOptionInfo || ''}
              color="secondary"
              size="normal"
            />
          </Wrapper>
          <Button
            bgColor="primary"
            padding="0.5rem 1.8rem"
            onClick={() => setEditModalType('serviceOption')}
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
            editModalType === 'businessOwner' ? 'ビジネス所有者情報' :
            'サービスオプション'
          }
          content={
            editModalType === 'businessOwner' ? values.businessOwnerInfo || '' :
            values.serviceOptionInfo || ''
          }
          onSave={handleSave}
          error={
            editModalType === 'businessOwner' ? validationErrors.businessOwnerInfo :
            validationErrors.serviceOptionInfo
          }
        />
      )}

      {/* サービス編集モーダル */}
      {isServicesModalOpen && (
        <EditServicesModal
          isOpen={true}
          onClose={() => setIsServicesModalOpen(false)}
          services={values.services}
          onSave={handleServicesChange}
          error={validationErrors.services}
        />
      )}
    </Wrapper>
  );
}

const formatServices = (services: Service[]): string => {
  const availableServices = services.filter(service => service.isAvailable);
  if (availableServices.length === 0) return 'なし';
  return availableServices.map(service => service.name).join('、');
};
