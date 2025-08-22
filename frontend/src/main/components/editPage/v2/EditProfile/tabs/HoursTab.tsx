import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import Loading from "@/main/common/Loading";
import AddIcon from "@/main/assets/AddIcon.svg";
import styles from "../EditProfileLayoutV2.module.scss";
import EditBusinessHoursModal from "../modals/EditBusinessHoursModal";
import { useState } from "react";
import { GoogleLocationProfileModel } from "@/types/apiModel";
import { GoogleRepository } from "@/main/repositories/GoogleRepository";
import { useParams } from "react-router-dom";
import { useModal } from "@/main/common/Modal/useModal";
import { useMemo } from "react";
import { GoogleLocationTimePeriodOpenDay, GoogleLocationBusinessHoursRequestHoursTypeId } from "@/types/api.ts";
import { GoogleLocationTimePeriod } from "@/types/apiModel";

type Props = {
    profile: GoogleLocationProfileModel | null;
    googleRepository: GoogleRepository;
    fetchProfile: () => Promise<void>;
    isLoading?: boolean;
};

export const dayMap: { [key: string]: string } = {
    MONDAY: '月',
    TUESDAY: '火',
    WEDNESDAY: '水',
    THURSDAY: '木',
    FRIDAY: '金',
    SATURDAY: '土',
    SUNDAY: '日'
};

// GoogleLocationBusinessHoursRequestHoursTypeIdの日本語表示用map
const hoursTypeMap: { [key: string]: string } = {
  REGULAR: '通常営業',
  ACCESS: '入店可能時間',
  KITCHEN: '注文可能時間',
  DRIVE_THROUGH: 'ドライブスルー',
  DELIVERY: '宅配',
  TAKEOUT: 'テイクアウト',
  BREAKFAST: '朝食',
  LUNCH: 'ランチ',
  DINNER: 'ディナー',
  BRUNCH: 'ブランチ',
  HAPPY_HOURS: 'ハッピーアワー',
  SENIOR_HOURS: '高齢者限定時間帯',
  ONLINE_SERVICE_HOURS: 'オンラインサービスの提供時間',
};

type TimeString = string;
type TimeObject = { hours?: number | null; minutes?: number | null };
const formatTime = (time: TimeString | TimeObject | undefined): string => {
  if (!time) return '';
  if (typeof time === 'string' && time.length === 4) {
    return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
  }
  if (typeof time === 'object') {
    const h = String(time.hours ?? 0).padStart(2, '0');
    const m = String(time.minutes ?? 0).padStart(2, '0');
    return `${h}:${m}`;
  }
  return '';
};

const createPeriods = (periods: GoogleLocationTimePeriod[]): string => {
    const isExistUnSpecified = periods.some(period => period.openDay === GoogleLocationTimePeriodOpenDay.DAY_OF_WEEK_UNSPECIFIED);

    if (isExistUnSpecified && periods.length === 1) {
        // 全曜日分表示
        const { openTime, closeTime } = periods[0];
        return Object.entries(dayMap)
            .map(([_, label]) => `${label}（${formatTime(openTime)}-${formatTime(closeTime)}）`)
            .join('\n');
    }

    // 通常の曜日ごと表示
    return periods.map(period => {
        return `${dayMap[period.openDay]}（${formatTime(period.openTime)}-${formatTime(period.closeTime)}）`;
    }).join('\n');
};

export default function HoursTab({
    profile,
    googleRepository,
    fetchProfile,
    isLoading = false,
}: Props) {
    const { locationId } = useParams();
    const { isOpen: isHoursModalOpen, openModal: openHoursModal, closeModal: closeHoursModalBase } = useModal();
    const handleBusinessHoursSave = async (periods: GoogleLocationTimePeriod[]) => {
        await googleRepository.updateLocationProfileBusinessHours(locationId ?? '', {
            hoursTypeId: editTarget?.hoursType as GoogleLocationBusinessHoursRequestHoursTypeId,
            periods: periods
        });
        await fetchProfile();
        closeHoursModalBase();
    };

    // 通常営業
    const regularHours = useMemo(() => {
        const periods = profile?.regularHours?.periods ?? [];
        return createPeriods(periods);
    }, [profile]);

    const moreHours = useMemo(() => {
        return profile?.moreHours?.map(moreHour => {
            return {
                hoursType: hoursTypeMap[moreHour?.hoursTypeId as keyof typeof hoursTypeMap],
                periods: createPeriods(moreHour.periods ?? []),
            };
        });
    }, [profile]);

    // 編集対象の営業時間タイプとperiodsを管理するstateを追加
    const [editTarget, setEditTarget] = useState<{
        hoursType: string;
        periods: GoogleLocationTimePeriod[];
    } | null>(null);

    // 編集ボタンのonClickで編集対象をセットする関数
    const handleEditClick = (hoursType: string, periods: GoogleLocationTimePeriod[] = []) => {
        setEditTarget({ hoursType, periods });
        openHoursModal();
    };

    // 追加可能な営業時間タイプを管理するstateを追加
    const addableHoursTypes = useMemo(() => {
        return Object.keys(hoursTypeMap).filter(hoursType => {
            return !profile?.moreHours?.some(moreHour => moreHour.hoursTypeId === hoursType) && hoursType !== "REGULAR";
        });
    }, [profile]);

    if (isLoading) {
        return <Loading message="営業時間を更新中..." size="small" minHeight="200px" />;
    }

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
                            content={regularHours}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => handleEditClick(hoursTypeMap.REGULAR, profile?.regularHours?.periods ?? [])}
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
            {moreHours?.map((moreHour, index) => {
                return (
                    <Wrapper direction="col" gap="1rem" key={index}>
                        <Typography
                            content={moreHour.hoursType}
                            color="primary"
                            size="normal"
                        />
                        <Wrapper className={styles.field_row}>
                            <Wrapper className={styles.field_container}>
                                <Typography
                                    content={moreHour.periods}
                                    color="secondary"
                                    size="normal"
                                />
                            </Wrapper>
                            <Button
                                bgColor="primary"
                                padding="0.5rem 1.8rem"
                                onClick={() => handleEditClick(moreHour.hoursType, profile?.moreHours?.[index]?.periods ?? [])}
                            >
                                <Typography
                                    content="編集"
                                    color="primary"
                                    size="normal"
                                />
                            </Button>
                        </Wrapper>
                    </Wrapper>
                );
            })}

            {/* その他の営業時間を追加 */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="その他の営業時間を追加"
                    color="primary"
                    size="normal"
                />
                <Wrapper gap="2rem" align="align-start" className={styles.add_hours_buttons}>
                    {addableHoursTypes.map((hoursType, index) => {
                        return (
                            <Button
                                bgColor="primary"
                                padding="0.7rem 1rem"
                                onClick={() => handleEditClick(hoursTypeMap[hoursType as keyof typeof hoursTypeMap])}
                                className={styles.add_hours_button}
                                key={index}
                            >
                                <Typography
                                    content={hoursTypeMap[hoursType as keyof typeof hoursTypeMap]}
                                    color="primary"
                                    size="normal"
                                    weight="normal"
                                />
                                <img src={AddIcon} alt="add" />
                            </Button>
                        );
                    })}
                </Wrapper>
            </Wrapper>

            {/* 編集モーダル */}
            <EditBusinessHoursModal
                isOpen={isHoursModalOpen}
                onClose={closeHoursModalBase}
                hoursType={editTarget?.hoursType ?? ''}
                periods={editTarget?.periods ?? []}
                onSave={handleBusinessHoursSave}
            />

        </Wrapper>
    );
}
