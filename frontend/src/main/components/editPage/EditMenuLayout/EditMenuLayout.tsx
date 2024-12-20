import {GoogleService} from "@/main/service/GoogleService.ts";
import {useContext, useEffect, useState} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {useParams} from "react-router-dom";
import EditMenuList from "./EditMenuList";
import EditMenuUpdate from "./EditMenuUpdate";
import { GoogleLocationFoodMenu, GoogleLocationFoodMenuSection } from "@/main/model/LocationModel";

type Props = {
  googleService: GoogleService
}

export type MenuSectionItem = {
  sectionTitle: string
  items: {title: string, price: string}[]
}

const useMenuFood = (googleService: GoogleService, accountId: string | undefined, locationId: string | undefined) => {
  const [foodMenus, setFoodMenuSections] = useState<GoogleLocationFoodMenu[]>([])
  const [menuSectionItems, setMenuSectionItems] = useState<MenuSectionItem[]>([]);

  useEffect(() => {
    getFoodMenus()
  }, [accountId, locationId])

  const getFoodMenus = () => {
    if (accountId && locationId) {
      googleService.getLocationFoodMenus(accountId, locationId).then(data => {
        setFoodMenuSections(data.menus)
        setMenuSectionItems(toMenuSectionItems(data.menus[0].sections))
      })
    }
  }

  const toMenuSectionItems = (foodMenuSections: GoogleLocationFoodMenuSection[]): MenuSectionItem[] => {
    return foodMenuSections.map(section => {
       return {
          sectionTitle: section.labels[0].displayName,
          items: section.items.map(item => {
              return {
                  title: item.labels[0].displayName,
                  price: item.attributes.price?.units || ''
              }
          })
       }
    })
  }

  // TODO: リクエストの形式によりfoodMenuSectionsと良い感じにマージする必要があるかも
  const toFoodMenuSections = (menuSectionItems: MenuSectionItem[]): GoogleLocationFoodMenu[] => {
    const currentMenuSections = foodMenus[0].sections
    const newMenuSections =  menuSectionItems.map((section, index) => {
      // 編集したsectionLabelsとそれ以外のlabelsをマージ
      const newSectionLabels = [{displayName: section.sectionTitle}, ...(currentMenuSections[index]?.labels?.slice(1) ?? [])]
      const currentItems = currentMenuSections[index].items
      return {
        labels: newSectionLabels,
        items: section.items.map(item => {
          const newItemLabels = [{displayName: item.title}, ...(currentItems[index] ? currentItems[index].labels.slice(1) : [])]
          return {
            labels: newItemLabels,
            attributes: {
              price: {
                units: item.price
              }
            }
          }
        })
      }
    })
    const newMenu = {
      labels: foodMenus[0].labels,
      sections: newMenuSections
    }
    return [newMenu, ...foodMenus.slice(1)]
  }

  const updateFoodMenus = (menuSectionItems: MenuSectionItem[]) => {
    // TODO: update処理を追加する refetchも必要
    if (accountId && locationId) {
      googleService.updateLocationFoodMenus(accountId, locationId, {menus: toFoodMenuSections(menuSectionItems)})
    }
  }

  return {menuSectionItems, updateFoodMenus}
}

export default function EditMenuLayout({googleService}: Props) {
  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {googleSelectedLocation, setGoogleSelectedLocation} = useContext(GoogleSelectedLocationContext)

  const {accountId, locationId} = useParams()

  const [mode, setMode] = useState<'list' | 'edit' | 'create'>('list');
  const [selectedMenuSectionItem, setSelectedMenuSectionItem] = useState<MenuSectionItem & { index: number} | null>(null);

  const {menuSectionItems, updateFoodMenus} = useMenuFood(googleService, accountId, locationId)

  useEffect(() => {
    setPankuzuItemList([
      {name: 'ページ編集', path: '/edit'},
      {name: 'GBP', path: '/edit/gbp'},
      {name: '編集メニュー', path: '/edit/menu'}])
    if (googleSelectedLocation.name === "" && locationId) {
      googleService.getLocation(locationId).then(location => {
        setGoogleSelectedLocation(location)
      })
    }
  }, [])

  const onClickEdit = (item: MenuSectionItem & { index: number }) => {
    setSelectedMenuSectionItem(item);
    setMode('edit');
  }

  const onClickCreate = () => {
    setMode('create');
  }

  const onClickCancel = () => {
    setSelectedMenuSectionItem(null);
    setMode('list');
  }

  const onClickSave = (menuSectionItem: MenuSectionItem) => {
    // 編集なら編集したものに差し替えて渡す
    if (selectedMenuSectionItem) {
      const newMenuSectionItems = [...menuSectionItems]
      newMenuSectionItems[selectedMenuSectionItem.index] = menuSectionItem
      updateFoodMenus(newMenuSectionItems)
    } else {
      // 追加なら一番後ろに足す形にする
      updateFoodMenus([...menuSectionItems, menuSectionItem])
    }
    setMode('list')

  }

  return (
    <>
      {mode === 'list' && <EditMenuList menuSectionItems={menuSectionItems} onClickEdit={onClickEdit} onClickCreate={onClickCreate} />}
      {mode === 'edit' && <EditMenuUpdate sectionTitle={selectedMenuSectionItem?.sectionTitle || ''} items={selectedMenuSectionItem?.items || []} onClickCancel={onClickCancel} onClickSave={onClickSave} />}
      {mode === 'create' && <EditMenuUpdate sectionTitle="" items={[]} onClickCancel={onClickCancel} onClickSave={onClickSave} />}
    </>
  )
}
