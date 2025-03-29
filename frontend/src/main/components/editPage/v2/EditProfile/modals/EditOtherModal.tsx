import { useState, useEffect } from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Input from '@/main/common/Input';
import Textarea from '@/main/common/Textarea';
import styles from '../EditProfileLayoutV2.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onSave: (value: string) => void;
  isTextarea?: boolean;
};

export default function EditOtherModal({
  isOpen,
  onClose,
  title,
  content,
  onSave,
  isTextarea = false,
}: Props) {
  const [value, setValue] = useState(content);

  useEffect(() => {
    if (isOpen) {
      setValue(content);
    }
  }, [isOpen, content]);

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  const renderContent = () => (
    <Wrapper direction="col" gap="2rem" padding="2rem">
      {isTextarea ? (
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={10}
          width="100%"
          padding="1rem"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          width="100%"
          padding="8px 16px"
        />
      )}
      <Wrapper justify="justify-end" gap="1rem">
        <Button
          bgColor="secondary"
          padding="0.5rem 1.8rem"
          onClick={onClose}
        >
          <Typography
            content="戻る"
            color="secondary"
            size="normal"
          />
        </Button>
        <Button
          bgColor="primary"
          padding="0.5rem 1.8rem"
          onClick={handleSave}
        >
          <Typography
            content="保存する"
            color="primary"
            size="normal"
          />
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
