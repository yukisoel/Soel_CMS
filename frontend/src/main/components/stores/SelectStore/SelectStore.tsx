import styles from "@/main/components/stores/SelectStore/SelectStore.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import { useAdvancedTabs } from "@/main/common/AdvancedTabs/useAdvancedTabs";
import BrandSelector from "./BrandSelector";
import AreaSelector from "./AreaSelector";
import Button from "@/main/common/Button";

export type Branch = {
  id: string
  name: string
  checked: boolean
}

export type Store = {
  name: string
  branches: Branch[]
  checked: boolean
}

export type Prefecture = {
  name: string
  stores: Store[]
  checked: boolean
}

export type Region = {
  name: string
  prefectures: Prefecture[]
  checked: boolean
}

type Props = {
  areaSelectorProps: Region[]
  brandSelectorProps: Store[]
  onChangeSelectedBranches: (branches: Branch[]) => void
}

export default function SelectStore({areaSelectorProps, brandSelectorProps, onChangeSelectedBranches}: Props) {
  const { selectedTab, tabsRender } = useAdvancedTabs([
    {tabKey: 'brand', content: 'ブランドから選択'},
    {tabKey: 'area', content: 'エリアから選択'}
  ])

  return (
    <>
      <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
        <Wrapper direction="col" gap="5rem">
          <Typography content="投稿する店舗を選択" color="primary" size="medium" />
          {tabsRender()}
        </Wrapper>
        {
          selectedTab === 'brand' && (
            <BrandSelector stores={brandSelectorProps} onChangeSelectedBranches={onChangeSelectedBranches} />
          )
        }
        {
          selectedTab === 'area' && (
            <AreaSelector regions={areaSelectorProps} onChangeSelectedBranches={onChangeSelectedBranches} />
          )
        }
        <Wrapper direction="col" padding="5rem 0 0" gap="8.1rem">
          <Wrapper>
            <Button bgColor="primary" padding="0.7rem 3.5rem" className={styles.button}>
              <Typography content="次に進む" color="primary" size="normal" />
            </Button>
          </Wrapper>
          <Wrapper>
            <Button bgColor="secondary" padding="0.7rem 3.5rem" className={styles.button}>
              <Typography content="戻る" color="primary" size="normal" />
            </Button>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </>
  )
}
