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
  answer: z.string()
    .min(1, '回答は必須です')
    .max(1000, '回答は1000文字以内で入力してください'),
});

type FormData = z.infer<typeof schema>;

type EditAnswerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: {
    answer: string;
  };
};

const EditAnswerModal: React.FC<EditAnswerModalProps> = ({
  isOpen,
  onClose,
  title,
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
    defaultValues: initialValues,
  });

  const answerValue = watch('answer') || '';

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        answer: '',
      });
    }
  }, [isOpen, initialValues, reset]);

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem
          label="回答"
          counter={{ current: answerValue.length, max: 1000 }}
        >
          <Textarea
            {...register('answer')}
            placeholder="回答を入力"
            height="200px"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.answer && (
            <Typography content={errors.answer.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>
        <Wrapper justify="justify-end" gap="1rem">
          <Button bgColor="secondary" onClick={onClose} type="button">
            <Typography content="戻る" size="normal" color="primary" />
          </Button>
          <Button bgColor="primary" type="submit">
            <Typography content="保存する" size="normal" color="primary" />
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

export default EditAnswerModal;
