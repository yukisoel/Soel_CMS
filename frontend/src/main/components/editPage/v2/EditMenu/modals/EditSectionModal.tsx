import React from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Input from '@/main/common/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem';

const schema = z.object({
  title: z.string().min(1, 'セクション名は必須です'),
});

type FormData = z.infer<typeof schema>;

type EditSectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export const EditSectionModal: React.FC<EditSectionModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    onClose();
  };

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem label="セクション名">
          <Input
            {...register('title')}
            placeholder="セクション名を入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.title && (
            <Typography content={errors.title.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>
        <Wrapper justify="justify-end" gap="1rem">
          <Button bgColor="secondary" onClick={onClose}>
            <Typography content="戻る" size="normal" color="primary" />
          </Button>
          <Button bgColor="primary" type="submit">
            <Typography content="追加する" size="normal" color="primary" />
          </Button>
        </Wrapper>
      </Wrapper>
    </form>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      headerContent={title}
      contentRender={contentRender}
    />
  );
};
