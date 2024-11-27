import styles from "@/main/components/editPage/EditProfileLayout.module.scss";
import ButtonEditBack from "@/main/assets/ButtonEditBack.svg";
import {useRef} from "react";
import {GoogleService} from "@/main/service/GoogleService.ts";
import {useParams} from "react-router-dom";
import {GoogleLocationPlaceInfo, GoogleLocationProfileModel} from "@/main/model/LocationModel.ts";
import {APIProvider, Map} from "@vis.gl/react-google-maps";

type Props = {
  name: string
  title?: string
  placeInfos?: GoogleLocationPlaceInfo[]
  setGoogleLocationProfileObject: (googleLocationProfileObject: GoogleLocationProfileModel | null) => void
  editTerm: string | null
  setEditTerm: (editTerm: string | null) => void
  googleService: GoogleService
}

export default function EditProfileServiceAreaTerm({
                                                     name,
                                                     title,
                                                     placeInfos,
                                                     setGoogleLocationProfileObject,
                                                     editTerm,
                                                     setEditTerm,
                                                     googleService
                                                   }: Props) {
  const yearTextRef = useRef<HTMLInputElement>(null)
  const monthTextRef = useRef<HTMLInputElement>(null)
  const dayTextRef = useRef<HTMLInputElement>(null)
  const {locationId} = useParams()

  const handleClickEditButton = () => {
    if (name === editTerm) setEditTerm(null)
    else setEditTerm(name)
  }


  const clickSaveButton = () => {
    if ((yearTextRef.current && monthTextRef.current && dayTextRef.current) && validateGoogleLocationProfileModel(name, yearTextRef.current?.value, monthTextRef.current?.value, dayTextRef.current?.value)) {
      const updateProfile: GoogleLocationProfileModel = makeGoogleLocationProfileModel(name, parseInt(yearTextRef.current?.value, 10), parseInt(monthTextRef.current?.value, 10), parseInt(dayTextRef.current?.value, 10))
      if (locationId) {
        googleService.updateLocationProfile(locationId, name, updateProfile)
          .then(locationProfile => {
            setGoogleLocationProfileObject(locationProfile)
          })
      }
    }
    handleClickEditButton()
  }

  console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)

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
            {placeInfos && placeInfos.map((placeInfo, index) =>
              <div key={index} className={styles.term_content}>{placeInfo.placeName}</div>
            )}
            {(!placeInfos || placeInfos.length === 0 || placeInfos[0].placeName?.length === 0) &&
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
            <div className={`${styles.term_content} ${styles.term_content_focus}`}>
              <input
                className={styles.term_content_input_text}
                ref={yearTextRef}
                type={"text"}
                defaultValue={(placeInfos && placeInfos.length > 0 && placeInfos[0].placeName?.length === 0) ? placeInfos[0].placeName : ""}
              />
              <APIProvider apiKey={import.meta.env.GOOGLE_MAPS_API_KEY || ""}>
                <Map
                  style={{width: '100vw', height: '100vh'}}
                  defaultCenter={{lat: 22.54992, lng: 0}}
                  defaultZoom={3}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                />
              </APIProvider>
              <div className={styles.edit_button} onClick={clickSaveButton}>保存</div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

function validateGoogleLocationProfileModel(name: string, year?: string, month?: string, day?: string): boolean {
  if (!year || !month || !day) return false

  switch (name) {
    case "openInfo": {
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
      if (monthNumber < 1 || monthNumber > 12) {
        return false;
      }
      if (dayNumber < 1 || dayNumber > 31) {
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
      return {
        openInfo: {
          openingDate: {
            year: year,
            month: month,
            day: day
          }
        }
      }
    default:
      return {}
  }
}