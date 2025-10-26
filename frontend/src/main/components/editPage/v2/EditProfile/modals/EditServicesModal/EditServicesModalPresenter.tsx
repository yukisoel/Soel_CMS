import styles from '../../EditProfileLayoutV2.module.scss'
import Modal from '@/main/common/Modal/Modal'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Button from '@/main/common/Button'
import RadioButton from '@/main/common/RadioButton'

type Service = {
  id: string;
  name: string;
  isAvailable: boolean | null;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  onToggleService: (id: string, value: string) => void;
  onSave: () => void;
  error?: string;
};

export default function EditServicesModalPresenter({
  isOpen,
  onClose,
  services,
  onToggleService,
  onSave,
  error
}: Props) {
  const renderContent = () => (
    <Wrapper direction="col" gap="3rem">
      <Wrapper direction="col" gap="2rem">
        {services.length === 0 ? (
          <Wrapper direction="col" gap="1rem" className={styles.empty_message}>
            <Typography
              content="この店舗では選択可能なサービスがありません。"
              color="secondary"
              size="normal"
            />
          </Wrapper>
        ) : (
          services.map((service) => (
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
                  checked={service.isAvailable === true}
                  onChange={(value) => onToggleService(service.id, value)}
                />
                <RadioButton
                  label="いいえ"
                  value="no"
                  name={`service-${service.id}`}
                  checked={service.isAvailable === false}
                  onChange={(value) => onToggleService(service.id, value)}
                />
                <RadioButton
                  label="未選択"
                  value="unselected"
                  name={`service-${service.id}`}
                  checked={service.isAvailable === null}
                  onChange={(value) => onToggleService(service.id, value)}
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
          disabled={services.length === 0}
        >
          <Typography content="保存する" color="primary" size="normal" />
        </Button>
      </Wrapper>
    </Wrapper>
  )

  return (
    <Modal
      headerContent="サービスを編集"
      isOpen={isOpen}
      onClose={onClose}
      contentRender={renderContent}
    />
  )
}