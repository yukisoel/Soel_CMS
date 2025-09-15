import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import RadioButton from '@/main/common/RadioButton';
import styles from '../../EditProfileLayoutV2.module.scss';

type ServiceOption = {
  id: string;
  name: string;
  isAvailable: boolean | null;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  serviceOptions: ServiceOption[];
  onToggleServiceOption: (id: string, value: string) => void;
  onSave: () => void;
  error?: string;
};

export default function EditServiceOptionsModalPresenter({
  isOpen,
  onClose,
  serviceOptions,
  onToggleServiceOption,
  onSave,
  error
}: Props) {
  const renderContent = () => (
    <Wrapper direction="col" gap="3rem">
      <Wrapper direction="col" gap="2rem">
        {serviceOptions.length === 0 ? (
          <Wrapper direction="col" gap="1rem" className={styles.empty_message}>
            <Typography
              content="この店舗では選択可能なサービスオプションがありません。"
              color="secondary"
              size="normal"
            />
          </Wrapper>
        ) : (
          serviceOptions.map((serviceOption) => (
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
                  checked={serviceOption.isAvailable === true}
                  onChange={(value) => onToggleServiceOption(serviceOption.id, value)}
                />
                <RadioButton
                  label="いいえ"
                  value="no"
                  name={`service-option-${serviceOption.id}`}
                  checked={serviceOption.isAvailable === false}
                  onChange={(value) => onToggleServiceOption(serviceOption.id, value)}
                />
                <RadioButton
                  label="未選択"
                  value="unselected"
                  name={`service-option-${serviceOption.id}`}
                  checked={serviceOption.isAvailable === null}
                  onChange={(value) => onToggleServiceOption(serviceOption.id, value)}
                />
              </div>
            </div>
          ))
        )}
      </Wrapper>

      {error && (
        <Typography
          content={error}
          color="error"
          size="small"
        />
      )}

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
          onClick={onSave}
          disabled={serviceOptions.length === 0}
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