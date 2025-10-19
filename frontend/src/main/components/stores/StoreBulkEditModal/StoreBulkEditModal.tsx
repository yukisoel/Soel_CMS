import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import styles from './StoreBulkEditModal.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Button from '@/main/common/Button'
import Typography from '@/main/common/Typography'
import { prefectures } from '@/main/utils/prefecture.ts'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext.tsx'

export type Brand = {
  id: string
  name: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  selectedStoreCount: number
  onUpdate: (brandName: string | null, prefecture: string) => void
}

const storeBulkEditSchema = z.object({
  prefecture: z.string().nullable(),
  brandName: z.string().nullable()
})

type StoreBulkEditFormData = z.infer<typeof storeBulkEditSchema>

export default function StoreBulkEditModal({ isOpen, onClose, selectedStoreCount, onUpdate }: Props) {
  const googleRepository = useGoogleRepository()
  const [brands, setBrands] = useState<Brand[]>([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<StoreBulkEditFormData>({
    resolver: zodResolver(storeBulkEditSchema),
    defaultValues: {
      prefecture: '',
      brandName: ''
    }
  })

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await googleRepository.getBrandList()
        const brandList = response.brands.map(brand => ({
          id: brand.brandId,
          name: brand.name
        }))
        setBrands(brandList)
      } catch (error) {
        console.error('Failed to fetch brands:', error)
      }
    }

    fetchBrands()
  }, [])

  useEffect(() => {
    if (isOpen) {
      reset({
        prefecture: '',
        brandName: ''
      })
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, reset])

  if (!isOpen) return null

  const onSubmit = (data: StoreBulkEditFormData) => {
    onUpdate(data.brandName || null, data.prefecture || '')
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <Wrapper className={styles.modal_overlay} onClick={handleOverlayClick}>
      <Wrapper direction="col" className={styles.modal_content}>
        <Wrapper justify="justify-between" align="align-center" className={styles.modal_header}>
          <Typography content={`${selectedStoreCount}件の店舗を一括編集`} size="medium" color="primary" />
          <button className={styles.close_button} onClick={onClose}>
            <Wrapper className={styles.close_icon}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 1L10 10M1 10L10 1" stroke="black" strokeWidth="2" />
              </svg>
            </Wrapper>
          </button>
        </Wrapper>

        <Wrapper className={styles.divider} />

        <Wrapper direction="col" gap="2rem" className={styles.form_container}>
          <Wrapper direction="col" gap="1rem">
            <Typography content="都道府県名" size="normal" weight="normal" color="primary" />
            <Wrapper className={styles.select_wrapper}>
              <select
                className={styles.select_input}
                {...register('prefecture')}
              >
                <option value="">変更しない</option>
                {prefectures.map((pref) => (
                  <option key={pref} value={pref}>
                    {pref}
                  </option>
                ))}
              </select>
              <Wrapper className={styles.select_arrow}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect width="12" height="12" fill="none" />
                  <path d="M2 4L6 8L10 4" stroke="#282828" strokeWidth="2" />
                </svg>
              </Wrapper>
            </Wrapper>
            {errors.prefecture && (
              <Typography content={errors.prefecture.message || ''} size="small" color="error" />
            )}
          </Wrapper>

          <Wrapper direction="col" gap="1rem">
            <Typography content="ブランド名" size="normal" weight="normal" color="primary" />
            <Wrapper className={styles.select_wrapper}>
              <select
                className={styles.select_input}
                {...register('brandName')}
              >
                <option value="">変更しない</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <Wrapper className={styles.select_arrow}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect width="12" height="12" fill="none" />
                  <path d="M2 4L6 8L10 4" stroke="#282828" strokeWidth="2" />
                </svg>
              </Wrapper>
            </Wrapper>
            {errors.brandName && (
              <Typography content={errors.brandName.message || ''} size="small" color="error" />
            )}
          </Wrapper>
        </Wrapper>

        <Wrapper direction="col" gap="1.5rem" align="align-center" className={styles.button_container}>
          <Button bgColor="primary" padding="0.7rem 4.2rem" onClick={handleSubmit(onSubmit)}>
            <Typography content="更新" size="normal" color="primary" />
          </Button>
          <Button bgColor="tertiary" padding="0.7rem 4.1rem" onClick={onClose} className={styles.back_button}>
            <Typography content="戻る" size="normal" color="primary" />
          </Button>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}
