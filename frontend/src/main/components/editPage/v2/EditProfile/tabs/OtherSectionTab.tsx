import { useState } from 'react';
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import Loading from "@/main/common/Loading";
import styles from "../EditProfileLayoutV2.module.scss";
import EditBusinessOwnerModal from "../modals/EditBusinessOwnerModal";
import EditServicesModal from '../modals/EditServicesModal';
import EditServiceOptionsModal from '../modals/EditServiceOptionsModal';
import { GoogleLocationAttributesModel, GoogleLocationProfileModel, SERVICE_ATTRIBUTE_MAPPING, SERVICE_OPTION_ATTRIBUTE_MAPPING, GoogleLocationBusinessOwnerInfo } from "@/types/apiModel.ts";
import { GoogleLocationAttributeServiceType as ApiServiceType, GoogleLocationAttributeServiceOptionType as ApiServiceOptionType } from "@/types/api.ts";
import { GoogleService } from "@/main/service/GoogleService";
import { useModal } from "@/main/common/Modal/useModal";
import { useParams } from "react-router-dom";

type Service = {
  id: string;
  name: string;
  isAvailable: boolean;
};

type ServiceOption = {
  id: string;
  name: string;
  isAvailable: boolean;
};

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
  const { isOpen: isServicesModalOpen, openModal: openServicesModal, closeModal: closeServicesModal } = useModal();
  const { isOpen: isServiceOptionsModalOpen, openModal: openServiceOptionsModal, closeModal: closeServiceOptionsModal } = useModal();

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

  const handleServicesChange = async (services: Service[]) => {
    if (!locationId) return false;
    try {
      // Service[]をGoogleLocationAttributeService[]に変換
      // マッピングを使用して属性名に変換
      const attributeServices = services.map(service => {
        const attributeName = SERVICE_ATTRIBUTE_MAPPING[service.id];
        if (!attributeName) {
          console.warn(`Unknown service id: ${service.id}`);
          return null;
        }
        return {
          type: attributeName as ApiServiceType,
          value: service.isAvailable
        };
      }).filter((item): item is { type: ApiServiceType; value: boolean } => item !== null);
      
      // APIを呼び出してサービス属性を更新
      await googleService.updateLocationAttributesServices(locationId, attributeServices);
      
      // 属性データを再取得
      await fetchAttributes();
      closeServicesModal();
      return true;
    } catch (error) {
      console.error('Failed to save services:', error);
      return false;
    }
  };

  const handleServiceOptionsChange = async (serviceOptions: ServiceOption[]) => {
    if (!locationId) return false;
    try {
      // ServiceOption[]をGoogleLocationAttributeServiceOption[]に変換
      // マッピングを使用して属性名に変換
      const attributeServiceOptions = serviceOptions.map(serviceOption => {
        const attributeName = SERVICE_OPTION_ATTRIBUTE_MAPPING[serviceOption.id];
        if (!attributeName) {
          console.warn(`Unknown service option id: ${serviceOption.id}`);
          return null;
        }
        return {
          type: attributeName as ApiServiceOptionType,
          value: serviceOption.isAvailable
        };
      }).filter((item): item is { type: ApiServiceOptionType; value: boolean } => item !== null);
      
      // APIを呼び出してサービスオプション属性を更新
      await googleService.updateLocationAttributesServiceOptions(locationId, attributeServiceOptions);
      
      // 属性データを再取得
      await fetchAttributes();
      closeServiceOptionsModal();
      return true;
    } catch (error) {
      console.error('Failed to save service options:', error);
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
      {isServicesModalOpen && (
        <EditServicesModal
          isOpen={isServicesModalOpen}
          onClose={closeServicesModal}
          services={formatServicesForModal(attributes?.attributes || [])}
          onSave={handleServicesChange}
          error={undefined}
        />
      )}

      {/* サービスオプション編集モーダル */}
      {isServiceOptionsModalOpen && (
        <EditServiceOptionsModal
          isOpen={isServiceOptionsModalOpen}
          onClose={closeServiceOptionsModal}
          serviceOptions={formatServiceOptionsForModal(attributes?.attributes || [])}
          onSave={handleServiceOptionsChange}
          error={undefined}
        />
      )}
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
  // TODO: Format services based on actual attributes structure
  const serviceAttributes = attributes.filter(attr => attr.name?.includes('service') || attr.name?.includes('サービス'));
  if (serviceAttributes.length === 0) return 'サービスが設定されていません';
  return serviceAttributes.map(attr => attr.name).filter(Boolean).join('、');
};

const formatServiceOptions = (attributes: GoogleLocationAttributesModel['attributes']): string => {
  if (!attributes || attributes.length === 0) return 'サービスオプションが設定されていません';
  // TODO: Format service options based on actual attributes structure
  const optionAttributes = attributes.filter(attr => attr.name?.includes('option') || attr.name?.includes('オプション'));
  if (optionAttributes.length === 0) return 'サービスオプションが設定されていません';
  return optionAttributes.map(attr => attr.name).filter(Boolean).join('、');
};

const formatServicesForModal = (attributes: GoogleLocationAttributesModel['attributes']): Service[] => {
  if (!attributes || attributes.length === 0) return [];
  // TODO: Convert attributes to Service[] format for modal
  return attributes.map((attr, index) => ({
    id: index.toString(),
    name: attr.name || '',
    isAvailable: Boolean(attr.values && attr.values.length > 0)
  }));
};

const formatServiceOptionsForModal = (attributes: GoogleLocationAttributesModel['attributes']): ServiceOption[] => {
  if (!attributes || attributes.length === 0) return [];
  // TODO: Convert attributes to ServiceOption[] format for modal
  return attributes.map((attr, index) => ({
    id: index.toString(),
    name: attr.name || '',
    isAvailable: Boolean(attr.values && attr.values.length > 0)
  }));
};
