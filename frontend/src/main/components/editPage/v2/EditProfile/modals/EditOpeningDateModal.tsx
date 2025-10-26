import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from '@/main/common/Modal/Modal'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Button from '@/main/common/Button'
import DatePicker from '@/main/common/DatePicker/DatePicker'
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem'

const schema = z.object({
  openingDate: z.date({ required_error: '開業日は必須です' }).nullable().refine(val => val !== null, '開業日は必須です')
})

type FormData = {
  openingDate: Date | null;
};

type EditOpeningDateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: {
    openingDate: Date | null;
  };
};

export const EditOpeningDateModal: React.FC<EditOpeningDateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues || { openingDate: null }
  })

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || { openingDate: null })
    }
  }, [isOpen, reset, initialValues])

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem label="開業日">
          <Controller
            name="openingDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                defaultValue={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.openingDate && (
            <Typography content={errors.openingDate.message || ''} size="xsmall" color="error" />
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
      headerContent="開業日を編集"
      contentRender={contentRender}
    />
  )
}
