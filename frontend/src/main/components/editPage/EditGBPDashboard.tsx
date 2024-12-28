import styles from "@/main/components/editPage/EditGBPDashboard.module.scss";
import {DashboardItem} from "@/main/components/editPage/DashboardItem.tsx";
import EditProfileIcon from "@/main/assets/EditProfileIcon.svg";
import EditPhotoIcon from "@/main/assets/EditPhotoIcon.svg";
import EditMenuIcon from "@/main/assets/EditMenuIcon.svg";
import EditOrderIcon from "@/main/assets/EditOrderIcon.svg";
import EditInfoIcon from "@/main/assets/EditInfoIcon.svg";
import EditItemIcon from "@/main/assets/EditItemIcon.svg";
import EditReserveIcon from "@/main/assets/EditReserveIcon.svg";
import EditQnAIcon from "@/main/assets/EditQnAIcon.svg";
import {useContext, useEffect} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import {useParams} from "react-router-dom";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {GoogleService} from "@/main/service/GoogleService.ts";
import {GoogleAccountsContext} from "@/main/contexts/GoogleAccountsContext.tsx";

type Props = {
  googleService: GoogleService
}

export default function EditGBPDashboard({googleService}: Props) {
  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {setSelectedAccount} = useContext(GoogleAccountsContext)
  const {googleSelectedLocation, setGoogleSelectedLocation} = useContext(GoogleSelectedLocationContext)
  const {accountId, locationId} = useParams()

  useEffect(() => {
    setPankuzuItemList([{name: 'ページ編集', path: '/edit'}, {name: 'GBP', path: '/edit/gbp'}])
    if(googleSelectedLocation.name === "" && accountId && locationId) {
      googleService.getAccount(accountId).then(account => {
        setSelectedAccount(account)
      })
      googleService.getLocation(locationId).then(location => {
        setGoogleSelectedLocation(location)
      })
    }
  },[])
  return (
    <div className={styles.dashboard_item_container}>
      <div className={styles.dashboard_item_row}>
        <DashboardItem
          navigation={"profile"}
          text={"プロフィールを編集"}
          src={EditProfileIcon}
          altText={"edit_profile"}
        />
        <DashboardItem
          navigation={"photo"}
          text={"写真"}
          src={EditPhotoIcon}
          altText={"edit_photo"}
        />
        <DashboardItem
          navigation={"menu"}
          text={"編集メニュー"}
          src={EditMenuIcon}
          altText={"edit_menu"}
        />
        <DashboardItem
          navigation={""}
          text={"注文"}
          src={EditOrderIcon}
          altText={"edit_order"}
        />
      </div>
      <div className={styles.dashboard_item_row}>
        <DashboardItem
          navigation={"local_post"}
          text={"最新情報を追加"}
          src={EditInfoIcon}
          altText={"edit_info"}
        />
        <DashboardItem
          navigation={""}
          text={"商品を編集"}
          src={EditItemIcon}
          altText={"edit_item"}
        />
        <DashboardItem
          navigation={"reservation"}
          text={"予約"}
          src={EditReserveIcon}
          altText={"edit_reserve"}
        />
        <DashboardItem
          navigation={""}
          text={"Q&A"}
          src={EditQnAIcon}
          altText={"edit_faq"}
        />
      </div>
    </div>
  )
}
