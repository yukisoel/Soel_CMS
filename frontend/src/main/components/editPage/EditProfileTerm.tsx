import styles from "@/main/components/editPage/EditProfileLayout.module.scss";
import ButtonEditBack from "@/main/assets/ButtonEditBack.svg";

type Props = {
  name: string
  title?: string
  content?: string
  isDeleteButton?: boolean
  type?: TermType
  editTerm: string | null
  setEditTerm: (editTerm: string | null) => void
}

export default function EditProfileTerm({
                                          name,
                                          title,
                                          content,
                                          isDeleteButton = false,
                                          type = TermType.TEXT,
                                          editTerm,
                                          setEditTerm
                                        }: Props) {

  const handleClickEditButton = () => {
    if (name === editTerm) setEditTerm(null)
    else setEditTerm(name)
  }

  return (
    <>
      {name !== editTerm &&
        <div className={styles.term_wrapper}>
          <div className={styles.edit_button_container}>
            <div className={styles.edit_button} onClick={handleClickEditButton}>編集</div>
            {isDeleteButton && <div className={styles.delete_button}>削除</div>}
          </div>
          <div className={styles.term}>
            {title &&
              <div className={styles.term_title}>{title}</div>
            }
            <div className={styles.term_content}>{content}</div>
          </div>
        </div>
      }
      {name === editTerm && type === TermType.TEXT &&
        <div className={styles.term_wrapper}>
          <div className={styles.edit_button_container}>
            <img onClick={handleClickEditButton} src={ButtonEditBack} alt="キャンセル"/>
          </div>
          <div className={styles.term}>
            {title &&
              <div className={styles.term_title}>{title}</div>
            }
            <div className={`${styles.term_content} ${styles.term_content_focus}`}>
              <input
                className={styles.term_content_input_text}
                type={"text"}
                defaultValue={content}
              />
              <div className={styles.edit_button} onClick={handleClickEditButton}>保存</div>
            </div>
          </div>
        </div>

      }
      {name === editTerm && type === TermType.TEXTAREA &&
        <div className={styles.term_wrapper}>
          <div className={styles.edit_button_container}>
            <img onClick={handleClickEditButton} src={ButtonEditBack} alt="キャンセル"/>
          </div>
          <div className={styles.term}>
            {title &&
              <div className={styles.term_title}>{title}</div>
            }
            <div className={`${styles.term_content} ${styles.term_content_focus}`}>
              <textarea
                className={styles.term_content_input_textarea}
                defaultValue={content}
              />
              <div className={styles.edit_button} onClick={handleClickEditButton}>保存</div>
            </div>
          </div>
        </div>

      }
    </>
  )
}

export enum TermType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  DATE = 'date',
  BUSINESS_HOURS = 'businessHours',
}