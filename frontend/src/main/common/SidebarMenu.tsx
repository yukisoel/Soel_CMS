import styles from '@/main/common/SidebarMenu.module.scss'
import LogoIcon from '@/main/assets/Logo.svg'
import HomeIcon from '@/main/assets/HomeIcon.svg'
import EditorIcon from '@/main/assets/EditorIcon.svg'
import AdManageIcon from '@/main/assets/AdManageIcon.svg'
import ReviewIcon from '@/main/assets/ReviewIcon.svg'
import StoreMangeIcon from '@/main/assets/StoreManageIcon.svg'
import {useState} from "react";
import classNames from "classnames";

export type Props = {
  email: string
}

export default function SidebarMenu({email}: Props) {
  const [selectedMenu, _setSelectedMenu] = useState<string>('editor')
  return (
    <>
      <div data-testid="sidebar_menu_container" className={styles.sidebar_menu_container}>
        <div className={styles.logo_container}>
          <img src={LogoIcon} alt={'logo'} className={styles.logo}/>
        </div>
        <div className={styles.main_menu_container}>
          <div className={styles.menu_container}>
            <div className={styles.menu_icon}>
              <img src={HomeIcon} alt={'home_icon'}/>
            </div>
            <div className={styles.menu_text}>
              メインページ
            </div>
          </div>
          {/*<div className={styles.menu_container}>*/}
          <div className={classNames(styles.menu_container, {
            [styles.selected_menu_background]: selectedMenu === 'editor'
          })}>
            <div className={styles.menu_icon}>
              <img src={EditorIcon} alt={'editor_icon'}/>
            </div>
            <div className={styles.menu_text}>
              ページ編集
            </div>
          </div>
          <div className={styles.menu_container}>
            <div className={styles.menu_icon}>
              <img src={AdManageIcon} alt={'ad_manage_icon'}/>
            </div>
            <div className={styles.menu_text}>
              広告管理
            </div>
          </div>
          <div className={styles.menu_container}>
            <div className={styles.menu_icon}>
              <img src={ReviewIcon} alt={'review_icon'}/>
            </div>
            <div className={styles.menu_text}>
              口コミ管理
            </div>
          </div>
          <div className={styles.menu_container}>
            <div className={styles.menu_icon}>
              <img src={StoreMangeIcon} alt={'store_manage_icon'}/>
            </div>
            <div className={styles.menu_text}>
              店舗管理
            </div>
          </div>
        </div>

        <div className={styles.bottom_menu_container}>
          <div className={`${styles.bottom_menu} ${styles.background_grey}`}>
            お問い合わせ
          </div>
          <div className={`${styles.bottom_menu} ${styles.background_yellow}`}>
            {email}
          </div>
        </div>
      </div>
    </>
  )
}