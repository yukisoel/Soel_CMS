import { Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import styles from '@/main/pages/EditPage.module.scss'
import ButtonBackIcon from '@/main/assets/Button_Back.svg'
import SidebarMenu from '@/main/common/SidebarMenu.tsx'
import Pankuzu from '@/main/common/Pankuzu.tsx'
import { PankuzuItemListContext } from '@/main/contexts/PankuzuItemListContext.tsx'

export type Props = {
  email: string
}

export default function EditPage({ email }: Props) {
  const { pankuzuItemList } = useContext(PankuzuItemListContext)
  const navigate = useNavigate()
  return (
    <>
      <div className={styles.page_container}>
        <SidebarMenu
          email={email}
        />
        <div className={styles.main_container}>
          <div className={styles.main_header}>
            <div className={styles.button_back_container}>
              <Pankuzu pankuzuItemList={pankuzuItemList}/>
              <img src={ButtonBackIcon} alt={'button_back'} onClick={() => navigate(-1)} />
            </div>
          </div>
          <Outlet/>
        </div>
      </div>
    </>
  )
}