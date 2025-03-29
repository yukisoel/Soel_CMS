import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import AddIcon from "@/main/assets/AddIcon.svg";
import styles from "../EditProfileLayoutV2.module.scss";

type BusinessHours = {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
};

type Props = {
    regularHours: BusinessHours;
    lunchHours: BusinessHours;
    onRegularHoursChange: (hours: BusinessHours) => void;
    onLunchHoursChange: (hours: BusinessHours) => void;
    onAddOtherHours: () => void;
};

export default function HoursTab({
    regularHours,
    lunchHours,
    onRegularHoursChange,
    onLunchHoursChange,
    onAddOtherHours
}: Props) {
    // 営業時間を文字列に整形する関数
    const formatHours = (hours: BusinessHours): string => {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
        const dayLabels = {
            monday: '月',
            tuesday: '火',
            wednesday: '水',
            thursday: '木',
            friday: '金',
            saturday: '土',
            sunday: '日'
        };

        return days
            .filter(day => hours[day])
            .map(day => `${dayLabels[day]}（${hours[day]}）`)
            .join('、');
    };

    return (
        <Wrapper direction="col" gap="3rem" className={styles.main_content}>
            {/* 通常営業時間セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="通常営業時間"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={formatHours(regularHours)}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => onRegularHoursChange(regularHours)}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* ランチ営業時間セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="ランチ営業時間"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={formatHours(lunchHours)}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => onLunchHoursChange(lunchHours)}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* その他の営業時間を追加 */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="その他の営業時間を追加"
                    color="primary"
                    size="normal"
                />
                <Wrapper gap="2rem" align="align-start" className={styles.add_hours_buttons}>
                    <Button
                        bgColor="primary"
                        padding="0.7rem 1rem"
                        onClick={onAddOtherHours}
                        className={styles.add_hours_button}
                    >
                        <Typography
                            content="名前"
                            color="primary"
                            size="normal"
                            weight="normal"
                        />
                        <img src={AddIcon} alt="add" />
                    </Button>
                    <Button
                        bgColor="primary"
                        padding="0.7rem 1rem"
                        onClick={onAddOtherHours}
                        className={styles.add_hours_button}
                    >
                        <Typography
                            content="名前"
                            color="primary"
                            size="normal"
                            weight="normal"
                        />
                        <img src={AddIcon} alt="add" />
                    </Button>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    );
}
