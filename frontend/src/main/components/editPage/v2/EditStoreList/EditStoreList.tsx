import { useState, useEffect } from 'react'
import styles from './EditStoreList.module.scss'
import AdvancedSidebarMenu from '@/main/common/AdvancedSidebarMenu.tsx'
import SearchBox from '@/main/common/SearchBox.tsx'
import Button from '@/main/common/Button.tsx'
import Wrapper from '@/main/common/Wrapper.tsx'
import Typography from '@/main/common/Typography.tsx'
import StoreEditModal from '@/main/components/stores/StoreEditModal/StoreEditModal.tsx'
import StoreBulkEditModal from '@/main/components/stores/StoreBulkEditModal/StoreBulkEditModal.tsx'
import BrandManagementModal from '@/main/components/brands/BrandManagementModal/BrandManagementModal.tsx'
import Loading from '@/main/common/Loading.tsx'
import { StoreResponse } from '@/types/apiModel.ts'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext.tsx'

export type Store = {
  id: string
  name: string
  prefecture: string
  brandName: string | null
}

export default function EditStoreList() {
  const googleRepository = useGoogleRepository()
  const [storeSearchValue, setStoreSearchValue] = useState('')
  const [prefectureSearchValue, setPrefectureSearchValue] = useState('')
  const [stores, setStores] = useState<Store[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isBulkEditMode, setIsBulkEditMode] = useState(false)
  const [selectedStoreIds, setSelectedStoreIds] = useState<string[]>([])
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false)
  const [isBrandManagementModalOpen, setIsBrandManagementModalOpen] = useState(false)

  useEffect(() => {
    fetchStores()
  }, [])

  const convertApiResponseToStore = (apiStore: StoreResponse): Store => {
    return {
      id: apiStore.storeId,
      name: apiStore.name,
      prefecture: apiStore.prefectureJapaneseName || '都道府県 未割り当て',
      brandName: apiStore.brandId || null
    }
  }

  const fetchStores = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await googleRepository.getStoreList()
      setStores(response.stores.map(apiStore => convertApiResponseToStore(apiStore)))
    } catch (err) {
      setError(err instanceof Error ? err.message : '店舗一覧の取得に失敗しました')
      console.error('Failed to fetch stores:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditClick = (store: Store) => {
    setSelectedStore(store)
    setIsModalOpen(true)
  }

  const handleUpdateStore = async (storeId: string, brandName: string | null, prefecture: string) => {
    try {
      const updatedStoreResponse = await googleRepository.updateStore(storeId, prefecture, brandName)
      const updatedStore = convertApiResponseToStore(updatedStoreResponse)
      setStores(stores.map(store =>
        store.id === storeId ? updatedStore : store
      ))
    } catch (err) {
      alert(err instanceof Error ? err.message : '店舗情報の更新に失敗しました')
      console.error('Failed to update store:', err)
    }
  }

  const handleBulkEditModeToggle = () => {
    setIsBulkEditMode(!isBulkEditMode)
    setSelectedStoreIds([])
  }

  const handleStoreCheckboxChange = (storeId: string) => {
    setSelectedStoreIds(prev =>
      prev.includes(storeId)
        ? prev.filter(id => id !== storeId)
        : [...prev, storeId]
    )
  }

  const handleBulkEditClick = () => {
    if (selectedStoreIds.length === 0) {
      alert('編集する店舗を選択してください')
      return
    }
    setIsBulkEditModalOpen(true)
  }

  const handleBulkUpdate = async (brandName: string | null, prefecture: string) => {
    try {
      // 選択された各店舗を更新
      await Promise.all(
        selectedStoreIds.map(storeId =>
          googleRepository.updateStore(storeId, prefecture, brandName)
        )
      )

      // 成功したら店舗一覧を再取得
      await fetchStores()
      alert(`${selectedStoreIds.length}件の店舗を更新しました`)
    } catch (err) {
      alert(err instanceof Error ? err.message : '一括更新に失敗しました')
      console.error('Failed to bulk update stores:', err)
    } finally {
      setIsBulkEditModalOpen(false)
      setIsBulkEditMode(false)
      setSelectedStoreIds([])
    }
  }

  if (isLoading) {
    return (
      <Wrapper className={styles.page_container}>
        <AdvancedSidebarMenu />
        <Wrapper direction="col" className={styles.main_container} align="align-center" justify="justify-center">
          <Loading />
        </Wrapper>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper className={styles.page_container}>
        <AdvancedSidebarMenu />
        <Wrapper direction="col" className={styles.main_container} align="align-center" justify="justify-center">
          <Wrapper direction="col" gap="2rem" align="align-center">
            <p className={styles.error_message}>{error}</p>
            <Button bgColor="primary" padding="1rem 2rem" onClick={fetchStores}>
              <Typography content="再読み込み" color="primary" size="medium" weight="normal" />
            </Button>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    )
  }

  return (
    <Wrapper className={styles.page_container}>
      <AdvancedSidebarMenu />
      <Wrapper direction="col" className={styles.main_container}>
        <h1 className={styles.page_title}>登録店舗 一覧</h1>

        <Wrapper justify="justify-between" align="align-center" className={styles.search_and_action_container}>
          <Wrapper gap="2rem" className={styles.search_boxes}>
            <SearchBox
              placeholder="店舗名を検索"
              value={storeSearchValue}
              onChange={(e) => setStoreSearchValue(e.target.value)}
              width="427px"
            />
            <SearchBox
              placeholder="都道府県を検索"
              value={prefectureSearchValue}
              onChange={(e) => setPrefectureSearchValue(e.target.value)}
              width="427px"
            />
          </Wrapper>

          <Wrapper gap="2rem" className={styles.action_buttons}>
            {isBulkEditMode ? (
              <>
                <Button bgColor="tertiary" padding="0.7rem 1rem" onClick={handleBulkEditModeToggle}>
                  <Typography content="キャンセル" color="secondary" size="normal" />
                </Button>
                <Button bgColor="primary" padding="0.7rem 1rem" onClick={handleBulkEditClick}>
                  <Typography content="選択中の項目を編集" color="primary" size="normal" />
                </Button>
              </>
            ) : (
              <>
                <Button bgColor="primary" padding="0.7rem 1rem" onClick={handleBulkEditModeToggle}>
                  <Typography content="複数店舗を編集" color="primary" size="normal" />
                </Button>
                <Button bgColor="primary" padding="0.7rem 1rem" onClick={() => setIsBrandManagementModalOpen(true)}>
                  <Typography content="ブランドの管理" color="primary" size="normal" />
                </Button>
              </>
            )}
          </Wrapper>
        </Wrapper>

        <Wrapper className={styles.divider} />

        <Wrapper direction="col" gap="1rem" className={styles.store_list}>
          {stores.map((store) => (
            <Wrapper key={store.id} gap="1rem" align="align-center">
              {isBulkEditMode && (
                <Wrapper className={styles.checkbox_wrapper}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedStoreIds.includes(store.id)}
                    onChange={() => handleStoreCheckboxChange(store.id)}
                  />
                </Wrapper>
              )}
              <Wrapper className={selectedStoreIds.includes(store.id) ? styles.store_card_selected : styles.store_card}>
                <Wrapper align="align-center" gap="2rem" className={styles.store_info}>
                  <Wrapper key={`name-${store.id}`} className={styles.store_name}>
                    {store.name}
                  </Wrapper>
                  <Wrapper key={`divider1-${store.id}`} className={styles.vertical_divider} />
                  <Wrapper
                    key={`prefecture-${store.id}`}
                    className={
                      store.prefecture === '都道府県 未割り当て' ? styles.prefecture_unassigned : styles.prefecture
                    }
                  >
                    {store.prefecture}
                  </Wrapper>
                  <Wrapper key={`divider2-${store.id}`} className={styles.vertical_divider} />
                  <Wrapper
                    key={`brand-${store.id}`}
                    className={
                      store.brandName ? styles.brand_name : styles.brand_name_unassigned
                    }
                  >
                    {store.brandName || 'ブランド名 未割り当て'}
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              {!isBulkEditMode && (
                <Button
                  bgColor="primary"
                  padding="0.2rem 0.9rem"
                  className={styles.edit_button}
                  onClick={() => handleEditClick(store)}
                >
                  <Typography content="編集" color="primary" size="normal" weight="normal" />
                </Button>
              )}
            </Wrapper>
          ))}
        </Wrapper>
      </Wrapper>

      <StoreEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        store={selectedStore}
        onUpdate={handleUpdateStore}
      />

      <StoreBulkEditModal
        isOpen={isBulkEditModalOpen}
        onClose={() => setIsBulkEditModalOpen(false)}
        selectedStoreCount={selectedStoreIds.length}
        onUpdate={handleBulkUpdate}
      />

      <BrandManagementModal
        isOpen={isBrandManagementModalOpen}
        onClose={() => setIsBrandManagementModalOpen(false)}
      />
    </Wrapper>
  )
}
