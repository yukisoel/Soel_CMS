import styles from '@/main/components/editPage/EditProfileLayout.module.scss'
import {useContext, useEffect, useState} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import EditProfileTerm, {TermType} from "@/main/components/editPage/EditProfileTerm.tsx";
import {EditBusinessHoursTerm} from "@/main/components/editPage/EditBusinessHoursTerm.tsx";

enum Tabs {
  Overview = '概要',
  Contact = '連絡先',
  Location = '所在地',
  BusinessHours = '営業時間',
  Other = 'その他'
}

export default function EditProfileLayout() {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.Overview)
  const [currentEditTerm, setCurrentEditTerm] = useState<string | null>(null)

  const {setPankuzuItemList} = useContext(PankuzuItemListContext)

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

  useEffect(() => {
    setPankuzuItemList([{name: 'ページ編集', path: '/edit'}, {
      name: 'GBP',
      path: '/edit/gbp'
    }, {name: 'プロフィール編集', path: '/edit/profile'}])
  }, [])
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
            <EditProfileTerm name={"title"} title={"ビジネス名"} content={"SOELグルメ通り店"} editTerm={currentEditTerm}
                             setEditTerm={setCurrentEditTerm}/>
            <EditProfileTerm name={"categories"} title={"ビジネスカテゴリ"}
                             content={"寿司店, 回転寿司店, テイクアウト寿司店, シーフード・海鮮料理店, 和食店"}
                             editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}/>
            <EditProfileTerm name={"description"} title={"説明"} type={TermType.TEXTAREA}
                             content={"こだわりが廻るグルメ回転寿司。こころを握る美味しい時間。日本海の魚介を職人の目利きで仕入れ、さばき、握る。米、醤油、調味料はもちろん、国産の割箸にまでこだわる。安心して美味しい寿司を召し上がっていただ..."}
                             editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}/>
            <EditProfileTerm name={"openDate"} title={"開業日"} content={"2024年8月26日"} editTerm={currentEditTerm}
                             setEditTerm={setCurrentEditTerm}/>
          </>
        }
        {selectedTab === Tabs.Contact &&
          <>
            <EditProfileTerm name={"phoneNumber"} title={"電話番号"} content={"03-1234-5678"} editTerm={currentEditTerm}
                             setEditTerm={setCurrentEditTerm}/>
            <EditProfileTerm name={"websiteUri"} title={"ウェブサイト"} content={"https://soelgourmet.com"}
                             editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}/>
            <EditProfileTerm name={"snsLinks"} title={"SNSリンク"}
                             content={"https://twitter.com/soel \n https://twitter.com/soel \n https://twitter.com/soel"}
                             editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}/>
          </>
        }
        {selectedTab === Tabs.Location &&
          <>
            <EditProfileTerm name={"storefrontAddress"} title={"店舗の住所"}
                             content={"〒123-4567 東京都港区六本木1-2-3"} editTerm={currentEditTerm}
                             setEditTerm={setCurrentEditTerm}/>
            <EditProfileTerm name={"serviceArea"} title={"サービス提供地域"} content={"東京都日野市"}
                             editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}/>
          </>
        }
        {selectedTab === Tabs.BusinessHours &&
          <>
            {currentEditTerm === null &&
              <>
                <EditProfileTerm name={"regularHours"} isDeleteButton={true} title={"通常営業時間"}
                                 content={"月曜日 11:00 - 22:00, 火曜日 11:00 - 22:00, 水曜日 11:00 - 22:00, 木曜日 11:00 - 22:00, 金曜日 11:00 - 22:00, 土曜日 11:00 - 22:00, 日曜日 11:00 - 22:00"}
                                 editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}/>
                <EditProfileTerm name={"lunchHours"} isDeleteButton={true} title={"ランチ営業時間"}
                                 content={"月曜日 11:00 - 15:00, 火曜日 11:00 - 15:00, 水曜日 11:00 - 15:00, 木曜日 11:00 - 15:00, 金曜日 11:00 - 15:00, 土曜日 11:00 - 15:00, 日曜日 11:00 - 15:00"}
                                 editTerm={currentEditTerm} setEditTerm={setCurrentEditTerm}/>
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
            <EditProfileTerm name={"other1"} content={"ビジネス所有者情報"} editTerm={currentEditTerm}
                             setEditTerm={setCurrentEditTerm}/>
            <EditProfileTerm name={"other2"} content={"サービス"} editTerm={currentEditTerm}
                             setEditTerm={setCurrentEditTerm}/>
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