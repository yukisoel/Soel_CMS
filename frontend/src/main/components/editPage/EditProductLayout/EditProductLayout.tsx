import {GoogleService} from "@/main/service/GoogleService.ts";
import {useContext, useEffect, useState} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {useParams} from "react-router-dom";
import EditProductList from "./EditProductList";

type Props = {
  googleService: GoogleService
}

export default function EditProductLayout({googleService}: Props) {
  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {googleSelectedLocation, setGoogleSelectedLocation} = useContext(GoogleSelectedLocationContext)

  const {accountId, locationId} = useParams()

  const [mode, setMode] = useState<'list' | 'edit' | 'create'>('list');

  useEffect(() => {
    setPankuzuItemList([
      {name: 'ページ編集', path: '/edit'},
      {name: 'GBP', path: '/edit/gbp'},
      {name: '編集メニュー', path: '/edit/menu'}])
    if (googleSelectedLocation.name === "" && locationId) {
    //   googleService.getLocation(locationId).then(location => {
    //     setGoogleSelectedLocation(location)
    //   })
    }
  }, [])

  const onClickCreate = () => {
    setMode('create')
  }

  const onClickEdit = () => {
    setMode('edit')
  }

  const onClickCancel = () => {
    setMode('list')
  }

  const onClickSave = () => {
    setMode('list')
  }

  const productList = Array.from({length: 50}, (_, i) => (`商品${i}`))

  const pullDownSections = ['すべての商品', '食品', '飲料', 'その他']

  return (
    <>
      {mode === 'list' && (
        <EditProductList pullDownSections={pullDownSections} productList={productList} onClickCreate={onClickCreate} onClickEdit={onClickEdit} />
      )}
    </>
  )
}
