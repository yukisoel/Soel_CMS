import React, { useState } from 'react';
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";
import EditOtherModal from "../modals/EditOtherModal";
import EditServicesModal from '../modals/EditServicesModal';

type Service = {
  id: string;
  name: string;
  isAvailable: boolean;
};

type Props = {
  businessOwnerInfo?: string;
  serviceInfo?: string;
  serviceOptionInfo?: string;
  onEditBusinessOwner?: (value: string) => void;
  onEditService?: (value: string) => void;
  onEditServiceOption?: (value: string) => void;
  services: Service[];
  onServicesChange: (services: Service[]) => void;
};

export default function OtherSectionTab({
  businessOwnerInfo = '内容が入ります。',
  serviceInfo = '内容が入ります。',
  serviceOptionInfo = '内容が入ります。',
  onEditBusinessOwner = () => {},
  onEditService = () => {},
  onEditServiceOption = () => {},
  services,
  onServicesChange,
}: Props) {
  const [editModalConfig, setEditModalConfig] = React.useState<{
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

  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

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

  const formatServices = (services: Service[]): string => {
    const availableServices = services.filter(service => service.isAvailable);
    if (availableServices.length === 0) return 'なし';
    return availableServices.map(service => service.name).join('、');
  };

  return (
    <>
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
                content={businessOwnerInfo}
                color="secondary"
                size="normal"
              />
            </Wrapper>
            <Button
              bgColor="primary"
              padding="0.5rem 1.8rem"
              onClick={() => handleOpenModal('ビジネス所有者情報', businessOwnerInfo, onEditBusinessOwner)}
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
                content={formatServices(services)}
                color="secondary"
                size="normal"
              />
            </Wrapper>
            <Button
              bgColor="primary"
              padding="0.5rem 1.8rem"
              onClick={() => setIsServicesModalOpen(true)}
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
                content={serviceOptionInfo}
                color="secondary"
                size="normal"
              />
            </Wrapper>
            <Button
              bgColor="primary"
              padding="0.5rem 1.8rem"
              onClick={() => handleOpenModal('サービスオプション', serviceOptionInfo, onEditServiceOption)}
            >
              <Typography
                content="編集"
                color="primary"
                size="normal"
              />
            </Button>
          </Wrapper>
        </Wrapper>
      </Wrapper>

      <EditOtherModal
        isOpen={editModalConfig.isOpen}
        onClose={handleCloseModal}
        title={editModalConfig.title}
        content={editModalConfig.content}
        onSave={editModalConfig.onSave}
      />

      <EditServicesModal
        isOpen={isServicesModalOpen}
        onClose={() => setIsServicesModalOpen(false)}
        services={services}
        onSave={onServicesChange}
      />
    </>
  );
}
