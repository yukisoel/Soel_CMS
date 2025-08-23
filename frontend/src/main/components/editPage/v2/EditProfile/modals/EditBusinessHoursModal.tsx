import { useState, useEffect } from 'react'
import styles from '../EditProfileLayoutV2.module.scss'
import { dayMap } from '@/main/utils/dayMapping'
import Modal from '@/main/common/Modal/Modal'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Button from '@/main/common/Button'
import TimePicker from '@/main/common/TimePicker/TimePicker'
import { GoogleLocationTimePeriod } from '@/types/apiModel'
import type { GoogleLocationTimePeriodOpenDay, GoogleLocationTimePeriodCloseDay } from '@/types/api.ts'

type Props = {
    isOpen: boolean;
    onClose: () => void;
    periods: GoogleLocationTimePeriod[];
    onSave: (periods: GoogleLocationTimePeriod[]) => void;
    hoursType: string;
    error?: string;
};

type ExtendedBusinessHoursPeriod = GoogleLocationTimePeriod & {
    isClosed: boolean;
};

const parseTimeObj = (timeObj: { hours?: number; minutes?: number } | undefined): Date | null => {
  const date = new Date()
  date.setHours(timeObj?.hours ?? 0)
  date.setMinutes(timeObj?.minutes ?? 0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

// 共通関数: periodsとdayMapから全曜日分のExtendedBusinessHoursPeriod[]を生成
function getFullBusinessHours(
  periods: GoogleLocationTimePeriod[],
  dayMap: { [key: string]: string }
): ExtendedBusinessHoursPeriod[] {
  return Object.keys(dayMap).map((day) => {
    const period = periods.find(p => p.openDay === day)
    if (period) {
      return {
        ...period,
        isClosed: !period.openTime && !period.closeTime
      }
    } else {
      return {
        openDay: day as GoogleLocationTimePeriodOpenDay,
        closeDay: day as GoogleLocationTimePeriodCloseDay,
        openTime: {
          hours: undefined,
          minutes: undefined
        },
        closeTime: {
          hours: undefined,
          minutes: undefined
        },
        isClosed: true
      }
    }
  })
}

export default function EditBusinessHoursModal({
  isOpen,
  onClose,
  periods,
  onSave,
  hoursType,
  error
}: Props) {
  const [businessHours, setBusinessHours] = useState<ExtendedBusinessHoursPeriod[]>(
    getFullBusinessHours(periods, dayMap)
  )

  useEffect(() => {
    setBusinessHours(getFullBusinessHours(periods, dayMap))
  }, [periods])

  const handleTimeChange = (
    index: number,
    field: 'openTime' | 'closeTime',
    date: Date | null
  ) => {
    if (!date) return

    const hours = date.getHours()
    const minutes = date.getMinutes()
    const newHours = [...businessHours]
    newHours[index] = {
      ...newHours[index],
      [field]: { hours, minutes },
      isClosed: false
    }
    setBusinessHours(newHours)
  }

  const handleToggleClosed = (index: number) => {
    const newHours = [...businessHours]
    const hour = newHours[index]

    if (hour.isClosed) {
      newHours[index] = {
        ...hour,
        openTime: {
          hours: 0,
          minutes: 0
        },
        closeTime: {
          hours: 0,
          minutes: 0
        },
        isClosed: false
      }
    } else {
      newHours[index] = {
        ...hour,
        openTime: {
          hours: undefined,
          minutes: undefined
        },
        closeTime: {
          hours: undefined,
          minutes: undefined
        },
        isClosed: true
      }
    }
    setBusinessHours(newHours)
  }

  const handleSave = () => {
    const periodsToSave = businessHours
      .filter(({ isClosed }) => !isClosed)
      .map(({ isClosed: _, ...period }) => period)
    onSave(periodsToSave)
    onClose()
  }

  const renderContent = () => (
    <Wrapper direction="col" gap="3rem">
      {/* 営業時間 */}
      <Wrapper direction="col" gap="1rem">
        <Wrapper direction="col" gap="1rem">
          {businessHours.map((hour, index) => (
            <div key={index} className={styles.business_hours_row}>
              <Typography content={dayMap[hour.openDay]} color="primary" size="normal" />
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
                    defaultValue={parseTimeObj(hour.openTime)}
                    onChange={(date) => handleTimeChange(index, 'openTime', date)}
                  />
                  <Typography content="~" color="primary" size="normal" />
                  <TimePicker
                    defaultValue={parseTimeObj(hour.closeTime)}
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
  )

  return (
    <Modal
      headerContent={`${hoursType}を編集`}
      isOpen={isOpen}
      onClose={onClose}
      contentRender={renderContent}
    />
  )
}
