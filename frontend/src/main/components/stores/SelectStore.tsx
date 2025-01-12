import styles from "@/main/components/stores/SelectStore.module.scss";
import {GoogleService} from "@/main/service/GoogleService.ts";
import AdvancedSidebarMenu from "@/main/common/AdvancedSidebarMenu";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import { useAdvancedTabs } from "@/main/common/AdvancedTabs/useAdvancedTabs";
import SearchBox from "@/main/common/SearchBox";
import Checkbox from "@/main/common/Checkbox";

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
        <SearchBox placeholder="店舗名を検索" onChange={() => {}} width="42.7rem" />
        <Checkbox supplementaryText="全ての店舗" onChange={() => {}} />
        <Checkbox label="鳥貴族" onChange={() => {}} />
        <Checkbox label="鳥貴族" supplementaryText="(1000店舗)" onChange={() => {}} />
        <div style={{width: "200px"}}>
        <Checkbox label="文字数が多い店舗は改行したいです。" onChange={() => {}} />
        </div>
      </Wrapper>
    </Wrapper>
  )
}
