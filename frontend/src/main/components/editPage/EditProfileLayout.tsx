import styles from '@/main/components/editPage/EditProfileLayout.module.scss'
import {useContext, useEffect, useState} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";
import EditProfileTerm from "@/main/components/editPage/EditProfileTerm.tsx";

enum Tabs {
  Overview = '概要',
  Contact = '連絡先',
  Location = '所在地',
  BusinessHours = '営業時間',
  Other = 'その他'
}

export default function EditProfileLayout() {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.Overview)
  const {setPankuzuItemList} = useContext(PankuzuItemListContext)

  const getTabClassName = (tab: Tabs) => {
    if (selectedTab === tab) {
      return styles.tab_selected
    } else {
      return styles.tab
    }
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
          <div className={getTabClassName(Tabs.Overview)} onClick={() => setSelectedTab(Tabs.Overview)}>概要</div>
          <div className={getTabClassName(Tabs.Contact)} onClick={() => setSelectedTab(Tabs.Contact)}>連絡先</div>
          <div className={getTabClassName(Tabs.Location)} onClick={() => setSelectedTab(Tabs.Location)}>所在地</div>
          <div className={getTabClassName(Tabs.BusinessHours)}
               onClick={() => setSelectedTab(Tabs.BusinessHours)}>営業時間
          </div>
          <div className={getTabClassName(Tabs.Other)} onClick={() => setSelectedTab(Tabs.Other)}>その他</div>
        </div>
      </div>
      <div className={styles.term_container}>
        {selectedTab === Tabs.Overview &&
          <>
            <EditProfileTerm title={"ビジネス名"} content={"SOELグルメ通り店"}/>
            <EditProfileTerm title={"ビジネスカテゴリ"}
                             content={"寿司店, 回転寿司店, テイクアウト寿司店, シーフード・海鮮料理店, 和食店"}/>
            <EditProfileTerm title={"説明"}
                             content={"こだわりが廻るグルメ回転寿司。こころを握る美味しい時間。日本海の魚介を職人の目利きで仕入れ、さばき、握る。米、醤油、調味料はもちろん、国産の割箸にまでこだわる。安心して美味しい寿司を召し上がっていただ..."}/>
            <EditProfileTerm title={"開業日"} content={"2024年8月26日"}/>
          </>
        }
        {selectedTab === Tabs.Contact &&
          <>
            <EditProfileTerm title={"電話番号"} content={"03-1234-5678"}/>
            <EditProfileTerm title={"ウェブサイト"} content={"https://soelgourmet.com"}/>
            <EditProfileTerm title={"SNSリンク"}
                             content={"https://twitter.com/soel \n https://twitter.com/soel \n https://twitter.com/soel"}/>
          </>
        }
        {selectedTab === Tabs.Location &&
          <>
            <EditProfileTerm title={"店舗の住所"} content={"〒123-4567 東京都港区六本木1-2-3"}/>
            <EditProfileTerm title={"サービス提供地域"} content={"東京都日野市"}/>
          </>
        }
        {selectedTab === Tabs.BusinessHours &&
          <>
            <EditProfileTerm isDeleteButton={true} title={"通常営業時間"}
                             content={"月曜日 11:00 - 22:00, 火曜日 11:00 - 22:00, 水曜日 11:00 - 22:00, 木曜日 11:00 - 22:00, 金曜日 11:00 - 22:00, 土曜日 11:00 - 22:00, 日曜日 11:00 - 22:00"}/>
            <EditProfileTerm isDeleteButton={true} title={"ランチ営業時間"}
                             content={"月曜日 11:00 - 15:00, 火曜日 11:00 - 15:00, 水曜日 11:00 - 15:00, 木曜日 11:00 - 15:00, 金曜日 11:00 - 15:00, 土曜日 11:00 - 15:00, 日曜日 11:00 - 15:00"}/>
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
        {selectedTab === Tabs.Other &&
          <>
            <EditProfileTerm content={"ビジネス所有者情報"} />
            <EditProfileTerm content={"サービス"} />
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