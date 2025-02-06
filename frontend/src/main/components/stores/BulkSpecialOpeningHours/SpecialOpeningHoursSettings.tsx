import styles from "@/main/components/stores/BulkSpecialOpeningHours/SpecialOpeningHoursSettings.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SelectedStoreList from "../SelectStore/SelectedStoreList";
import Button from "@/main/common/Button";
import ToggleButton from "@/main/common/ToggleButton";
import DatePicker from "@/main/common/DatePicker/DatePicker";
import TimePicker from "@/main/common/TimePicker/TimePicker";

type Props = {
    selectedStores: string[]
    onNextClick: () => void
    onBackClick: () => void
};

export default function SpecialOpeningHoursSettings({ onNextClick, onBackClick, selectedStores}: Props) {
    return (
        <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
            <Wrapper direction="col" align="align-start" gap="5rem">
                <Typography content="特別営業時間を設定" color="primary" size="medium" />
                <SelectedStoreList selectedStores={selectedStores} onBackClick={onBackClick} />
                <Wrapper direction="col" gap="3rem">
                    <Typography content="営業時間を設定" color="primary" size="normal" />
                    <Wrapper direction="row" align="align-center" gap="0.8rem">
                        <Typography content="休業に設定" color="primary" size="normal" />
                        <ToggleButton />
                    </Wrapper>
                    <Wrapper gap="2rem">
                        <DatePicker onChange={() => {}} />
                        <TimePicker onChange={() => {}} />
                        <TimePicker onChange={() => {}} />
                    </Wrapper>
                </Wrapper>
                <Wrapper direction="col" gap="4rem" align="align-start">
                    <Button bgColor="primary" padding="0.7rem 3.5rem" onClick={onNextClick}>
                        <Typography content="次に進む" color="primary" size="normal" />
                    </Button>
                    <Button bgColor="secondary" padding="0.7rem 3.4rem" onClick={onBackClick}>
                        <Typography content="戻る" color="primary" size="normal" />
                    </Button>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    );
}
