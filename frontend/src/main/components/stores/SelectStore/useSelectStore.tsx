import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import SelectStore, { Branch, Region, Store, Prefecture } from './SelectStore'
import { initializeRegionMapForStores, regionOrder, getBrandMapByPrefecture } from '@/main/utils/prefectureToRegion'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext'

type Props = {
    onNextClick: () => void
    onBackClick: () => void
}

// Default data
const defaultBrandSelectorProps: Store[] = []
const defaultAreaSelectorProps: Region[] = []

export const useSelectStore = ({ onNextClick, onBackClick }: Props) => {
  const googleRepository = useGoogleRepository()
  const [selectedBranches, setSelectedBranches] = useState<Array<Omit<Branch, 'checked'>>>([])
  const [brandSelectorProps, setBrandSelectorProps] = useState<Store[]>(defaultBrandSelectorProps)
  const [areaSelectorProps, setAreaSelectorProps] = useState<Region[]>(defaultAreaSelectorProps)
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'brand'

  useEffect(() => {
    // Brand data fetching function
    const fetchBrandData = async () => {
      try {
        const response = await googleRepository.getBrandList()

        const transformedData: Store[] = response.brands.map(brand => ({
          name: brand.name || '不明',
          branches: brand.stores.map(store => ({
            id: store.storeId,
            name: store.name,
            checked: false
          })),
          checked: false
        }))

        setBrandSelectorProps(transformedData)
      } catch (error) {
        console.error('Failed to fetch brand data:', error)
        setBrandSelectorProps([])
      }
    }

    // Area data fetching function
    const fetchAreaData = async () => {
      try {
        const response = await googleRepository.getStoreListByPrefecture()

        // Step 1: すべての地域・都道府県を含むMapを初期化
        // 構造: { 地域名: { 都道府県名: { ブランド名: Branch[] } } }
        const regionMap = initializeRegionMapForStores()

        // Step 2: APIレスポンスのデータをMapに配置
        response.prefectures.forEach(prefecture => {
          const prefectureName = prefecture.prefectureJapaneseName || prefecture.prefectureName || '不明'

          // 該当する都道府県のbrandMapを取得
          const brandMap = getBrandMapByPrefecture(regionMap, prefectureName)

          if (brandMap) {
            // ブランドごとに店舗をグループ化
            prefecture.brands.forEach(brand => {
              const brandName = brand.name || '不明'
              const branches: Branch[] = brand.stores.map(store => ({
                id: store.storeId,
                name: store.name,
                checked: false
              }))

              // ブランドと店舗をセット
              brandMap.set(brandName, branches)
            })
          }
        })

        // Step 3: MapをRegion[]構造に変換（全地域を含む）
        const transformedAreaData: Region[] = regionOrder.map(regionName => {
          const prefectureMap = regionMap.get(regionName)!

          // 都道府県ごとのデータを作成（店舗がない都道府県も含む）
          const prefectures: Prefecture[] = Array.from(prefectureMap.entries())
            .map(([prefectureName, brandMap]) => {
              // ブランドごとのデータを作成
              const stores: Store[] = Array.from(brandMap.entries())
                .map(([brandName, branches]) => ({
                  name: brandName,
                  branches: branches,
                  checked: false
                }))

              return {
                name: prefectureName,
                stores: stores,
                checked: false
              }
            })

          return {
            name: regionName,
            prefectures: prefectures,
            checked: false
          }
        })

        setAreaSelectorProps(transformedAreaData)
      } catch (error) {
        console.error('Failed to fetch area data:', error)
        setAreaSelectorProps([])
      }
    }

    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetch data based on mode to prevent over-fetching
        if (mode === 'brand') {
          await fetchBrandData()
        } else if (mode === 'area') {
          await fetchAreaData()
        }

      } catch (error) {
        console.error(`Failed to fetch ${mode} data:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [mode])

  const onChangeSelectedBranches = useCallback((stores: Branch[]) => {
    setSelectedBranches(stores)
  }, [])

  const selectStoreRender = () => (
    <SelectStore
      areaSelectorProps={areaSelectorProps}
      brandSelectorProps={brandSelectorProps}
      onChangeSelectedBranches={onChangeSelectedBranches}
      onNextClick={onNextClick}
      onBackClick={onBackClick}
      isNextButtonDisabled={selectedBranches.length === 0}
      mode={mode as 'brand' | 'area'}
      isLoading={isLoading}
    />
  )

  return {
    selectedBranches,
    setSelectedBranches,
    selectStoreRender,
    isLoading
  }
}
