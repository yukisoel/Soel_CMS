import React from 'react';
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";
import EditOtherModal from "../modals/EditOtherModal";

type Props = {
  businessOwnerInfo?: string;
  serviceInfo?: string;
  serviceOptionInfo?: string;
  onEditBusinessOwner?: (value: string) => void;
  onEditService?: (value: string) => void;
  onEditServiceOption?: (value: string) => void;
};

export default function OtherSectionTab({
  businessOwnerInfo = '内容が入ります。',
  serviceInfo = '内容が入ります。',
  serviceOptionInfo = '内容が入ります。',
  onEditBusinessOwner = () => {},
  onEditService = () => {},
  onEditServiceOption = () => {},
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
                content={serviceInfo}
                color="secondary"
                size="normal"
              />
            </Wrapper>
            <Button
              bgColor="primary"
              padding="0.5rem 1.8rem"
              onClick={() => handleOpenModal('サービス', serviceInfo, onEditService)}
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
    </>
  );
}
