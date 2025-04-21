import React from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Input from '@/main/common/Input';
import Textarea from '@/main/common/Textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useFileUpload from '@/main/common/FileUpload/useFileUpload';
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem';

const schema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  price: z.string().min(1, '価格は必須です'),
  description: z.string().min(1, '説明は必須です'),
});

type FormData = z.infer<typeof schema>;

type EditMenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export const EditMenuModal: React.FC<EditMenuModalProps> = ({
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

  const { render: renderFileUpload, uploadedPhotoFileList } = useFileUpload({ size: 'regular' });

  const onSubmit = (data: FormData) => {
    console.log(data, uploadedPhotoFileList);
    onClose();
  };

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <Wrapper direction="col" gap="2rem">
            <LayoutLabeledFormItem label="アイテム名">
                <Input
                {...register('title')}
                placeholder="アイテム名を入力"
                padding="0.7rem 1.5rem"
                width="100%"
                />
                {errors.title && (
                <Typography content={errors.title.message || ''} size="xsmall" color="error" />
                )}
            </LayoutLabeledFormItem>
            <LayoutLabeledFormItem label="価格設定">
                <Input
                {...register('price')}
                placeholder="アイテムの価格（円）を入力"
                type="number"
                padding="0.7rem 1.5rem"
                width="100%"
                />
                {errors.price && (
                <Typography content={errors.price.message || ''} size="xsmall" color="error" />
                )}
            </LayoutLabeledFormItem>
        </Wrapper>
        <LayoutLabeledFormItem label="写真を追加">
          {renderFileUpload()}
        </LayoutLabeledFormItem>
        <LayoutLabeledFormItem label="アイテムの説明">
          <Textarea
            {...register('description')}
            placeholder="説明を入力"
          />
          {errors.description && (
            <Typography content={errors.description.message || ''} size="xsmall" color="error" />
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
