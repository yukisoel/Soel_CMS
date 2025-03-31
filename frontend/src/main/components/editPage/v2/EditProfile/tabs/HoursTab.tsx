import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import AddIcon from "@/main/assets/AddIcon.svg";
import styles from "../EditProfileLayoutV2.module.scss";
import EditBusinessHoursModal from "../modals/EditBusinessHoursModal";
import { useState } from "react";

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
    isUpdating: boolean;
    onRegularHoursChange: (hours: BusinessHours) => void;
    onLunchHoursChange: (hours: BusinessHours) => void;
    onAddOtherHours: () => void;
};

export default function HoursTab({
    regularHours,
    lunchHours,
    onRegularHoursChange,
    onLunchHoursChange,
    onAddOtherHours,
}: Props) {
    const [isRegularHoursModalOpen, setIsRegularHoursModalOpen] = useState(false);
    const [isLunchHoursModalOpen, setIsLunchHoursModalOpen] = useState(false);

    const formatBusinessHours = (hours: BusinessHours): string => {
        const dayMap = {
            monday: '月',
            tuesday: '火',
            wednesday: '水',
            thursday: '木',
            friday: '金',
            saturday: '土',
            sunday: '日'
        };

        return Object.entries(hours)
            .map(([key, value]) => {
                const day = dayMap[key as keyof typeof dayMap];
                return value === '休業' ? `${day}（休業）` : `${day}（${value}）`;
            })
            .join('、');
    };

    const convertToModalFormat = (hours: BusinessHours) => {
        return [
            { day: '月', startTime: hours.monday.split('-')[0], endTime: hours.monday.split('-')[1], isClosed: hours.monday === '休業' },
            { day: '火', startTime: hours.tuesday.split('-')[0], endTime: hours.tuesday.split('-')[1], isClosed: hours.tuesday === '休業' },
            { day: '水', startTime: hours.wednesday.split('-')[0], endTime: hours.wednesday.split('-')[1], isClosed: hours.wednesday === '休業' },
            { day: '木', startTime: hours.thursday.split('-')[0], endTime: hours.thursday.split('-')[1], isClosed: hours.thursday === '休業' },
            { day: '金', startTime: hours.friday.split('-')[0], endTime: hours.friday.split('-')[1], isClosed: hours.friday === '休業' },
            { day: '土', startTime: hours.saturday.split('-')[0], endTime: hours.saturday.split('-')[1], isClosed: hours.saturday === '休業' },
            { day: '日', startTime: hours.sunday.split('-')[0], endTime: hours.sunday.split('-')[1], isClosed: hours.sunday === '休業' },
        ];
    };

    const convertFromModalFormat = (modalHours: Array<{ day: string; startTime: string; endTime: string; isClosed: boolean; }>) => {
        const result: Partial<BusinessHours> = {};
        modalHours.forEach(hour => {
            const key = {
                '月': 'monday',
                '火': 'tuesday',
                '水': 'wednesday',
                '木': 'thursday',
                '金': 'friday',
                '土': 'saturday',
                '日': 'sunday',
            }[hour.day] as keyof BusinessHours;

            result[key] = hour.isClosed ? '休業' : `${hour.startTime}-${hour.endTime}`;
        });
        return result as BusinessHours;
    };

    const handleSaveRegularHours = (modalHours: Array<{ day: string; startTime: string; endTime: string; isClosed: boolean; }>) => {
        onRegularHoursChange(convertFromModalFormat(modalHours));
    };

    const handleSaveLunchHours = (modalHours: Array<{ day: string; startTime: string; endTime: string; isClosed: boolean; }>) => {
        onLunchHoursChange(convertFromModalFormat(modalHours));
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
                            content={formatBusinessHours(regularHours)}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setIsRegularHoursModalOpen(true)}
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
                            content={formatBusinessHours(lunchHours)}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setIsLunchHoursModalOpen(true)}
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

            {/* 営業時間編集モーダル */}
            <EditBusinessHoursModal
                isOpen={isRegularHoursModalOpen}
                onClose={() => setIsRegularHoursModalOpen(false)}
                businessHours={convertToModalFormat(regularHours)}
                onSave={handleSaveRegularHours}
                title="通常営業時間"
            />
            <EditBusinessHoursModal
                isOpen={isLunchHoursModalOpen}
                onClose={() => setIsLunchHoursModalOpen(false)}
                businessHours={convertToModalFormat(lunchHours)}
                onSave={handleSaveLunchHours}
                title="ランチ営業時間"
            />
        </Wrapper>
    );
}
