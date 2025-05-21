import React from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Textarea from '@/main/common/Textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem';

const schema = z.object({
  description: z.string()
    .min(1, '説明は必須です')
    .max(500, '説明は500文字以内で入力してください'),
});

type FormData = z.infer<typeof schema>;

type EditDescriptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: {
    description: string;
  };
};

export const EditDescriptionModal: React.FC<EditDescriptionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
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
  });

  const descriptionValue = watch('description') || '';

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        description: '',
      });
    }
  }, [isOpen, reset, initialValues]);

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem
          label="説明"
          counter={{
            current: descriptionValue.length,
            max: 500
          }}
        >
          <Textarea
            {...register('description')}
            placeholder="説明を入力"
            padding="0.7rem 1.5rem"
            width="100%"
            height="120px"
          />
          {errors.description && (
            <Typography content={errors.description.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>
        <Wrapper justify="justify-end" gap="1rem">
          <Wrapper gap="1rem">
            <Button bgColor="secondary" onClick={onClose}>
              <Typography content="戻る" size="normal" color="primary" />
            </Button>
            <Button bgColor="primary" type="submit">
              <Typography content="保存する" size="normal" color="primary" />
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
      headerContent="説明の編集"
      contentRender={contentRender}
    />
  );
};
