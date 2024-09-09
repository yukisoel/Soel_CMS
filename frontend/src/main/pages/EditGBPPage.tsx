import styles from '@/main/pages/EditGBPPage.module.scss'
import SidebarMenu from "@/main/common/SidebarMenu.tsx";

export default function EditGBPPage() {
  return(
    <>
      <div className={styles.page_container}>
        <SidebarMenu email={'dummyEmail.sample.jp'} />
        <div>
          ページ編集 / GBP
        </div>
      </div>
    </>
  )
}