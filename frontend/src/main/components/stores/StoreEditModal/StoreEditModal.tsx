import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import styles from './StoreEditModal.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Button from '@/main/common/Button'
import Typography from '@/main/common/Typography'
import { prefectures } from '@/main/utils/prefecture.ts'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext.tsx'

export type Brand = {
  id: string
  name: string
}

type Store = {
  id: string
  name: string
  prefecture: string
  brandId: string | null
  brandName: string | null
}

type Props = {
  isOpen: boolean
  onClose: () => void
  store: Store | null
  onUpdate: (storeId: string, brandId: string | null, prefecture: string) => void
}

const storeEditSchema = z.object({
  prefecture: z.string().min(1, '都道府県を選択してください'),
  brandId: z.string().nullable()
})

type StoreEditFormData = z.infer<typeof storeEditSchema>

export default function StoreEditModal({ isOpen, onClose, store, onUpdate }: Props) {
  const googleRepository = useGoogleRepository()
  const [brands, setBrands] = useState<Brand[]>([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<StoreEditFormData>({
    resolver: zodResolver(storeEditSchema)
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
    if (store) {
      reset({
        prefecture: store.prefecture,
        brandId: store.brandId || ''
      })
    }
  }, [store, reset])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen || !store) return null

  const onSubmit = (data: StoreEditFormData) => {
    onUpdate(store.id, data.brandId || null, data.prefecture)
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
          <Typography content="ブランド名の割り当て" size="medium" color="primary" />
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
            <Typography content="店舗名" size="normal" weight="normal" color="primary" />
            <Wrapper className={styles.input_readonly}>
              <Typography content={store.name} size="normal" color="secondary" />
            </Wrapper>
          </Wrapper>

          <Wrapper direction="col" gap="1rem">
            <Typography content="都道府県名" size="normal" weight="normal" color="primary" />
            <Wrapper className={styles.select_wrapper}>
              <select
                className={styles.select_input}
                {...register('prefecture')}
              >
                <option value="">都道府県を選択</option>
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
                {...register('brandId')}
              >
                <option value="">ブランド名を選択</option>
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
            {errors.brandId && (
              <Typography content={errors.brandId.message || ''} size="small" color="error" />
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
