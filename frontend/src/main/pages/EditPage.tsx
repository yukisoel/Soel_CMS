import styles from '@/main/pages/EditPage.module.scss'
import ButtonBackIcon from "@/main/assets/Button_Back.svg";
import SidebarMenu from "@/main/common/SidebarMenu.tsx";

export type Props = {
  email: string
  children: React.ReactNode
}

export default function EditPage({email,  children}: Props) {


  return (
    <>
      <div className={styles.page_container}>
        <SidebarMenu
          email={email}
        />
        <div className={styles.main_container}>
          <div className={styles.main_header}>
            <div className={styles.pankuzu}>ページ編集 /</div>
            <div className={styles.button_back_container}>
              <img src={ButtonBackIcon} alt={'button_back'}/>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}