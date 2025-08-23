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

const schema = z.object({
  menuLink: z.string()
    .min(1, 'メニューリンクは必須です')
    .max(200, 'メニューリンクは200文字以内で入力してください')
    .url('正しいURL形式で入力してください')
})

type FormData = z.infer<typeof schema>;

type EditMenuLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: {
    menuLink: string;
  };
};

export const EditMenuLinkModal: React.FC<EditMenuLinkModalProps> = ({
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

  const linkValue = watch('menuLink') || ''

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        menuLink: ''
      })
    }
  }, [isOpen, reset, initialValues])

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem
          label="メニューリンク"
          counter={{
            current: linkValue.length,
            max: 200
          }}
        >
          <Input
            {...register('menuLink')}
            placeholder="メニューリンクを入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.menuLink && (
            <Typography content={errors.menuLink.message || ''} size="xsmall" color="error" />
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
      headerContent="メニューリンクを編集"
      contentRender={contentRender}
    />
  )
}
