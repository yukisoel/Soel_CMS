import styles from "@/main/components/stores/SelectStore.module.scss";
import {GoogleService} from "@/main/service/GoogleService.ts";
import AdvancedSidebarMenu from "@/main/common/AdvancedSidebarMenu";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import { useAdvancedTabs } from "@/main/common/AdvancedTabs/useAdvancedTabs";

type Props = {
  googleService: GoogleService
}

export default function SearchStore({googleService}: Props) {
  const { tabsRender } = useAdvancedTabs([
    {tabKey: 'brand', content: 'ブランドから選択'},
    {tabKey: 'area', content: 'エリアから選択'}
  ])
  return (
    <Wrapper className={styles.wrapper}>
      <AdvancedSidebarMenu />
      <Wrapper direction="col" gap="5rem" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
        <Typography content="投稿する店舗を選択" color="primary" size="medium" />
        {tabsRender()}
      </Wrapper>
    </Wrapper>
  )
}
