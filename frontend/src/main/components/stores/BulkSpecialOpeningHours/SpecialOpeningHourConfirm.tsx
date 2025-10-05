import SelectedStoreList from '../SelectStore/SelectedStoreList'
import styles from '@/main/components/stores/BulkSpecialOpeningHours/SpecialOpeningHourConfirm.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Button from '@/main/common/Button'
import Separator from '@/main/common/Separator'

type Props = {
    selectedStores: string[];
    selectedDate: string;
    timeRanges: string[];
    onNextClick: () => void;
    onBackClick: () => void;
    onStoreEditClick: () => void;
};

export default function SpecialOpeningHourConfirm({ onNextClick, onBackClick, onStoreEditClick, selectedStores, selectedDate, timeRanges }: Props) {

  return (
    <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
      <Wrapper direction="col" align="align-start" gap="5rem">
        <Typography content="特別営業時間を設定" color="primary" size="medium" />
        <Separator width="100%" />
        <SelectedStoreList selectedStores={selectedStores} onBackClick={onStoreEditClick} />
        <Wrapper direction="col" gap="3rem">
          <Typography content="特別営業時間" color="primary" size="normal" />
          <Wrapper gap="1rem" align="align-end">
            <Wrapper padding="2rem" className={styles.selected_hours_container_wrapper}>
              <Wrapper direction="col" padding="0 12.9rem 0 1rem" className={styles.selected_hours_container}>
                <Typography content={selectedDate} color="primary" size="normal" weight="normal" />
                {timeRanges.map((time, index) => (
                  <Typography content={time} color="primary" size="normal" key={index} weight="normal" />
                ))}
              </Wrapper>
            </Wrapper>
            <Button bgColor="primary" padding="0.7rem" className={styles.back_button} onClick={onBackClick}>
              <Typography content="編集" color="primary" size="normal" />
            </Button>
          </Wrapper>
        </Wrapper>
        <Wrapper gap="4rem" align="align-start">
          <Button bgColor="secondary" padding="0.7rem 3.4rem" onClick={onBackClick}>
            <Typography content="修正する" color="primary" size="normal" weight="normal" />
          </Button>
          <Button bgColor="primary" padding="0.7rem 3.5rem" onClick={onNextClick}>
            <Typography content="設定を登録" color="primary" size="normal" weight="normal" />
          </Button>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}
