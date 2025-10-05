import AreaSelectorSingle from './AreaSelectorSingle'
import BrandSelectorSingle from './BrandSelectorSingle'
import styles from './SelectStoreSingle.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Button from '@/main/common/Button'
import { useAdvancedTabs } from '@/main/common/AdvancedTabs/useAdvancedTabs'

export type Branch = {
    id: string
    name: string
}

export type Store = {
    name: string
    branches: Branch[]
}

export type Prefecture = {
    name: string
    stores: Store[]
}

export type Region = {
    name: string
    prefectures: Prefecture[]
}

type Props = {
    areaSelectorProps: Region[];
    brandSelectorProps: Store[];
    onChangeSelectedBranch: (branch: Branch) => void;
    onNextClick: () => void;
    onBackClick: () => void;
    isNextButtonDisabled: boolean;
};

export default function SelectStoreSingle({ areaSelectorProps, brandSelectorProps, onChangeSelectedBranch, onNextClick, onBackClick, isNextButtonDisabled }: Props) {
  const { selectedTab, tabsRender } = useAdvancedTabs([
    { tabKey: 'brand', content: 'ブランドから選択' },
    { tabKey: 'area', content: 'エリアから選択' }
  ])

  return (
    <>
      <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
        <Wrapper direction="col" gap="5rem">
          <Typography content="投稿する店舗を選択" color="primary" size="medium" />
          {tabsRender()}
        </Wrapper>
        {selectedTab === 'brand' && (
          <BrandSelectorSingle stores={brandSelectorProps} onChangeSelectedBranch={onChangeSelectedBranch} />
        )}
        {selectedTab === 'area' && (
          <AreaSelectorSingle regions={areaSelectorProps} onChangeSelectedBranch={onChangeSelectedBranch} />
        )}
        <Wrapper direction="col" padding="5rem 0 0" gap="8.1rem">
          <Wrapper>
            <Button bgColor="primary" padding="0.7rem 3.5rem" className={styles.button} onClick={onNextClick} disabled={isNextButtonDisabled}>
              <Typography content="次に進む" color="primary" size="normal" />
            </Button>
          </Wrapper>
          <Wrapper>
            <Button bgColor="secondary" padding="0.7rem 3.5rem" className={styles.button} onClick={onBackClick}>
              <Typography content="戻る" color="primary" size="normal" />
            </Button>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </>
  )
}
