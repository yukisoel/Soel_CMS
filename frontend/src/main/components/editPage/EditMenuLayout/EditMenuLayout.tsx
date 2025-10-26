import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import cloneDeep from 'lodash.clonedeep'
import EditMenuList from './EditMenuList'
import EditMenuUpdate from './EditMenuUpdate'
import { PankuzuItemListContext } from '@/main/contexts/PankuzuItemListContext.tsx'
import { GoogleSelectedLocationContext } from '@/main/contexts/GoogleSelectedLocationContext.tsx'
import { GoogleLocationFoodMenuSection } from '@/main/model/LocationModel'
import { useMenuFood } from '@/main/hooks/EditMenu/useFoodMenu'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext'


export type MenuSectionItem = {
  sectionTitle: string
  items: {title: string, price: string}[]
}

export default function EditMenuLayout() {
  const googleRepository = useGoogleRepository()
  const { setPankuzuItemList } = useContext(PankuzuItemListContext)
  const { googleSelectedLocation, setGoogleSelectedLocation } = useContext(GoogleSelectedLocationContext)

  const { accountId, locationId } = useParams()

  const [mode, setMode] = useState<'list' | 'edit' | 'create'>('list')
  const [selectedMenuSectionItem, setSelectedMenuSectionItem] = useState<GoogleLocationFoodMenuSection & { index: number} | null>(null)

  const { foodMenu, updateFoodMenus } = useMenuFood(googleRepository, accountId ?? '', locationId ?? '')

  useEffect(() => {
    setPankuzuItemList([
      { name: 'ページ編集', path: '/edit' },
      { name: 'GBP', path: '/edit/gbp' },
      { name: '編集メニュー', path: '/edit/menu' }])
    if (googleSelectedLocation.name === '' && locationId) {
      googleRepository.getLocation(locationId).then(location => {
        setGoogleSelectedLocation(location)
      })
    }
  }, [])

  const onClickEdit = (item: GoogleLocationFoodMenuSection & { index: number }) => {
    setSelectedMenuSectionItem(item)
    setMode('edit')
  }

  const onClickCreate = () => {
    setMode('create')
  }

  const onClickCancel = () => {
    setSelectedMenuSectionItem(null)
    setMode('list')
  }

  const onClickSave = async (menuSectionItem: GoogleLocationFoodMenuSection) => {
    // 編集なら編集したものに差し替えて渡す
    const newFoodMenu = cloneDeep(foodMenu)
    if (newFoodMenu?.menus[0]) {
      if (selectedMenuSectionItem) {
        newFoodMenu.menus[0].sections[selectedMenuSectionItem.index] = menuSectionItem
      } else {
        // 追加なら一番後ろに足す形にする
        newFoodMenu.menus[0].sections.push(menuSectionItem)
      }
      await updateFoodMenus(newFoodMenu)
    }
    setMode('list')
  }

  return (
    <>
      {mode === 'list' && <EditMenuList menuSectionItems={foodMenu?.menus[0].sections ?? []} onClickEdit={onClickEdit} onClickCreate={onClickCreate} />}
      {mode === 'edit' && selectedMenuSectionItem && <EditMenuUpdate menuSectionItem={selectedMenuSectionItem} onClickCancel={onClickCancel} onClickSave={onClickSave} />}
      {mode === 'create' && <EditMenuUpdate menuSectionItem={{ items: [], labels: [] }} onClickCancel={onClickCancel} onClickSave={onClickSave} />}
    </>
  )
}
