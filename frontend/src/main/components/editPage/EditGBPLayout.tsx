import styles from '@/main/components/editPage/EditGBPLayout.module.scss'
import EditHeader from "@/main/components/editPage/EditHeader.tsx";
import {Outlet} from "react-router-dom";

export default function EditGBPLayout() {

  return(
    <>
      <div data-testid={"window_edit_gbp_container"} className={styles.contents_container}>
        <EditHeader />
        <Outlet/>
      </div>
    </>
  )
}