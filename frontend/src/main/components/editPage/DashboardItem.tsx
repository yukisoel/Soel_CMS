import styles from '@/main/components/editPage/DashboardItem.module.scss'

type Props = {
  navigation: string
  text: string
  src: string
  altText: string
}

export function DashboardItem({text, src, altText}: Props) {
  return (
    <>
      <div className={styles.item_container}>
        <button className={styles.item_button}>
          <img alt={altText} src={src}/>
        </button>
        <div className={styles.item_name}>
          {text}
        </div>
      </div>
    </>
  )
}