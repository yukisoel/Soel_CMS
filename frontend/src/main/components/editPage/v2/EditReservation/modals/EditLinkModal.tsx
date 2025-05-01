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
  label: z.string().min(1, 'サービス名は必須です'),
  url: z.string().min(1, 'URLは必須です').url('有効なURLを入力してください'),
});

type FormData = z.infer<typeof schema>;

type EditLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  initialValues?: {
    label: string;
    url: string;
  };
};

export const EditLinkModal: React.FC<EditLinkModalProps> = ({
  isOpen,
  onClose,
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
  });

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        label: '',
        url: '',
      });
    }
  }, [isOpen, reset, initialValues]);

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem label="サービス名">
          <Input
            {...register('label')}
            placeholder="サービス名を入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.label && (
            <Typography content={errors.label.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>

        <LayoutLabeledFormItem label="URL">
          <Input
            {...register('url')}
            placeholder="URLを入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.url && (
            <Typography content={errors.url.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>

        <Wrapper justify="justify-between" gap="1rem">
          {onDelete && (
            <Button bgColor="secondary" onClick={onDelete}>
              <Typography content="削除" size="normal" color="error" />
            </Button>
          )}
          <Wrapper gap="1rem">
            <Button bgColor="secondary" onClick={onClose}>
              <Typography content="戻る" size="normal" color="primary" />
            </Button>
            <Button bgColor="primary" type="submit">
              <Typography content="保存" size="normal" color="primary" />
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
      headerContent="予約リンクを編集"
      contentRender={contentRender}
    />
  );
};
