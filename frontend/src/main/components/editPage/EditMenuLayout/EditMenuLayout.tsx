import {GoogleService} from "@/main/service/GoogleService.ts";
import {useContext, useEffect, useState} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {useParams} from "react-router-dom";
import EditMenuList from "./EditMenuList";
import EditMenuUpdate from "./EditMenuUpdate";

type Props = {
  googleService: GoogleService
}

export type MenuSectionItem = {
  sectionTitle: string
  items: {title: string, price: string}[]
}

export default function EditMenuLayout({googleService}: Props) {
  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {googleSelectedLocation, setGoogleSelectedLocation} = useContext(GoogleSelectedLocationContext)

  const {locationId} = useParams()

  const [mode, setMode] = useState<'list' | 'edit' | 'create'>('list');
  // TODO: メニューの取得処理を追加する
  const [menuSectionItems, setMenuSectionItems] = useState<MenuSectionItem[]>([]);
  const [selectedMenuSectionItem, setSelectedMenuSectionItem] = useState<MenuSectionItem & { index: number} | null>(null);

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
    setMenuSectionItems(
      [
        {
           sectionTitle: "ランチメニューセット",
           items: [
               {title: "鰻うどん定食", price: "1000円"},
               {title: "鰻うどん定食", price: "1200円"},
               {title: "鰻うどん定食", price: "1500円"},
           ]
        },
        {
           sectionTitle: "ランチメニューセット",
           items: [
               {title: "鰻うどん定食", price: "1000円"},
               {title: "鰻うどん定食", price: "1200円"},
               {title: "鰻うどん定食", price: "1500円"},
           ]
        }
     ]
    )
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
    // 保存する処理
  }

  return (
    <>
      {mode === 'list' && <EditMenuList menuSectionItems={menuSectionItems} onClickEdit={onClickEdit} onClickCreate={onClickCreate} />}
      {mode === 'edit' && <EditMenuUpdate sectionTitle={selectedMenuSectionItem?.sectionTitle || ''} items={selectedMenuSectionItem?.items || []} onClickCancel={onClickCancel} onClickSave={onClickSave} />}
      {mode === 'create' && <EditMenuUpdate sectionTitle="" items={[]} onClickCancel={onClickCancel} onClickSave={onClickSave} />}
    </>
  )
}
