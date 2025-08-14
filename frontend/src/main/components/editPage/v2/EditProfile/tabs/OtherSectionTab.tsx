import { useState, useEffect } from 'react';
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import Loading from "@/main/common/Loading";
import styles from "../EditProfileLayoutV2.module.scss";
import EditBusinessOwnerModal from "../modals/EditBusinessOwnerModal";
import { useEditServicesModalContainer } from '../modals/EditServicesModal/useEditServicesModalContainer';
import { useEditServiceOptionsModalContainer } from '../modals/EditServiceOptionsModal/useEditServiceOptionsModalContainer';
import { GoogleLocationAttributesModel, GoogleLocationProfileModel, SERVICE_ATTRIBUTE_MAPPING, SERVICE_OPTION_ATTRIBUTE_MAPPING, GoogleLocationAttributeServiceType, GoogleLocationAttributeServiceOptionType } from "@/types/apiModel.ts";
import { GoogleService } from "@/main/service/GoogleService";
import { useModal } from "@/main/common/Modal/useModal";
import { useParams } from "react-router-dom";

// ビジネス所有者情報はboolean値のisOwnedByWomenのみ

type Props = {
  profile: GoogleLocationProfileModel | null;
  attributes: GoogleLocationAttributesModel | null;
  fetchProfile: () => Promise<void>;
  fetchAttributes: () => Promise<void>;
  googleService: GoogleService;
  isLoading?: boolean;
};

export default function OtherSectionTab({
  profile,
  attributes,
  fetchProfile,
  fetchAttributes,
  googleService,
  isLoading = false,
}: Props) {
  const { locationId } = useParams();
  const { isOpen: isBusinessOwnerModalOpen, openModal: openBusinessOwnerModal, closeModal: closeBusinessOwnerModal } = useModal();
  // EditServicesModalのcontainer hook
  const { openModal: openServicesModal, renderContent: renderServicesModal } = useEditServicesModalContainer(locationId, attributes, fetchAttributes);
  
  // EditServiceOptionsModalのcontainer hook
  const { openModal: openServiceOptionsModal, renderContent: renderServiceOptionsModal } = useEditServiceOptionsModalContainer(locationId, attributes, fetchAttributes);

  const handleBusinessOwnerSave = async (isOwnedByWomen: boolean) => {
    if (!locationId) return false;
    try {
      // APIを呼び出してビジネス所有者情報を更新
      await googleService.updateLocationBusinessOwnerInfo(locationId, isOwnedByWomen);
      
      // 属性データを再取得
      await fetchAttributes();
      closeBusinessOwnerModal();
      return true;
    } catch (error) {
      console.error('Failed to save business owner info:', error);
      return false;
    }
  };



  if (isLoading) {
    return <Loading message="その他情報を読み込み中..." size="small" minHeight="200px" />;
  }

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
              content={formatBusinessOwnerInfo(attributes)}
              color="secondary"
              size="normal"
            />
          </Wrapper>
          <Button
            bgColor="primary"
            padding="0.5rem 1.8rem"
            onClick={openBusinessOwnerModal}
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
              content={formatServices(attributes?.attributes || [])}
              color="secondary"
              size="normal"
            />
          </Wrapper>
          <Button
            bgColor="primary"
            padding="0.5rem 1.8rem"
            onClick={openServicesModal}
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
              content={formatServiceOptions(attributes?.attributes || [])}
              color="secondary"
              size="normal"
            />
          </Wrapper>
          <Button
            bgColor="primary"
            padding="0.5rem 1.8rem"
            onClick={openServiceOptionsModal}
          >
            <Typography
              content="編集"
              color="primary"
              size="normal"
            />
          </Button>
        </Wrapper>
      </Wrapper>

      {/* ビジネス所有者情報編集モーダル */}
      {isBusinessOwnerModalOpen && (
        <EditBusinessOwnerModal
          isOpen={isBusinessOwnerModalOpen}
          onClose={closeBusinessOwnerModal}
          isOwnedByWomen={formatBusinessOwnerInfoForModal(attributes)}
          onSave={handleBusinessOwnerSave}
          error={undefined}
        />
      )}

      {/* サービス編集モーダル */}
      {renderServicesModal()}

      {/* サービスオプション編集モーダル */}
      {renderServiceOptionsModal()}
    </Wrapper>
  );
}

const formatBusinessOwnerInfo = (attributes: GoogleLocationAttributesModel | null): string => {
  if (!attributes) return 'ビジネス所有者情報が設定されていません';
  // TODO: Extract business owner info from attributes
  return 'ビジネス所有者情報が設定されていません';
};

const formatBusinessOwnerInfoForModal = (attributes: GoogleLocationAttributesModel | null): boolean => {
  // TODO: Extract isOwnedByWomen from attributes
  if (!attributes) {
    return false;
  }
  
  // 将来的に attributes から実際の isOwnedByWomen 値を抽出する
  // 現在はデフォルトでfalseを返す
  return false;
};

const formatServices = (attributes: GoogleLocationAttributesModel['attributes']): string => {
  if (!attributes || attributes.length === 0) return 'サービスが設定されていません';
  
  // SERVICE_ATTRIBUTE_MAPPINGに定義されている属性で、値がtrueのもののみを表示
  const activeServices: string[] = [];
  
  Object.entries(SERVICE_ATTRIBUTE_MAPPING).forEach(([key, attributeName]) => {
    const attribute = attributes.find(attr => attr.name === attributeName);
    if (attribute?.values && attribute.values.length > 0 && Boolean(attribute.values[0])) {
      const serviceName = GoogleLocationAttributeServiceType[key as keyof typeof GoogleLocationAttributeServiceType];
      if (serviceName) {
        activeServices.push(serviceName);
      }
    }
  });
  
  if (activeServices.length === 0) return 'サービスが設定されていません';
  
  return activeServices.join('、');
};

const formatServiceOptions = (attributes: GoogleLocationAttributesModel['attributes']): string => {
  if (!attributes || attributes.length === 0) return 'サービスオプションが設定されていません';
  
  // SERVICE_OPTION_ATTRIBUTE_MAPPINGに定義されている属性で、値がtrueのもののみを表示
  const activeServiceOptions: string[] = [];
  
  Object.entries(SERVICE_OPTION_ATTRIBUTE_MAPPING).forEach(([key, attributeName]) => {
    const attribute = attributes.find(attr => attr.name === attributeName);
    if (attribute?.values && attribute.values.length > 0 && Boolean(attribute.values[0])) {
      const serviceOptionName = GoogleLocationAttributeServiceOptionType[key as keyof typeof GoogleLocationAttributeServiceOptionType];
      if (serviceOptionName) {
        activeServiceOptions.push(serviceOptionName);
      }
    }
  });
  
  if (activeServiceOptions.length === 0) return 'サービスオプションが設定されていません';
  
  return activeServiceOptions.join('、');
};


