import styles from "@/main/components/editPage/EditProfileLayout.module.scss";
import ButtonEditBack from "@/main/assets/ButtonEditBack.svg";
import {useRef, useState} from "react";
import {GoogleService} from "@/main/service/GoogleService.ts";
import {useParams} from "react-router-dom";
import {GoogleLocationProfileModel} from "@/main/model/LocationModel.ts";

type Props = {
  name: string
  title?: string
  year?: number
  month?: number
  day?: number
  setGoogleLocationProfileObject: (googleLocationProfileObject: GoogleLocationProfileModel | null) => void
  editTerm: string | null
  setEditTerm: (editTerm: string | null) => void
  googleService: GoogleService
}

export default function EditProfileOpenDateTerm({
                                                  name,
                                                  title,
                                                  year,
                                                  month,
                                                  day,
                                                  setGoogleLocationProfileObject,
                                                  editTerm,
                                                  setEditTerm,
                                                  googleService
                                                }: Props) {
  const [selectedMonth, setSelectedMonth] = useState<number|null>(null)
  const [selectedDay, setSelectedDay] = useState<number|null>(null)
  const yearTextRef = useRef<HTMLInputElement>(null)
  const {locationId} = useParams()

  const handleClickEditButton = () => {
    if (name === editTerm) setEditTerm(null)
    else setEditTerm(name)
  }

  const clickSaveButton = () => {
    const saveMonth = selectedMonth ? selectedMonth : month
    const saveDay = selectedDay ? selectedDay : day
    if ((yearTextRef.current && saveMonth && saveDay) && validateGoogleLocationProfileModel(name, yearTextRef.current?.value, saveMonth.toString(), saveDay.toString())) {
      const updateProfile: GoogleLocationProfileModel = makeGoogleLocationProfileModel(name, parseInt(yearTextRef.current?.value, 10), saveMonth, saveDay)
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
          </div>
          <div className={styles.term}>
            {title &&
              <div className={styles.term_title}>{title}</div>
            }
            {year && month && day &&
              <div className={styles.term_content}>{year}年{month}月{day}日</div>
            }
            {(!year || !month || !day) &&
              <div className={styles.term_content}>未設定</div>
            }
          </div>
        </div>
      }
      {name === editTerm &&
        <div className={styles.term_wrapper}>
          <div className={styles.edit_button_container}>
            <img onClick={handleClickEditButton} src={ButtonEditBack} alt="キャンセル"/>
          </div>
          <div className={styles.term}>
            {title &&
              <div className={styles.term_title}>{title}</div>
            }
            <div className={`${styles.term_content} ${styles.openDate_term_content_focus}`}>
              <input
                className={styles.openDate_term_content_input_text}
                ref={yearTextRef}
                type={"text"}
                defaultValue={year ? year : ""}
              />
              年
              <select
                className={styles.openDate_term_content_input_text}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
                defaultValue={month}
              >
                {[...Array(12)].map((_, i) => {
                  return <option key={i} value={i + 1}>{i + 1}</option>
                })}
              </select>
              月
              <select
                className={styles.openDate_term_content_input_text}
                onChange={(e) => setSelectedDay(parseInt(e.target.value, 10))}
                defaultValue={day}
              >
                {[...Array(31)].map((_, i) => {
                  return <option key={i} value={i + 1}>{i + 1}</option>
                })}
              </select>
              日
              <div className={styles.edit_button} onClick={clickSaveButton}>保存</div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

function validateGoogleLocationProfileModel(name: string, year?: string, month?: string, day?: string): boolean {
  if(!year || !month || !day) return false

  switch (name) {
    case "openInfo":{
      const yearRegex = /^[0-9]{4}$/;
      if (!yearRegex.test(year)) {
        return false;
      }
      const monthAndDayRegex = /^[0-9]{1,2}$/;
      if (!monthAndDayRegex.test(month)) {
        return false;
      }
      if (!monthAndDayRegex.test(day)) {
        return false;
      }
      const yearNumber = parseInt(year, 10);
      const monthNumber = parseInt(month, 10);
      const dayNumber = parseInt(day, 10);
      if (yearNumber < 1000 || yearNumber > 2100) {
        return false;
      }
      if(monthNumber < 1 || monthNumber > 12) {
        return false;
      }
      if(dayNumber < 1 || dayNumber > 31) {
        return false;
      }

      return true
    }
    default:
      return false
  }
}

function makeGoogleLocationProfileModel(name: string, year?: number, month?: number, day?: number): GoogleLocationProfileModel {
  switch (name) {
    case "openInfo":
      return {openInfo: {
        openingDate: {
          year: year,
          month: month,
          day: day
        }
        }}
    default:
      return {}
  }
}