import styles from "@/main/components/editPage/EditHeader.module.scss";
import CircleFilledIcon from "@/main/assets/CircleFilled.svg";
import {useContext} from "react";
import {StoreContext} from "@/main/contexts/StoreContext.tsx";

export default function EditHeader() {
  const {storeName} = useContext(StoreContext)

  return (
    <div className={styles.store_name_container}>
      <div className={styles.store_name_text}>
        {storeName}
      </div>
      <div className={styles.store_badge_container}>
        <img className={styles.store_badge_circle} alt={"circle_filled"} src={CircleFilledIcon}/>
        <div className={styles.store_badge_text}>
          編集中の店舗
        </div>
      </div>
    </div>
  )
}