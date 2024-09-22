import styles from '@/main/common/Pankuzu.module.scss'
import {Link} from "react-router-dom";

export interface PankuzuItem {
  name: string
  path: string
}

type Props = {
  pankuzuItemList: PankuzuItem[]
}

export default function Pankuzu({pankuzuItemList}: Props) {
  return (
    <>
      <div data-testid={'pankuzu_container'} className={styles.pankuzu_container}>
        {pankuzuItemList.map((pankuzuItem, index) => {
            if (index !== pankuzuItemList.length - 1) {
              return (
                <Link key={index} to={pankuzuItem.path}
                      className={styles.pankuzu_item_text}>{pankuzuItem.name}&nbsp;/&nbsp;</Link>
              )
            } else {
              return (
                <Link key={index} to={pankuzuItem.path} className={styles.pankuzu_item_text_end}>{pankuzuItem.name}</Link>
              )
            }
          }
        )}
      </div>
    </>
  )
}