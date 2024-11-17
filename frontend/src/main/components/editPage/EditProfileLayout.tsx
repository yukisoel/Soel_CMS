import styles from '@/main/components/editPage/EditProfileLayout.module.scss'
import {useContext, useEffect, useState} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import EditProfileTerm, {TermType} from "@/main/components/editPage/EditProfileTerm.tsx";
import {EditBusinessHoursTerm} from "@/main/components/editPage/EditBusinessHoursTerm.tsx";
import {GoogleSelectedLocationContext} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {useParams} from "react-router-dom";
import {GoogleService} from "@/main/service/GoogleService.ts";
import {GoogleLocationProfileModel} from "@/main/model/LocationModel.ts";
import EditProfileOpenDateTerm from "@/main/components/editPage/EditProfileOpenDateTerm.tsx";
import EditProfileServiceAreaTerm from "@/main/components/editPage/EditProfileServiceAreaTerm.tsx";

enum Tabs {
  Overview = '概要',
  Contact = '連絡先',
  Location = '所在地',
  BusinessHours = '営業時間',
  Other = 'その他'
}

type Props = {
  googleService: GoogleService
}

export default function EditProfileLayout({googleService}: Props) {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.Overview)
  const [currentEditTerm, setCurrentEditTerm] = useState<string | null>(null)
  const [googleLocationProfileObject, setGoogleLocationProfileObject] = useState<GoogleLocationProfileModel | null>(null)

  const {setPankuzuItemList} = useContext(PankuzuItemListContext)
  const {googleSelectedLocation, setGoogleSelectedLocation} = useContext(GoogleSelectedLocationContext)

  const {locationId} = useParams()

  useEffect(() => {
    setPankuzuItemList([
      {name: 'ページ編集', path: '/edit'},
      {name: 'GBP', path: '/edit/gbp'},
      {name: 'プロフィール編集', path: '/edit/profile'}])
    if (googleSelectedLocation.name === "" && locationId) {
      googleService.getLocation(locationId).then(location => {
        setGoogleSelectedLocation(location)
      })
    }
    if (locationId) {
      googleService.getLocationProfile(locationId).then(locationProfile => {
        setGoogleLocationProfileObject(locationProfile)
      })
    }
  }, [])

  const getTabClassName = (tab: Tabs) => {
    if (selectedTab === tab) {
      return styles.tab_selected
    } else {
      return styles.tab
    }
  }

  const handleClickTab = (tab: Tabs) => {
    setSelectedTab(tab)
    setCurrentEditTerm(null)
  }

  console.log({googleLocationProfileObject})

  return (
    <div className={styles.profile_container}>
      <div className={styles.tab_container}>
        <div className={styles.tab_wrapper}>
          <div className={getTabClassName(Tabs.Overview)} onClick={() => handleClickTab(Tabs.Overview)}>概要</div>
          <div className={getTabClassName(Tabs.Contact)} onClick={() => handleClickTab(Tabs.Contact)}>連絡先</div>
          <div className={getTabClassName(Tabs.Location)} onClick={() => handleClickTab(Tabs.Location)}>所在地</div>
          <div className={getTabClassName(Tabs.BusinessHours)}
               onClick={() => handleClickTab(Tabs.BusinessHours)}>営業時間
          </div>
          <div className={getTabClassName(Tabs.Other)} onClick={() => handleClickTab(Tabs.Other)}>その他</div>
        </div>
      </div>
      <div className={styles.term_container}>
        {selectedTab === Tabs.Overview &&
          <>
            <EditProfileTerm name={"title"} title={"ビジネス名"} content={googleLocationProfileObject?.title}
                             setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                             editTerm={currentEditTerm}
                             setEditTerm={setCurrentEditTerm}
                             googleService={googleService}/>
            <EditProfileTerm name={"categories"} title={"ビジネスカテゴリ"}
                             content={googleLocationProfileObject?.categories?.primaryCategory?.displayName}
                             setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                             editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}
                             googleService={googleService}/>
            <EditProfileTerm name={"profile.description"} title={"説明"} type={TermType.TEXTAREA}
                             content={googleLocationProfileObject?.profile?.description}
                             setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                             editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}
                             googleService={googleService}/>
            <EditProfileOpenDateTerm name={"openInfo"} title={"開業日"}
                                     year={googleLocationProfileObject?.openInfo?.openingDate?.year}
                                     month={googleLocationProfileObject?.openInfo?.openingDate?.month}
                                     day={googleLocationProfileObject?.openInfo?.openingDate?.day}
                                     setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                                     editTerm={currentEditTerm}
                                     setEditTerm={setCurrentEditTerm}
                                     googleService={googleService}/>
          </>
        }
        {selectedTab === Tabs.Contact &&
          <>
            <EditProfileTerm name={"phoneNumbers.primaryPhone"} title={"電話番号"}
                             content={googleLocationProfileObject?.phoneNumbers?.primaryPhone}
                             setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                             editTerm={currentEditTerm}
                             setEditTerm={setCurrentEditTerm}
                             googleService={googleService}/>
            <EditProfileTerm name={"websiteUri"} title={"ウェブサイト"}
                             content={googleLocationProfileObject?.websiteUri}
                             setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                             editTerm={currentEditTerm}
                             setEditTerm={setCurrentEditTerm}
                             googleService={googleService}/>
            <EditProfileTerm name={"snsLinks"} title={"SNSリンク"}
                             content={"https://twitter.com/soel \n https://twitter.com/soel \n https://twitter.com/soel"}
                             setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                             editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}
                             googleService={googleService}/>
          </>
        }
        {selectedTab === Tabs.Location &&
          <>
            <EditProfileTerm name={"storefrontAddress"} title={"店舗の住所"}
                             content={"〒123-4567 東京都港区六本木1-2-3"}
                             setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                             editTerm={currentEditTerm}
                             setEditTerm={setCurrentEditTerm}
                             googleService={googleService}/>
            <EditProfileServiceAreaTerm name={"serviceArea"} title={"サービス提供地域"}
                                        placeInfos={googleLocationProfileObject?.serviceArea?.places?.placeInfos}
                                        setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                                        editTerm={currentEditTerm}
                                        setEditTerm={setCurrentEditTerm}
                                        googleService={googleService}/>
          </>
        }
        {selectedTab === Tabs.BusinessHours &&
          <>
            {currentEditTerm === null &&
              <>
                <EditProfileTerm name={"regularHours"} isDeleteButton={true} title={"通常営業時間"}
                                 content={"月曜日 11:00 - 22:00, 火曜日 11:00 - 22:00, 水曜日 11:00 - 22:00, 木曜日 11:00 - 22:00, 金曜日 11:00 - 22:00, 土曜日 11:00 - 22:00, 日曜日 11:00 - 22:00"}
                                 setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                                 editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}
                                 googleService={googleService}/>
                <EditProfileTerm name={"lunchHours"} isDeleteButton={true} title={"ランチ営業時間"}
                                 content={"月曜日 11:00 - 15:00, 火曜日 11:00 - 15:00, 水曜日 11:00 - 15:00, 木曜日 11:00 - 15:00, 金曜日 11:00 - 15:00, 土曜日 11:00 - 15:00, 日曜日 11:00 - 15:00"}
                                 setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                                 editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}
                                 googleService={googleService}/>
                <div className={styles.term_wrapper}>
                  <div className={styles.term}>
                    <div className={styles.term_title}>その他の営業時間を追加</div>
                    <div className={styles.tag_container}>
                      <OtherBusinessHoursTag tag={"オンラインサービスの提供時間"}/>
                      <OtherBusinessHoursTag tag={"テイクアウト"}/>
                      <OtherBusinessHoursTag tag={"ディナー"}/>
                      <OtherBusinessHoursTag tag={"ドライブスルー"}/>
                      <OtherBusinessHoursTag tag={"ハッピーアワー"}/>
                      <OtherBusinessHoursTag tag={"ブランチ"}/>
                      <OtherBusinessHoursTag tag={"入店可能時間"}/>
                      <OtherBusinessHoursTag tag={"宅配"}/>
                      <OtherBusinessHoursTag tag={"朝食"}/>
                      <OtherBusinessHoursTag tag={"高齢者限定時間帯"}/>
                    </div>
                  </div>
                </div>
              </>
            }
            {currentEditTerm !== null &&
              <>
                <EditBusinessHoursTerm name={"regularHours"} title={"通常営業時間"} businessHoursList={[]}
                                       editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}/>
                <EditBusinessHoursTerm name={"lunchHours"} title={"ランチ営業時間"} businessHoursList={[]}
                                       editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}/>
              </>
            }
          </>
        }
        {selectedTab === Tabs.Other &&
          <>
            <EditProfileTerm name={"other1"} content={"ビジネス所有者情報"}
                             setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                             editTerm={currentEditTerm}
                             setEditTerm={setCurrentEditTerm}
                             googleService={googleService}/>
            <EditProfileTerm name={"other2"} content={"サービス"}
                             setGoogleLocationProfileObject={setGoogleLocationProfileObject}
                             editTerm={currentEditTerm}
                             setEditTerm={setCurrentEditTerm}
                             googleService={googleService}/>
          </>
        }
      </div>
    </div>
  )
}

function OtherBusinessHoursTag({tag}: { tag: string }) {
  return (
    <div className={styles.tag}>
      + {tag}
    </div>
  )
}