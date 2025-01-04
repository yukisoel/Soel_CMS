import {GoogleService} from "@/main/service/GoogleService.ts";
import {useContext, useEffect, useState} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {useParams} from "react-router-dom";
import { GoogleLocationFoodMenuSection } from "@/main/model/LocationModel";
import Wrapper from "@/main/common/Wrapper";
import styles from '@/main/components/editPage/EditProductLayout/EditProductLayout.module.scss';
import PhotoPullDownMenu from "../PhotoPullDownMenu";
import Button from "@/main/common/Button";
import Typography from "@/main/common/Typography";

type Props = {
  googleService: GoogleService
}

export default function EditProductLayout({googleService}: Props) {
  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {googleSelectedLocation, setGoogleSelectedLocation} = useContext(GoogleSelectedLocationContext)

  const {accountId, locationId} = useParams()

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

  const boxLength = 50

  const pullDownSections = ['すべての商品', '食品', '飲料', 'その他']

  return (
    <Wrapper direction="col" className={styles.edit_product_container}>
      <Wrapper justify="justify-between" className={styles.header_container}>
        <div className={styles.pull_down_menu}>
            <PhotoPullDownMenu options={pullDownSections} selectedContent="すべての商品" setSelectedContent={() => {}} />
        </div>
        <Button bgColor="primary" padding="2rem 4.3rem 2.2rem 4.5rem">
            <Typography content="商品を追加" size="medium" color="primary" />
        </Button>
      </Wrapper>
      <Wrapper padding="5rem 7rem 5rem 11.1rem" className={styles.product_container}>
        <Wrapper padding="0 14rem 0 7.1rem" gap="2rem" className={styles.image_grid}>
            {Array.from({ length: boxLength }).map((_, index) => (
            <div key={index} className={styles.image_item}>
                <div className={styles.box} />
            </div>
            ))}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}
