import styles from "@/main/components/stores/SelectStore/SelectStore.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import BrandSelector from "./BrandSelector";
import AreaSelector from "./AreaSelector";
import Button from "@/main/common/Button";
import Separator from "@/main/common/Separator";

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
  onNextClick: () => void
  onBackClick: () => void
  isNextButtonDisabled: boolean
  mode: 'brand' | 'area'
}

export default function SelectStore({areaSelectorProps, brandSelectorProps, onChangeSelectedBranches, onNextClick, onBackClick, isNextButtonDisabled, mode}: Props) {

  return (
    <>
      <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
        <Wrapper direction="col" gap="5rem">
          <Typography content="投稿する店舗を選択" color="primary" size="medium" />
          <Wrapper direction="col" gap="1rem">
            <Typography content={mode === 'brand' ? 'ブランドから選択' : 'エリアから選択'} color="primary" size="normal" />
            <Separator />
          </Wrapper>
        </Wrapper>
        {
          mode === 'brand' && (
            <BrandSelector stores={brandSelectorProps} onChangeSelectedBranches={onChangeSelectedBranches} />
          )
        }
        {
          mode === 'area' && (
            <AreaSelector regions={areaSelectorProps} onChangeSelectedBranches={onChangeSelectedBranches} />
          )
        }
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
