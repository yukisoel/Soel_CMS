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
  name: z.string().min(1, 'アイテム名は必須です'),
  price: z.string().min(1, '価格は必須です'),
  category: z.string().min(1, 'カテゴリは必須です'),
  description: z.string().optional(),
  productUrl: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  initialValues?: {
    name: string;
    price: string;
    category: string;
    description?: string;
    productUrl?: string;
    imageUrl?: string;
  };
  mode: 'create' | 'edit';
};

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  initialValues,
  mode,
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
        name: '',
        price: '',
        category: '',
        description: '',
        productUrl: '',
      });
    }
  }, [isOpen, reset, initialValues]);

  const { render: renderFileUpload } = useFileUpload({
    size: 'regular',
    defaultImageUrl: initialValues?.imageUrl
  });

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem label="アイテム名">
          <Input
            {...register('name')}
            placeholder="アイテム名を入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.name && (
            <Typography content={errors.name.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>

        <LayoutLabeledFormItem label="価格設定">
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

        <LayoutLabeledFormItem label="カテゴリを選択または追加">
          <Input
            {...register('category')}
            placeholder="カテゴリを入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.category && (
            <Typography content={errors.category.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>

        <LayoutLabeledFormItem label="アイテムの説明">
          <Textarea
            {...register('description')}
            placeholder="説明を入力"
            height="120px"
            padding="0.7rem 1.5rem"
            width="100%"
          />
        </LayoutLabeledFormItem>

        <LayoutLabeledFormItem label="商品URL">
          <Input
            {...register('productUrl')}
            placeholder="商品URLを入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
        </LayoutLabeledFormItem>

        <Wrapper justify={mode === 'edit' ? 'justify-between' : 'justify-end'} gap="1rem">
          {mode === 'edit' && onDelete && (
            <Button bgColor="secondary" onClick={onDelete}>
              <Typography content="削除" size="normal" color="error" />
            </Button>
          )}
          <Wrapper gap="1rem">
            <Button bgColor="secondary" onClick={onClose}>
              <Typography content="戻る" size="normal" color="primary" />
            </Button>
            <Button bgColor="primary" type="submit">
              <Typography
                content={mode === 'create' ? '追加する' : '更新する'}
                size="normal"
                color="primary"
              />
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
      headerContent={mode === 'create' ? '商品を作成' : '商品を編集'}
      contentRender={contentRender}
    />
  );
};
