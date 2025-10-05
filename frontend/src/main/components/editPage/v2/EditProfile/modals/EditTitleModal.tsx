import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from '@/main/common/Modal/Modal'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Button from '@/main/common/Button'
import Input from '@/main/common/Input'
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem'
import { MAX_TITLE_LENGTH } from '@/main/constants/validation'

const schema = z.object({
  title: z.string()
    .min(1, 'タイトルは必須です')
    .max(MAX_TITLE_LENGTH, `タイトルは${MAX_TITLE_LENGTH}文字以内で入力してください`)
})

type FormData = z.infer<typeof schema>;

type EditTitleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: {
    title: string;
  };
};

export const EditTitleModal: React.FC<EditTitleModalProps> = ({
  isOpen,
  onClose,
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
    resolver: zodResolver(schema)
  })

  const titleValue = watch('title') || ''

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        title: ''
      })
    }
  }, [isOpen, reset, initialValues])

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem
          label="タイトル"
          counter={{
            current: titleValue.length,
            max: MAX_TITLE_LENGTH
          }}
        >
          <Input
            {...register('title')}
            placeholder="タイトルを入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.title && (
            <Typography content={errors.title.message || ''} size="xsmall" color="error" />
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
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      headerContent="ビジネス名を編集"
      contentRender={contentRender}
    />
  )
}

export default EditTitleModal
