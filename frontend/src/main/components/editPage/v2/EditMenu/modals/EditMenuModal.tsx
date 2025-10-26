import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PhotoSelector } from '../components/PhotoSelector'
import styles from './EditMenuModal.module.scss'
import Modal from '@/main/common/Modal/Modal'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Button from '@/main/common/Button'
import Input from '@/main/common/Input'
import Textarea from '@/main/common/Textarea'
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem'
import { GoogleLocationPhotoModel } from '@/main/model/LocationModel'
import { MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH } from '@/main/constants/validation'

const schema = z.object({
  title: z.string()
    .min(1, 'メニュー名は必須です')
    .max(MAX_TITLE_LENGTH, `メニュー名は${MAX_TITLE_LENGTH}文字以内で入力してください`),
  price: z.string().min(1, '価格は必須です'),
  description: z.string()
    .max(MAX_DESCRIPTION_LENGTH, `説明は${MAX_DESCRIPTION_LENGTH}文字以内で入力してください`)
})

type FormData = z.infer<typeof schema>;

type EditMenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: FormData & { selectedPhoto?: GoogleLocationPhotoModel }) => Promise<void>;
  onDelete?: () => Promise<void>;
  initialValues?: {
    title: string;
    price: string;
    description: string;
    selectedPhoto?: GoogleLocationPhotoModel;
  };
};

export const EditMenuModal: React.FC<EditMenuModalProps> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  onDelete,
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

  const titleValue = watch('title') || ''
  const descriptionValue = watch('description') || ''
  const [selectedPhoto, setSelectedPhoto] = useState<GoogleLocationPhotoModel | undefined>(initialValues?.selectedPhoto)
  const [showPhotoSelector, setShowPhotoSelector] = useState(false)

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        title: '',
        price: '',
        description: ''
      })
      setSelectedPhoto(initialValues?.selectedPhoto)
      setShowPhotoSelector(false)
    }
  }, [isOpen, initialValues, reset])

  const handlePhotoSelect = (photo: GoogleLocationPhotoModel) => {
    setSelectedPhoto(photo)
    setShowPhotoSelector(false)
  }

  // 既存の写真がある場合のプレビューURL取得
  const getPhotoUrl = (photo: GoogleLocationPhotoModel | undefined) => {
    if (!photo) return null

    // mediaKeyがある場合はGoogle CDNから取得
    if (photo.name && photo.name.includes('media/')) {
      const mediaKey = photo.name.split('media/')[1]
      return `https://lh3.googleusercontent.com/p/${mediaKey}=s0`
    }

    // それ以外は通常のURL
    return photo.googleUrl || photo.thumbnailUrl
  }

  const handleFormSubmit = (data: FormData) => {
    return onSubmit({ ...data, selectedPhoto })
  }

  const contentRender = () => (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem
          label="メニュー名"
          counter={{
            current: titleValue.length,
            max: 140
          }}
        >
          <Input
            {...register('title')}
            placeholder="メニュー名を入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.title && (
            <Typography content={errors.title.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>
        <LayoutLabeledFormItem label="価格">
          <Input
            {...register('price')}
            placeholder="価格を入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.price && (
            <Typography content={errors.price.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>
        <LayoutLabeledFormItem label="写真を選択">
          {selectedPhoto && !showPhotoSelector ? (
            <Wrapper direction="col" gap="1rem">
              <Wrapper className={styles.previewContainer}>
                <img
                  src={getPhotoUrl(selectedPhoto) || ''}
                  alt="選択された写真"
                  className={styles.previewImage}
                />
              </Wrapper>
              <Wrapper justify="justify-center">
                <Button
                  bgColor="secondary"
                  padding="0.5rem 1.5rem"
                  onClick={() => setShowPhotoSelector(true)}
                  type="button"
                >
                  <Typography content="写真を変更" size="small" color="primary" />
                </Button>
              </Wrapper>
            </Wrapper>
          ) : (
            <PhotoSelector
              onPhotoSelect={handlePhotoSelect}
              selectedPhoto={selectedPhoto}
            />
          )}
        </LayoutLabeledFormItem>
        <LayoutLabeledFormItem
          label="説明"
          counter={{
            current: descriptionValue.length,
            max: 1000
          }}
        >
          <Textarea
            {...register('description')}
            placeholder="説明を入力"
            height="200px"
            padding="0.7rem 1.5rem"
            width="100%"
          />
        </LayoutLabeledFormItem>
        <Wrapper justify="justify-between" gap="1rem">
          {onDelete ? (
            <Button bgColor="secondary" onClick={onDelete}>
              <Typography content="削除" size="normal" color="error" />
            </Button>
          ) : (
            <Wrapper></Wrapper>
          )}
          <Wrapper gap="1rem">
            <Button bgColor="secondary" onClick={onClose}>
              <Typography content="戻る" size="normal" color="primary" />
            </Button>
            <Button bgColor="primary" type="submit">
              <Typography content="追加する" size="normal" color="primary" />
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
      headerContent={title}
      contentRender={contentRender}
    />
  )
}
