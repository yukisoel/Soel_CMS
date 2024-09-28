import styles from '@/main/components/editPage/EditProfileLayout.module.scss'
import {useContext, useEffect, useState} from "react";
import {PankuzuItemListContext} from "@/main/contexts/PankuzuItemListContext.tsx";

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
      <div>
        {selectedTab === Tabs.Overview && <div>概要</div>}
        {selectedTab === Tabs.Contact && <div>連絡先</div>}
        {selectedTab === Tabs.Location && <div>所在地</div>}
        {selectedTab === Tabs.BusinessHours && <div>営業時間</div>}
        {selectedTab === Tabs.Other && <div>その他</div>}
      </div>
    </div>
  )
}