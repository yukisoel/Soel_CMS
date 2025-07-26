import { useState, useEffect } from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import RadioButton from '@/main/common/RadioButton';
import styles from '../EditProfileLayoutV2.module.scss';
import { GoogleLocationAttributeServiceOptionType } from '@/types/apiModel';

type ServiceOption = {
  id: string;
  name: string;
  isAvailable: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  serviceOptions: ServiceOption[];
  onSave: (serviceOptions: ServiceOption[]) => Promise<boolean>;
  error?: string;
};

// GoogleLocationAttributeServiceOptionTypeのenumから初期値を生成
const createInitialServiceOptions = (): ServiceOption[] => {
  return Object.entries(GoogleLocationAttributeServiceOptionType).map(([key, value]) => ({
    id: key,
    name: value,
    isAvailable: false
  }));
};

export default function EditServiceOptionsModal({
  isOpen,
  onClose,
  serviceOptions,
  onSave,
  error
}: Props) {
  const [serviceOptionList, setServiceOptionList] = useState<ServiceOption[]>(createInitialServiceOptions());

  // 受け取った値で該当するkeyのstatusを上書き
  useEffect(() => {
    if (serviceOptions && serviceOptions.length > 0) {
      setServiceOptionList(prevList => {
        const updatedList = [...prevList];
        serviceOptions.forEach(receivedServiceOption => {
          const index = updatedList.findIndex(item => item.id === receivedServiceOption.id);
          if (index !== -1) {
            updatedList[index] = {
              ...updatedList[index],
              isAvailable: receivedServiceOption.isAvailable
            };
          }
        });
        return updatedList;
      });
    }
  }, [serviceOptions]);

  const handleToggleServiceOption = (id: string, value: string) => {
    setServiceOptionList(prev =>
      prev.map(serviceOption =>
        serviceOption.id === id
          ? { ...serviceOption, isAvailable: value === 'yes' }
          : serviceOption
      )
    );
  };

  const handleSave = async () => {
    const isValid = await onSave(serviceOptionList);
    if (isValid) {
      onClose();
    }
  };

  const renderContent = () => (
    <Wrapper direction="col" gap="3rem">
      {/* サービスオプション一覧 */}
      <Wrapper direction="col" gap="2rem">
        {serviceOptionList.map((serviceOption) => (
          <div key={serviceOption.id} className={styles.service_item}>
            <Typography
              content={serviceOption.name}
              color="primary"
              size="normal"
              className={styles.service_name}
            />
            <div className={styles.radio_group}>
              <RadioButton
                label="はい"
                value="yes"
                name={`service-option-${serviceOption.id}`}
                checked={serviceOption.isAvailable}
                onChange={(value) => handleToggleServiceOption(serviceOption.id, value)}
              />
              <RadioButton
                label="いいえ"
                value="no"
                name={`service-option-${serviceOption.id}`}
                checked={!serviceOption.isAvailable}
                onChange={(value) => handleToggleServiceOption(serviceOption.id, value)}
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
      headerContent="サービスオプションを編集"
      isOpen={isOpen}
      onClose={onClose}
      contentRender={renderContent}
    />
  );
}