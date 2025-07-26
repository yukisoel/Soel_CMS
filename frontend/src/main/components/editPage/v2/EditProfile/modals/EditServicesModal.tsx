import { useState, useEffect } from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import RadioButton from '@/main/common/RadioButton';
import styles from '../EditProfileLayoutV2.module.scss';
import { GoogleLocationAttributeServiceType } from '@/types/apiModel';

type Service = {
  id: string;
  name: string;
  isAvailable: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  onSave: (services: Service[]) => Promise<boolean>;
  error?: string;
};

// GoogleLocationAttributeServiceTypeのenumから初期値を生成
const createInitialServices = (): Service[] => {
  return Object.entries(GoogleLocationAttributeServiceType).map(([key, value]) => ({
    id: key,
    name: value,
    isAvailable: false
  }));
};

export default function EditServicesModal({
  isOpen,
  onClose,
  services,
  onSave,
  error
}: Props) {
  const [serviceList, setServiceList] = useState<Service[]>(createInitialServices());

  // 受け取った値で該当するkeyのstatusを上書き
  useEffect(() => {
    if (services && services.length > 0) {
      setServiceList(prevList => {
        const updatedList = [...prevList];
        services.forEach(receivedService => {
          const index = updatedList.findIndex(item => item.id === receivedService.id);
          if (index !== -1) {
            updatedList[index] = {
              ...updatedList[index],
              isAvailable: receivedService.isAvailable
            };
          }
        });
        return updatedList;
      });
    }
  }, [services]);

  const handleToggleService = (id: string, value: string) => {
    setServiceList(prev =>
      prev.map(service =>
        service.id === id
          ? { ...service, isAvailable: value === 'yes' }
          : service
      )
    );
  };

  const handleSave = async () => {
    const isValid = await onSave(serviceList);
    if (isValid) {
      onClose();
    }
  };

  const renderContent = () => (
    <Wrapper direction="col" gap="3rem">
      {/* サービス一覧 */}
      <Wrapper direction="col" gap="2rem">
        {serviceList.map((service) => (
          <div key={service.id} className={styles.service_item}>
            <Typography
              content={service.name}
              color="primary"
              size="normal"
              className={styles.service_name}
            />
            <div className={styles.radio_group}>
              <RadioButton
                label="はい"
                value="yes"
                name={`service-${service.id}`}
                checked={service.isAvailable}
                onChange={(value) => handleToggleService(service.id, value)}
              />
              <RadioButton
                label="いいえ"
                value="no"
                name={`service-${service.id}`}
                checked={!service.isAvailable}
                onChange={(value) => handleToggleService(service.id, value)}
              />
            </div>
          </div>
        ))}
      </Wrapper>

      {error && (
        <Typography
          content={error}
          color="error"
          size="small"
        />
      )}

      {/* アクションボタン */}
      <Wrapper gap="1rem" justify="justify-end">
        <Button
          bgColor="secondary"
          padding="0.5rem 1.8rem"
          onClick={onClose}
        >
          <Typography content="戻る" color="primary" size="normal" />
        </Button>
        <Button
          bgColor="primary"
          padding="0.5rem 1.8rem"
          onClick={handleSave}
        >
          <Typography content="保存する" color="primary" size="normal" />
        </Button>
      </Wrapper>
    </Wrapper>
  );

  return (
    <Modal
      headerContent="サービスを編集"
      isOpen={isOpen}
      onClose={onClose}
      contentRender={renderContent}
    />
  );
}
