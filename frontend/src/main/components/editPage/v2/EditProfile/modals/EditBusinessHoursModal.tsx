import { useState } from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import TimePicker from '@/main/common/TimePicker/TimePicker';
import styles from '../EditProfileLayoutV2.module.scss';
import { BusinessHoursPeriod, DayOfWeek } from '@/main/model/LocationModel';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    periods: BusinessHoursPeriod[];
    onSave: (periods: BusinessHoursPeriod[]) => void;
    title: string;
    error?: string;
};

type ExtendedBusinessHoursPeriod = BusinessHoursPeriod & {
    isClosed: boolean;
};

const DAYS_OF_WEEK: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const DAYS_OF_WEEK_JA = ['月', '火', '水', '木', '金', '土', '日'];

export default function EditBusinessHoursModal({
    isOpen,
    onClose,
    periods,
    onSave,
    title,
    error,
}: Props) {
    const [businessHours, setBusinessHours] = useState<ExtendedBusinessHoursPeriod[]>(
        periods.length > 0
            ? periods.map(period => ({
                ...period,
                isClosed: !period.openTime && !period.closeTime
            }))
            : DAYS_OF_WEEK.map((day) => ({
                openDay: day,
                closeDay: day,
                openTime: '',
                closeTime: '',
                isClosed: true
            }))
    );

    const handleTimeChange = (
        index: number,
        field: 'openTime' | 'closeTime',
        date: Date | null
    ) => {
        if (!date) return;

        const timeString = date.toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const newHours = [...businessHours];
        newHours[index] = {
            ...newHours[index],
            [field]: timeString,
            isClosed: false
        };
        setBusinessHours(newHours);
    };

    const parseTimeString = (timeStr: string): Date | null => {
        if (!timeStr) return null;
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date;
    };

    const handleToggleClosed = (index: number) => {
        const newHours = [...businessHours];
        const hour = newHours[index];

        if (hour.isClosed) {
            // 休業から営業に変更
            newHours[index] = {
                ...hour,
                openTime: '',
                closeTime: '',
                isClosed: false
            };
        } else {
            // 営業から休業に変更
            newHours[index] = {
                ...hour,
                openTime: '',
                closeTime: '',
                isClosed: true
            };
        }
        setBusinessHours(newHours);
    };

    const handleSave = () => {
        // isClosed フラグを除いてから保存
        const periodsToSave = businessHours.map(({ isClosed, ...period }) => period);
        onSave(periodsToSave);
        onClose();
    };

    const renderContent = () => (
        <Wrapper direction="col" gap="3rem">
            {/* 営業時間 */}
            <Wrapper direction="col" gap="1rem">
                <Wrapper direction="col" gap="1rem">
                    {businessHours.map((hour, index) => (
                        <div key={index} className={styles.business_hours_row}>
                            <Typography content={DAYS_OF_WEEK_JA[index]} color="primary" size="normal" />
                            {hour.isClosed ? (
                                <Wrapper gap="1rem" align="align-center">
                                    <Button
                                        bgColor="secondary"
                                        padding="0.5rem 1rem"
                                        onClick={() => handleToggleClosed(index)}
                                    >
                                        <Typography content="休業" color="primary" size="normal" />
                                    </Button>
                                </Wrapper>
                            ) : (
                                <Wrapper gap="1rem" align="align-center">
                                    <TimePicker
                                        defaultValue={parseTimeString(hour.openTime)}
                                        onChange={(date) => handleTimeChange(index, 'openTime', date)}
                                    />
                                    <Typography content="~" color="primary" size="normal" />
                                    <TimePicker
                                        defaultValue={parseTimeString(hour.closeTime)}
                                        onChange={(date) => handleTimeChange(index, 'closeTime', date)}
                                    />
                                    <Button
                                        bgColor="secondary"
                                        padding="0.5rem 1rem"
                                        onClick={() => handleToggleClosed(index)}
                                    >
                                        <Typography content="休業に変更" color="primary" size="normal" />
                                    </Button>
                                </Wrapper>
                            )}
                        </div>
                    ))}
                </Wrapper>
                {error && (
                    <Typography
                        content={error}
                        color="error"
                        size="small"
                    />
                )}
            </Wrapper>

            {/* アクションボタン */}
            <Wrapper gap="1rem" justify="justify-end">
                <Button
                    bgColor="secondary"
                    padding="0.5rem 1.8rem"
                    onClick={onClose}
                >
                    <Typography content="戻る" color="primary" size="normal" />
                </Button>
                <Button
                    bgColor="primary"
                    padding="0.5rem 1.8rem"
                    onClick={handleSave}
                >
                    <Typography content="保存する" color="primary" size="normal" />
                </Button>
            </Wrapper>
        </Wrapper>
    );

    return (
        <Modal
            headerContent={`${title}を編集`}
            isOpen={isOpen}
            onClose={onClose}
            contentRender={renderContent}
        />
    );
}
