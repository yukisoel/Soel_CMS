import { useState, useEffect } from 'react'
import styles from './BrandManagementModal.module.scss'
import Modal from '@/main/common/Modal/Modal.tsx'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import SearchBox from '@/main/common/SearchBox'
import BrandDeleteConfirmModal from '@/main/components/brands/BrandDeleteConfirmModal/BrandDeleteConfirmModal.tsx'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext.tsx'

type Brand = {
  id: string
  name: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function BrandManagementModal({ isOpen, onClose }: Props) {
  const googleRepository = useGoogleRepository()
  const [brands, setBrands] = useState<Brand[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [newBrandName, setNewBrandName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null)

  useEffect(() => {
    if (isOpen) {
      fetchBrands()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const fetchBrands = async () => {
    try {
      setIsLoading(true)
      const response = await googleRepository.getBrandList()
      const brandList = response.brands.map(brand => ({
        id: brand.brandId,
        name: brand.name
      }))
      setBrands(brandList)
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddBrand = async () => {
    if (!newBrandName.trim()) {
      alert('ブランド名を入力してください')
      return
    }

    try {
      await googleRepository.createBrand(newBrandName.trim())
      setNewBrandName('')
      await fetchBrands()
      alert('ブランドを追加しました')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'ブランドの追加に失敗しました')
      console.error('Failed to add brand:', error)
    }
  }

  const handleDeleteClick = (brand: Brand) => {
    setBrandToDelete(brand)
    setIsDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!brandToDelete) return

    try {
      await googleRepository.deleteBrand(brandToDelete.id)
      setIsDeleteConfirmOpen(false)
      setBrandToDelete(null)
      await fetchBrands()
      alert('ブランドを削除しました')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'ブランドの削除に失敗しました')
      console.error('Failed to delete brand:', error)
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteConfirmOpen(false)
    setBrandToDelete(null)
  }

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  const renderContent = () => (
    <>
      <Wrapper direction="col" gap="2rem" className={styles.content}>
        <SearchBox
          placeholder="ブランド名を検索"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          width="100%"
        />

        <Wrapper direction="col" gap="1rem">
          <Typography content="ブランド追加" size="medium" weight="normal" color="primary" />
          <Wrapper className={styles.add_brand_container}>
            <input
              type="text"
              className={styles.add_brand_input}
              placeholder="ブランド名を入力"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddBrand()}
            />
            <button className={styles.add_button} onClick={handleAddBrand}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <line x1="7.5" y1="0" x2="7.5" y2="15" stroke="#D69507" strokeWidth="2" />
                <line x1="0" y1="7.5" x2="15" y2="7.5" stroke="#D69507" strokeWidth="2" />
              </svg>
            </button>
          </Wrapper>
        </Wrapper>

        <Wrapper direction="col" gap="1rem" className={styles.brand_list_section}>
          <Typography content="登録済みブランド" size="medium" weight="normal" color="primary" />
          {isLoading ? (
            <Typography content="読み込み中..." size="normal" color="secondary" />
          ) : (
            <Wrapper direction="col" gap="1rem" className={styles.brand_list}>
              {filteredBrands.length === 0 ? (
                <Typography content="ブランドがありません" size="normal" color="secondary" />
              ) : (
                filteredBrands.map((brand) => (
                  <Wrapper key={brand.id} className={styles.brand_item}>
                    <Typography content={brand.name} size="normal" color="secondary" />
                    <button
                      className={styles.delete_button}
                      onClick={() => handleDeleteClick(brand)}
                    >
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M1 1L10 10M1 10L10 1" stroke="#747474" strokeWidth="2" />
                      </svg>
                    </button>
                  </Wrapper>
                ))
              )}
            </Wrapper>
          )}
        </Wrapper>
      </Wrapper>

      <BrandDeleteConfirmModal
        isOpen={isDeleteConfirmOpen}
        brandName={brandToDelete?.name || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )

  return (
    <Modal
      headerContent="ブランドの管理"
      contentRender={renderContent}
      isOpen={isOpen}
      onClose={onClose}
    />
  )
}
