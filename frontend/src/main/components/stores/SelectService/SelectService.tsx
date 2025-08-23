import SelectedStoreList from '../SelectStore/SelectedStoreList'
import ServiceSelector from './ServiceSelector'
import { SelectServiceForm } from './useSelectService'
import styles from '@/main/components/stores/SelectService/SelectService.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Button from '@/main/common/Button'

type Props = {
    selectedStores: string[];
    selectServiceForms: SelectServiceForm[];
    onFormCheckedChange: (index: number) => void;
    onLanguageCheckedChange: (formIndex: number, langIndex: number) => void;
    onOptionCheckedChange: (formIndex: number, optionIndex: number) => void;
    onNextClick: () => void;
    onBackClick: () => void;
    isNextButtonDisabled: boolean;
};

export default function SelectService({
  selectedStores,
  selectServiceForms,
  onFormCheckedChange,
  onLanguageCheckedChange,
  onOptionCheckedChange,
  onNextClick,
  onBackClick,
  isNextButtonDisabled
}: Props) {
  return (
    <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
      <Wrapper direction="col" gap="5rem">
        <Typography content="投稿するサービスを選択" color="primary" size="medium" />
        <SelectedStoreList selectedStores={selectedStores} onBackClick={onBackClick} />
      </Wrapper>
      <Wrapper direction="col" padding="4rem 0" gap="2rem">
        <Typography content="投稿先サービスの選択" color="primary" size="normal" />
        {selectServiceForms.map((service, index) => (
          <ServiceSelector
            key={service.value}
            selectServiceForm={service}
            onFormCheckedChange={() => onFormCheckedChange(index)}
            onLanguageCheckedChange={(langIndex: number) => onLanguageCheckedChange(index, langIndex)}
            onOptionCheckedChange={(optionIndex: number) => onOptionCheckedChange(index, optionIndex)}
          />
        ))}
      </Wrapper>
      <Wrapper direction="col" gap="8rem">
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
  )
}
