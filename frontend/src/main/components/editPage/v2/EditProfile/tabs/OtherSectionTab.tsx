import { useState } from 'react';
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import Loading from "@/main/common/Loading";
import styles from "../EditProfileLayoutV2.module.scss";
import EditOtherModal from "../modals/EditOtherModal";
import EditServicesModal from '../modals/EditServicesModal';
import { GoogleLocationAttributesModel, GoogleLocationProfileModel, SERVICE_ATTRIBUTE_MAPPING } from "@/types/apiModel.ts";
import { GoogleLocationAttributeServiceType as ApiServiceType } from "@/types/api.ts";
import { GoogleService } from "@/main/service/GoogleService";
import { useModal } from "@/main/common/Modal/useModal";
import { useParams } from "react-router-dom";

type Service = {
  id: string;
  name: string;
  isAvailable: boolean;
};

type EditModalType = 'businessOwner' | 'serviceOption' | null;

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
  const [editModalType, setEditModalType] = useState<EditModalType>(null);
  const { isOpen: isServicesModalOpen, openModal: openServicesModal, closeModal: closeServicesModal } = useModal();

  const handleSave = async (value: string) => {
    if (!locationId) return false;
    try {
      // TODO: Implement API calls for updating business owner info and service options
      console.log('Saving:', editModalType, value);
      await fetchAttributes();
      setEditModalType(null);
      return true;
    } catch (error) {
      console.error('Failed to save:', error);
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
            onClick={() => setEditModalType('businessOwner')}
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
            onClick={() => setEditModalType('serviceOption')}
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
            editModalType === 'businessOwner' ? formatBusinessOwnerInfo(attributes) :
            formatServiceOptions(attributes?.attributes || [])
          }
          onSave={handleSave}
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
    </Wrapper>
  );
}

const formatBusinessOwnerInfo = (attributes: GoogleLocationAttributesModel | null): string => {
  if (!attributes) return 'ビジネス所有者情報が設定されていません';
  // TODO: Extract business owner info from attributes
  return 'ビジネス所有者情報が設定されていません';
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
