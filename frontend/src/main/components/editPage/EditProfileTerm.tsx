import styles from "@/main/components/editPage/EditProfileLayout.module.scss";
import ButtonEditBack from "@/main/assets/ButtonEditBack.svg";
import {useRef} from "react";
import {GoogleService} from "@/main/service/GoogleService.ts";
import {useParams} from "react-router-dom";
import {GoogleLocationProfileModel} from "@/main/model/LocationModel.ts";

type Props = {
  name: string
  title?: string
  content?: string
  setGoogleLocationProfileObject: (googleLocationProfileObject: GoogleLocationProfileModel | null) => void
  isDeleteButton?: boolean
  type?: TermType
  editTerm: string | null
  setEditTerm: (editTerm: string | null) => void
  googleService: GoogleService
}

export default function EditProfileTerm({
                                          name,
                                          title,
                                          content,
                                          setGoogleLocationProfileObject,
                                          isDeleteButton = false,
                                          type = TermType.TEXT,
                                          editTerm,
                                          setEditTerm,
                                          googleService
                                        }: Props) {
  const inputTextRef = useRef<HTMLInputElement>(null)
  const textareaTextRef = useRef<HTMLTextAreaElement>(null)
  const {locationId} = useParams()

  const handleClickEditButton = () => {
    if (name === editTerm) setEditTerm(null)
    else setEditTerm(name)
  }

  const clickSaveButton = () => {
    if((inputTextRef.current || textareaTextRef.current) && validateGoogleLocationProfileModel(name, inputTextRef.current?.value || textareaTextRef.current?.value || null)) {
      const updateProfile: GoogleLocationProfileModel = makeGoogleLocationProfileModel(name, inputTextRef.current?.value || textareaTextRef.current?.value || "")
      if (locationId) {
        googleService.updateLocationProfile(locationId, name, updateProfile)
          .then(locationProfile => {
            setGoogleLocationProfileObject(locationProfile)
          })
      }
    }
    handleClickEditButton()
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
                ref={inputTextRef}
                type={"text"}
                defaultValue={content}
              />
              <div className={styles.edit_button} onClick={clickSaveButton}>保存</div>
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
                ref={textareaTextRef}
                defaultValue={content}
              />
              <div className={styles.edit_button} onClick={clickSaveButton}>保存</div>
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

function validateGoogleLocationProfileModel(name:string, value:string|null): boolean {
  if(value === null) return false

  switch (name) {
    case "title":
      return true
    case "phoneNumbers.primaryPhone": {
      const phoneNumber = value.replace(/\D/g, '')
      return phoneNumber.length >= 10 && phoneNumber.length <= 11
    }
    case "categories":
      return true
    case "websiteUri":
      return true
    case "regularHours":
      return true
    case "profile.description":
      return true
    case "openInfo":
      return true
    default:
      return false
  }
}

function makeGoogleLocationProfileModel(name:string, value:string): GoogleLocationProfileModel {
  switch (name) {
    case "title":
      return {title: value}
    case "phoneNumbers.primaryPhone":
      return {phoneNumbers: {primaryPhone: value}}
    case "categories":
      return {categories: {primaryCategory: {name: value}}}
    case "websiteUri":
      return {websiteUri: value}
    case "regularHours":
      return {regularHours: {periods: []}}
    case "profile.description":
      return {profile: {description: value}}
    case "openInfo":
      return {openInfo: {status: value}}
    default:
      return {}
  }
}