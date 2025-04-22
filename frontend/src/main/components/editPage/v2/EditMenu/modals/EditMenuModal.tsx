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
  title: z.string().min(1, 'メニュー名は必須です'),
  price: z.string().min(1, '価格は必須です'),
  description: z.string(),
});

type FormData = z.infer<typeof schema>;

type EditMenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: FormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  initialValues?: {
    title: string;
    price: string;
    description: string;
  };
};

export const EditMenuModal: React.FC<EditMenuModalProps> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  onDelete,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        title: '',
        price: '',
        description: '',
      });
    }
  }, [isOpen, initialValues, reset]);

  const { render: renderFileUpload, uploadedPhotoFileList } = useFileUpload({ size: 'regular' });

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem label="メニュー名">
          <Input
            {...register('title')}
            placeholder="メニュー名を入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.title && (
            <Typography content={errors.title.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>
        <LayoutLabeledFormItem label="価格">
          <Input
            {...register('price')}
            placeholder="価格を入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.price && (
            <Typography content={errors.price.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>
        <LayoutLabeledFormItem label="写真を追加">
          {renderFileUpload()}
        </LayoutLabeledFormItem>
        <LayoutLabeledFormItem label="説明">
          <Textarea
            {...register('description')}
            placeholder="説明を入力"
            height="200px"
            padding="0.7rem 1.5rem"
            width="100%"
          />
        </LayoutLabeledFormItem>
        <Wrapper justify="justify-between" gap="1rem">
          {onDelete ? (
            <Wrapper></Wrapper>
            // 一旦削除はWIP
            // <Button bgColor="secondary" onClick={onDelete}>
            //   <Typography content="削除" size="normal" color="error" />
            // </Button>
          ) : (
            <Wrapper></Wrapper>
          )}
          <Wrapper gap="1rem">
            <Button bgColor="secondary" onClick={onClose}>
              <Typography content="戻る" size="normal" color="primary" />
            </Button>
            <Button bgColor="primary" type="submit">
              <Typography content="追加する" size="normal" color="primary" />
            </Button>
          </Wrapper>
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
