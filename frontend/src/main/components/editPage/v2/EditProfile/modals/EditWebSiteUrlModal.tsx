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
import { MAX_URL_LENGTH } from '@/main/constants/validation'

const schema = z.object({
  webSiteUri: z.string()
    .min(1, 'URLは必須です')
    .max(MAX_URL_LENGTH, `URLは${MAX_URL_LENGTH}文字以内で入力してください`)
    .url('正しいURL形式で入力してください')
})

type FormData = z.infer<typeof schema>;

type EditWebSiteUrlModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: {
    webSiteUri: string;
  };
};

export const EditWebSiteUrlModal: React.FC<EditWebSiteUrlModalProps> = ({
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

  const urlValue = watch('webSiteUri') || ''

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        webSiteUri: ''
      })
    }
  }, [isOpen, reset, initialValues])

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem
          label="ウェブサイトURL"
          counter={{
            current: urlValue.length,
            max: 200
          }}
        >
          <Input
            {...register('webSiteUri')}
            placeholder="ウェブサイトURLを入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.webSiteUri && (
            <Typography content={errors.webSiteUri.message || ''} size="xsmall" color="error" />
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
      headerContent="ウェブサイトURLを編集"
      contentRender={contentRender}
    />
  )
}
