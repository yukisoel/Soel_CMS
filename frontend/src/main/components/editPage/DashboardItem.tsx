import styles from '@/main/components/editPage/DashboardItem.module.scss'
import {Link} from "react-router-dom";

type Props = {
  navigation: string
  text: string
  src: string
  altText: string
}

export function DashboardItem({navigation, text, src, altText}: Props) {
  return (
    <>
      <div className={styles.item_container}>
        <Link to={navigation}>
          <button className={styles.item_button}>
            <img alt={altText} src={src}/>
          </button>
        </Link>
        <Link to={navigation}>
          <div className={styles.item_name}>
            {text}
          </div>
        </Link>
      </div>
    </>
  )
}