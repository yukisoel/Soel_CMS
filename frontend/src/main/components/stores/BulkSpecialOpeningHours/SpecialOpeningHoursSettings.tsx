import styles from "@/main/components/stores/BulkSpecialOpeningHours/SpecialOpeningHoursSettings.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SelectedStoreList from "../SelectStore/SelectedStoreList";
import Button from "@/main/common/Button";
import ToggleButton from "@/main/common/ToggleButton";
import DatePicker from "@/main/common/DatePicker/DatePicker";
import TimePicker from "@/main/common/TimePicker/TimePicker";
import CloseIcon from '@/main/assets/CloseIcon.svg';

export type TimeRange = {
    start: Date | null;
    end: Date | null;
};

type Props = {
    selectedStores: string[];
    selectedDate: Date | null;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>
    timeRanges: TimeRange[];
    setTimeRanges: React.Dispatch<React.SetStateAction<TimeRange[]>>
    onNextClick: () => void;
    onBackClick: () => void;
};

export default function SpecialOpeningHoursSettings({ onNextClick, onBackClick, selectedStores, selectedDate, setSelectedDate, timeRanges, setTimeRanges }: Props) {
    const handleAddTimeRange = () => {
        setTimeRanges([...timeRanges, { start: null, end: null }]);
    };

    const handleRemoveTimeRange = (index: number) => {
        setTimeRanges((prevTimeRanges) => prevTimeRanges.filter((_, i) => i !== index));
    };

    const handleTimeChange = (index: number, type: 'start' | 'end', date: Date | null) => {
        setTimeRanges((prevTimeRanges) => {
            const newTimeRanges = [...prevTimeRanges];
            newTimeRanges[index][type] = date;
            return newTimeRanges;
        });
    };

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
                    <Wrapper gap="2rem" align="align-start">
                        <DatePicker defaultValue={selectedDate} onChange={setSelectedDate} />
                        <Wrapper direction="col" gap="2rem" align="align-start">
                            {timeRanges.map((timeRange, index) => (
                                <Wrapper key={index} direction="row" gap="1rem" align="align-center">
                                    <TimePicker
                                        defaultValue={timeRange.start}
                                        onChange={(date) => handleTimeChange(index, 'start', date)}
                                    />
                                    <TimePicker
                                        defaultValue={timeRange.end}
                                        onChange={(date) => handleTimeChange(index, 'end', date)}
                                    />
                                    {index !== 0 && (
                                        <button className={styles.close_button} onClick={() => handleRemoveTimeRange(index)}>
                                            <img src={CloseIcon} width="22px" height="22px" alt="close icon"  />
                                        </button>
                                    )}
                                </Wrapper>
                            ))}
                            <Button bgColor="primary" padding="0.5rem 1rem" onClick={handleAddTimeRange} className={styles.hours_add_button}>
                                <Typography content="時間を追加" color="primary" size="small" weight="normal" />
                            </Button>
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
                <Wrapper direction="col" gap="4rem" align="align-start">
                    <Button bgColor="primary" padding="0.7rem 3.5rem" onClick={onNextClick}>
                        <Typography content="次に進む" color="primary" size="normal" weight="normal" />
                    </Button>
                    <Button bgColor="secondary" padding="0.7rem 3.4rem" onClick={onBackClick}>
                        <Typography content="戻る" color="primary" size="normal" weight="normal" />
                    </Button>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    );
}
