import styles from '@/main/pages/EditPageAdvanced.module.scss'
import { Outlet } from "react-router-dom";
import Wrapper from '../common/Wrapper';
import AdvancedSidebarMenu from '../common/AdvancedSidebarMenu';

export default function EditPageAdvanced() {
  return (
    <Wrapper className={styles.wrapper}>
          <div className={styles.sidebar}>
            <AdvancedSidebarMenu />
          </div>
          <div className={styles.content}>
            <Outlet />
          </div>
    </Wrapper>
  )
}
