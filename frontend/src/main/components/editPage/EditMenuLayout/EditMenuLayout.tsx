import {GoogleService} from "@/main/service/GoogleService.ts";
import {useContext, useEffect, useState} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {useParams} from "react-router-dom";
import EditMenuList from "./EditMenuList";
import EditMenuUpdate from "./EditMenuUpdate";
import { GoogleLocationFoodMenu, GoogleLocationFoodMenuSection, GoogleLocationMenuLabel, GoogleLocationFoodMenuItemAttributes, GoogleLocationFoodMenusModel } from "@/main/model/LocationModel";

type Props = {
  googleService: GoogleService
}

export type MenuSectionItem = {
  sectionTitle: string
  items: {title: string, price: string}[]
}

const useMenuFood = (googleService: GoogleService, accountId: string | undefined, locationId: string | undefined) => {
  const [foodMenu, setFoodMenu] = useState<GoogleLocationFoodMenusModel>()
  const [menuSectionItems, setMenuSectionItems] = useState<MenuSectionItem[]>([]);

  useEffect(() => {
    getFoodMenus()
  }, [accountId, locationId])

  const getFoodMenus = () => {
    if (accountId && locationId) {
      googleService.getLocationFoodMenus(accountId, locationId).then(data => {
        setFoodMenu(data)
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
                  price: item.attributes.price?.units ?? ''
              }
          })
       }
    })
  }

  const createFoodMenuLabels = (sectionTitle: string, currentLabels?: GoogleLocationMenuLabel[]): GoogleLocationMenuLabel[] => {
    if (currentLabels) {
      return [{...currentLabels[0], displayName: sectionTitle}, ...currentLabels.slice(1)]
    }
    return [
      {
        displayName: sectionTitle,
        description: null,
        languageCode: null
      }
    ]
  }

  const createFoodMenuAttributes = (price: string, currentAttributes?: GoogleLocationFoodMenuItemAttributes): GoogleLocationFoodMenuItemAttributes => {
    if (currentAttributes) {
      return {
        ...currentAttributes,
        price: {
          units: price ?? null,
          currencyCode: currentAttributes.price?.currencyCode ?? 'JPY',
          nanos: currentAttributes.price?.nanos ?? null
        }
      }
    }
    return {
      price: {
        units: price ?? null,
        currencyCode: 'JPY',
        nanos: null
      }
    }
  }

  // TODO: リクエストの形式によりfoodMenuSectionsと良い感じにマージする必要があるかも
  const toFoodMenuSections = (menuSectionItems: MenuSectionItem[]): GoogleLocationFoodMenu[] => {
    const menu = foodMenu?.menus[0]
    const currentMenuSections = menu?.sections || []
    const newMenuSections =  menuSectionItems.map((section, index) => {
      // 編集したsectionLabelsとそれ以外のlabelsをマージ
      const currentItems = currentMenuSections[index].items
      return {
        labels: createFoodMenuLabels(section.sectionTitle, currentMenuSections[index].labels),
        items: section.items.map((item, j) => {
          return {
            labels: createFoodMenuLabels(item.title, currentItems[j]?.labels),
            attributes: createFoodMenuAttributes(item.price, currentItems[j]?.attributes),
            options: currentItems[j]?.options || null
          }
        })
      }
    })
    const newMenu = {
      labels: menu?.labels || [],
      sections: newMenuSections,
      cuisines: menu?.cuisines || null,
      sourceUrl: menu?.sourceUrl || null,
    }
    return [newMenu, ...(foodMenu?.menus?.slice(1) || [])]
  }

  const updateFoodMenus = (menuSectionItems: MenuSectionItem[]) => {
    // TODO: update処理を追加する refetchも必要
    if (accountId && locationId) {
      console.log('toFoodMenuSections', toFoodMenuSections(menuSectionItems))
      googleService.updateLocationFoodMenus(accountId, locationId, {menus: toFoodMenuSections(menuSectionItems), name: foodMenu?.name || null})
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
