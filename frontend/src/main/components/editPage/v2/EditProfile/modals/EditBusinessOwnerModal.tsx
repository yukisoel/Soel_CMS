import { useState, useEffect } from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import RadioButton from '@/main/common/RadioButton';
import styles from '../EditProfileLayoutV2.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isOwnedByWomen: boolean;
  onSave: (isOwnedByWomen: boolean) => Promise<boolean>;
  error?: string;
};

export default function EditBusinessOwnerModal({
  isOpen,
  onClose,
  isOwnedByWomen,
  onSave,
  error
}: Props) {
  const [ownedByWomen, setOwnedByWomen] = useState<boolean>(isOwnedByWomen);

  useEffect(() => {
    if (isOpen) {
      setOwnedByWomen(isOwnedByWomen);
    }
  }, [isOpen, isOwnedByWomen]);

  const handleChange = (value: string) => {
    setOwnedByWomen(value === 'yes');
  };

  const handleSave = async () => {
    const isValid = await onSave(ownedByWomen);
    if (isValid) {
      onClose();
    }
  };

  const renderContent = () => (
    <Wrapper direction="col" gap="3rem">
      {/* フォームフィールド */}
      <Wrapper direction="col" gap="2rem">
        {/* 女性が経営するビジネスかどうか */}
        <Wrapper direction="col" gap="1rem">
          <Typography
            content="このビジネスは女性によって経営されていますか？"
            color="primary"
            size="normal"
          />
          <div className={styles.radio_group}>
            <RadioButton
              label="はい"
              value="yes"
              name="ownedByWomen"
              checked={ownedByWomen}
              onChange={handleChange}
            />
            <RadioButton
              label="いいえ"
              value="no"
              name="ownedByWomen"
              checked={!ownedByWomen}
              onChange={handleChange}
            />
          </div>
        </Wrapper>
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
      headerContent="ビジネス所有者情報を編集"
      isOpen={isOpen}
      onClose={onClose}
      contentRender={renderContent}
    />
  );
}