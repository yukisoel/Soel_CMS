import React from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Input from '@/main/common/Input';
import styles from '../EditProfileLayoutV2.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onSave: (value: string) => void;
};

export default function EditOtherModal({
  isOpen,
  onClose,
  title,
  content,
  onSave,
}: Props) {
  const [value, setValue] = React.useState(content);

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  const renderContent = () => (
    <Wrapper direction="col" gap="3rem">
      <Wrapper direction="col" gap="1rem">
        <Typography content={title} color="primary" size="normal" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="アイテム名を入力"
          padding="8px 16px"
          width="100%"
        />
      </Wrapper>
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
      headerContent={`${title}を編集`}
      isOpen={isOpen}
      onClose={onClose}
      contentRender={renderContent}
    />
  );
}
