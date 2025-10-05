import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from '@/main/common/Modal/Modal'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Button from '@/main/common/Button'
import Textarea from '@/main/common/Textarea'
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem'
import { MAX_SHORT_DESCRIPTION_LENGTH } from '@/main/constants/validation'

const schema = z.object({
  question: z.string()
    .min(1, '質問は必須です')
    .max(MAX_SHORT_DESCRIPTION_LENGTH, `質問は${MAX_SHORT_DESCRIPTION_LENGTH}文字以内で入力してください`)
})

type FormData = z.infer<typeof schema>;

type EditFaqModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: {
    question: string;
  };
};

const EditFaqModal: React.FC<EditFaqModalProps> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  initialValues
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  })

  const questionValue = watch('question') || ''

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        question: ''
      })
    }
  }, [isOpen, initialValues, reset])

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem
          label="質問"
          counter={{ current: questionValue.length, max: 500 }}
        >
          <Textarea
            {...register('question')}
            placeholder="質問を入力"
            height="120px"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.question && (
            <Typography content={errors.question.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>
        <Wrapper justify="justify-end" gap="1rem">
          <Button bgColor="secondary" onClick={onClose} type="button">
            <Typography content="戻る" size="normal" color="primary" />
          </Button>
          <Button bgColor="primary" type="submit">
            <Typography content="追加する" size="normal" color="primary" />
          </Button>
        </Wrapper>
      </Wrapper>
    </form>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      headerContent={title}
      contentRender={contentRender}
    />
  )
}

export default EditFaqModal
