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

export default function EditMenuLayout({googleService}: Props) {
  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {googleSelectedLocation, setGoogleSelectedLocation} = useContext(GoogleSelectedLocationContext)

  const {locationId} = useParams()

  const [mode, setMode] = useState<'list' | 'edit' | 'create'>('list');

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

  // TODO: メニューの取得処理を追加する
  const menuSectionItems = [
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

  const handleToggleMode = (mode: 'list' | 'edit' | 'create') => {
    setMode(mode);
  };

  return (
    // <EditMenuList menuSectionItems={menuSectionItems} />
    <EditMenuUpdate sectionTitle={menuSectionItems[0].sectionTitle} items={menuSectionItems[0].items} />
  )
}
