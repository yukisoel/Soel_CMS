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
import { GoogleLocationStoreFrontAddressRequestAdministrativeArea } from '@/types/api.ts'
import PhotoPullDownMenu from '@/main/components/editPage/PhotoPullDownMenu'

const PREFECTURES = Object.keys(GoogleLocationStoreFrontAddressRequestAdministrativeArea) as Array<keyof typeof GoogleLocationStoreFrontAddressRequestAdministrativeArea>

const schema = z.object({
  postalCode: z.string()
    .min(1, '郵便番号は必須です')
    .max(10, '郵便番号は10文字以内で入力してください')
    .regex(/^\d{3}-?\d{4}$/,'正しい郵便番号形式で入力してください'),
  prefecture: z.string().min(1, '都道府県は必須です'),
  address: z.string().min(1, '住所は必須です').max(200, '住所は200文字以内で入力してください')
})

type FormData = z.infer<typeof schema>;

type EditStorefrontAddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: {
    postalCode: string;
    prefecture: string;
    address: string;
  };
};

export const EditStorefrontAddressModal: React.FC<EditStorefrontAddressModalProps> = ({
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
    watch,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const postalCodeValue = watch('postalCode') || ''
  const addressValue = watch('address') || ''
  const prefectureValue = watch('prefecture') || ''

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        postalCode: '',
        prefecture: '',
        address: ''
      })
    }
  }, [isOpen, reset, initialValues])

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem
          label="郵便番号"
          counter={{ current: postalCodeValue.length, max: 10 }}
        >
          <Input
            {...register('postalCode')}
            placeholder="例: 123-4567"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.postalCode && (
            <Typography content={errors.postalCode.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>
        <LayoutLabeledFormItem label="都道府県">
          <PhotoPullDownMenu
            placeholder="都道府県を選択"
            selectedContent={prefectureValue}
            setSelectedContent={(value: string) => setValue('prefecture', value)}
            options={PREFECTURES}
          />
          {errors.prefecture && (
            <Typography content={errors.prefecture.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>
        <LayoutLabeledFormItem
          label="住所"
          counter={{ current: addressValue.length, max: 200 }}
        >
          <Input
            {...register('address')}
            placeholder="市区町村・番地・建物名など"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.address && (
            <Typography content={errors.address.message || ''} size="xsmall" color="error" />
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
      headerContent="店舗住所を編集"
      contentRender={contentRender}
    />
  )
}
