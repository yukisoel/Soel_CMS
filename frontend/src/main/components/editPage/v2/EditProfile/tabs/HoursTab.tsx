import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import AddIcon from "@/main/assets/AddIcon.svg";
import styles from "../EditProfileLayoutV2.module.scss";
import EditBusinessHoursModal from "../modals/EditBusinessHoursModal";
import { useState } from "react";
import { UseFormRegister, FieldErrors, Path } from "react-hook-form";
import { ProfileFormData } from "@/main/schemas/profileSchema";
import { BusinessHoursPeriod } from "@/main/model/LocationModel";

type EditModalType = 'regularHours' | 'lunchHours' | null;

type Props = {
    register: UseFormRegister<ProfileFormData>;
    errors: FieldErrors<ProfileFormData>;
    values: {
        regularHours: {
            periods: BusinessHoursPeriod[];
        };
        specialHours?: {
            periods: BusinessHoursPeriod[];
        };
    };
    setValueAndValidate: (name: Path<ProfileFormData>, value: ProfileFormData[keyof ProfileFormData] | string[] | { [key: string]: unknown }) => Promise<boolean>;
    isUpdating: boolean;
    validationErrors: {
        regularHours?: string;
        specialHours?: string;
    };
    onAddOtherHours: () => void;
};

export default function HoursTab({
    values,
    setValueAndValidate,
    isUpdating,
    onAddOtherHours,
    validationErrors
}: Props) {
    const [editModalType, setEditModalType] = useState<EditModalType>(null);

    const handleSave = async (periods: BusinessHoursPeriod[]) => {
        let isValid = false;
        switch (editModalType) {
            case 'regularHours': {
                isValid = await setValueAndValidate('regularHours', { periods });
                break;
            }
            case 'lunchHours': {
                isValid = await setValueAndValidate('specialHours', { periods });
                break;
            }
        }
        if (isValid) {
            setEditModalType(null);
        }
        return isValid;
    };

    const formatHours = (periods: BusinessHoursPeriod[]): string => {
        const dayMap: { [key: string]: string } = {
            MONDAY: '月',
            TUESDAY: '火',
            WEDNESDAY: '水',
            THURSDAY: '木',
            FRIDAY: '金',
            SATURDAY: '土',
            SUNDAY: '日'
        };

        // 同じ営業時間のグループを作成
        const timeGroups: { [key: string]: string[] } = {};
        periods.forEach(period => {
            const timeKey = `${period.openTime}-${period.closeTime}`;
            if (!timeGroups[timeKey]) {
                timeGroups[timeKey] = [];
            }
            timeGroups[timeKey].push(dayMap[period.openDay]);
        });

        // グループごとに文字列を生成
        const formattedGroups = Object.entries(timeGroups).map(([time, days]) => {
            const [openTime, closeTime] = time.split('-');
            return days.map(day => `${day}（${openTime}-${closeTime}）`).join(',');
        });

        // 5日目までと残りの日を分割
        const firstLine = formattedGroups.slice(0, 5).join(',');
        const remainingLines = formattedGroups.slice(5);

        return [firstLine, ...remainingLines].join('\n');
    };

    return (
        <Wrapper direction="col" gap="3rem" className={styles.main_content}>
            {/* 通常営業時間 */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="通常営業時間"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={formatHours(values.regularHours.periods)}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('regularHours')}
                        disabled={isUpdating}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* ランチ営業時間 */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="ランチ営業時間"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={values.specialHours ? formatHours(values.specialHours.periods) : '未設定'}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => setEditModalType('lunchHours')}
                        disabled={isUpdating}
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

            {/* 編集モーダル */}
            {editModalType && (
                <EditBusinessHoursModal
                    isOpen={true}
                    onClose={() => setEditModalType(null)}
                    title={editModalType === 'regularHours' ? '通常営業時間' : 'ランチ営業時間'}
                    periods={editModalType === 'regularHours' ? values.regularHours.periods : (values.specialHours?.periods || [])}
                    onSave={handleSave}
                    error={editModalType === 'regularHours' ? validationErrors.regularHours : validationErrors.specialHours}
                />
            )}
        </Wrapper>
    );
}
