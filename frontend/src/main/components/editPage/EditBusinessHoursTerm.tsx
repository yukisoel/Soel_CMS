import styles from '@/main/components/editPage/EditProfileLayout.module.scss'

type Props = {
  name: string
  title?: string
  businessHoursList: string[][]
  editTerm: string | null
  setEditTerm: (editTerm: string | null) => void
}

export function EditBusinessHoursTerm({ name, title, businessHoursList, editTerm, setEditTerm }: Props) {

  const handleClickEditButton = () => {
    if (name === editTerm) setEditTerm(null)
    else setEditTerm(name)
  }

  return (
    <>
      {name === editTerm &&
        <div className={styles.term_wrapper}>
          <div className={styles.edit_business_hours_button_container}>
            <div className={styles.cancel_business_hours_button} onClick={handleClickEditButton}>キャンセル</div>
            <div className={styles.edit_button} onClick={handleClickEditButton}>保存</div>
          </div>
          <div className={styles.term}>
            {title &&
              <div className={styles.term_title}>{title}</div>
            }
            <div className={styles.term_content}>{businessHoursList}</div>
          </div>
        </div>
      }
    </>

  )
}