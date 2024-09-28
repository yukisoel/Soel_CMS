import styles from "@/main/components/editPage/EditProfileLayout.module.scss";

type Props = {
  title?: string
  content: string
  isDeleteButton?: boolean
}

export default function EditProfileTerm({title, content, isDeleteButton = false}: Props) {
  return (
    <div className={styles.term_wrapper}>
      <div className={styles.edit_button_container}>
        <div className={styles.edit_button}>編集</div>
        {isDeleteButton && <div className={styles.delete_button}>削除</div>}
      </div>
      <div className={styles.term}>
        {title &&
        <div className={styles.term_title}>{title}</div>
        }
        <div className={styles.term_content}>{content}</div>
      </div>
    </div>
  )
}