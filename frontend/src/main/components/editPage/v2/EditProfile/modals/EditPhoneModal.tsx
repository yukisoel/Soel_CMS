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
import { MAX_PHONE_LENGTH } from '@/main/constants/validation'

const schema = z.object({
  phone: z.string()
    .min(1, '電話番号は必須です')
    .max(MAX_PHONE_LENGTH, `電話番号は${MAX_PHONE_LENGTH}文字以内で入力してください`)
    .regex(/^[0-9-]+$/, '数字とハイフンのみ入力できます')
})

type FormData = z.infer<typeof schema>;

type EditPhoneModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: {
    phone: string;
  };
};

export const EditPhoneModal: React.FC<EditPhoneModalProps> = ({
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

  const phoneValue = watch('phone') || ''

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        phone: ''
      })
    }
  }, [isOpen, reset, initialValues])

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem
          label="電話番号"
          counter={{
            current: phoneValue.length,
            max: 20
          }}
        >
          <Input
            {...register('phone')}
            placeholder="電話番号を入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.phone && (
            <Typography content={errors.phone.message || ''} size="xsmall" color="error" />
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
      headerContent="電話番号を編集"
      contentRender={contentRender}
    />
  )
}
