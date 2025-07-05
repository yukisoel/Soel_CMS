import React, { useState } from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Input from '@/main/common/Input';
import Textarea from '@/main/common/Textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem';
import { PhotoSelector } from '../components/PhotoSelector';
import { GoogleService } from '@/main/service/GoogleService';
import { GoogleLocationPhotoModel } from '@/main/model/LocationModel';

const schema = z.object({
  title: z.string()
    .min(1, 'メニュー名は必須です')
    .max(140, 'メニュー名は140文字以内で入力してください'),
  price: z.string().min(1, '価格は必須です'),
  description: z.string()
    .max(1000, '説明は1000文字以内で入力してください'),
});

type FormData = z.infer<typeof schema>;

type EditMenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: FormData & { selectedPhoto?: GoogleLocationPhotoModel }) => Promise<void>;
  onDelete?: () => Promise<void>;
  googleService: GoogleService;
  initialValues?: {
    title: string;
    price: string;
    description: string;
    selectedPhoto?: GoogleLocationPhotoModel;
  };
};

export const EditMenuModal: React.FC<EditMenuModalProps> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  onDelete,
  googleService,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const titleValue = watch('title') || '';
  const descriptionValue = watch('description') || '';
  const [selectedPhoto, setSelectedPhoto] = useState<GoogleLocationPhotoModel | undefined>(initialValues?.selectedPhoto);

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        title: '',
        price: '',
        description: '',
      });
      setSelectedPhoto(initialValues?.selectedPhoto);
    }
  }, [isOpen, initialValues, reset]);

  const handlePhotoSelect = (photo: GoogleLocationPhotoModel) => {
    setSelectedPhoto(photo);
  };

  const handleFormSubmit = (data: FormData) => {
    return onSubmit({ ...data, selectedPhoto });
  };

  const contentRender = () => (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem
          label="メニュー名"
          counter={{
            current: titleValue.length,
            max: 140
          }}
        >
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
        <LayoutLabeledFormItem label="写真を選択">
          <PhotoSelector
            googleService={googleService}
            onPhotoSelect={handlePhotoSelect}
            selectedPhoto={selectedPhoto}
          />
        </LayoutLabeledFormItem>
        <LayoutLabeledFormItem
          label="説明"
          counter={{
            current: descriptionValue.length,
            max: 1000
          }}
        >
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
            <Button bgColor="secondary" onClick={onDelete}>
              <Typography content="削除" size="normal" color="error" />
            </Button>
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
