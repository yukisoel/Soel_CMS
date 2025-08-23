import { useContext } from 'react'
import styles from '@/main/components/editPage/EditHeader.module.scss'
import CircleFilledIcon from '@/main/assets/CircleFilled.svg'
import { GoogleSelectedLocationContext } from '@/main/contexts/GoogleSelectedLocationContext.tsx'

export default function EditHeader() {
  const { googleSelectedLocation } = useContext(GoogleSelectedLocationContext)

  return (
    <div className={styles.store_name_container}>
      <div className={styles.store_name_text}>
        {googleSelectedLocation.title}
      </div>
      <div className={styles.store_badge_container}>
        <img className={styles.store_badge_circle} alt={'circle_filled'} src={CircleFilledIcon}/>
        <div className={styles.store_badge_text}>
          編集中の店舗
        </div>
      </div>
    </div>
  )
}