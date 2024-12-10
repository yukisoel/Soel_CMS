import styles from "@/main/components/editPage/EditMenuLayout.module.scss";
import {GoogleService} from "@/main/service/GoogleService.ts";
import {useContext, useEffect} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {useParams} from "react-router-dom";

type Props = {
  googleService: GoogleService
}

export default function EditMenuLayout({googleService}: Props) {
  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {googleSelectedLocation, setGoogleSelectedLocation} = useContext(GoogleSelectedLocationContext)

  const {accountId, locationId} = useParams()

  useEffect(() => {
    setPankuzuItemList([
      {name: 'ページ編集', path: '/edit'},
      {name: 'GBP', path: '/edit/gbp'},
      {name: '写真', path: '/edit/photo'}])
    if (googleSelectedLocation.name === "" && locationId) {
      googleService.getLocation(locationId).then(location => {
        console.log({locationId})
        console.log({location})
        setGoogleSelectedLocation(location)
      })
    }
  }, [])


  return (
    <div className={styles.edit_menu_container}>
        <div className={styles.header_container}>
            <button className={styles.add_button}>セクションを追加</button>
        </div>

        <div className={styles.menu_container}>
            <div className={styles.menu_section_container}>
                <div className={styles.menu_section_title_container}>
                    <span className={styles.menu_section_title_content}>ランチメニューセット</span>
                    <button className={styles.menu_section_title_button}>編集</button>
                </div>
                <div className={styles.menu_section_items_wrapper}>
                    <div className={styles.menu_section_item_container}>
                        <span className={styles.menu_section_item_title}>鰻どうん定食</span>
                        <span className={styles.menu_section_item_price}>1,980円</span>
                    </div>
                    <div className={styles.menu_section_item_container}>
                        <span className={styles.menu_section_item_title}>鰻どうん定食</span>
                        <span className={styles.menu_section_item_price}>1,980円</span>
                    </div>
                    <div className={styles.menu_section_item_container}>
                        <span className={styles.menu_section_item_title}>鰻どうん定食</span>
                        <span className={styles.menu_section_item_price}>1,980円</span>
                    </div>
                </div>
            </div>
            <div className={styles.menu_section_container}>
                <div className={styles.menu_section_title_container}>
                    <span className={styles.menu_section_title_content}>ランチメニューセット</span>
                    <button className={styles.menu_section_title_button}>編集</button>
                </div>
                <div className={styles.menu_section_items_wrapper}>
                    <div className={styles.menu_section_item_container}>
                        <span className={styles.menu_section_item_title}>鰻どうん定食</span>
                        <span className={styles.menu_section_item_price}>1,980円</span>
                    </div>
                    <div className={styles.menu_section_item_container}>
                        <span className={styles.menu_section_item_title}>鰻どうん定食</span>
                        <span className={styles.menu_section_item_price}>1,980円</span>
                    </div>
                    <div className={styles.menu_section_item_container}>
                        <span className={styles.menu_section_item_title}>鰻どうん定食</span>
                        <span className={styles.menu_section_item_price}>1,980円</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
