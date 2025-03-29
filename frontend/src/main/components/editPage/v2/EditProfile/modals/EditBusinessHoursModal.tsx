import { useState } from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import TimePicker from '@/main/common/TimePicker/TimePicker';
import styles from '../EditProfileLayoutV2.module.scss';

type BusinessHours = {
  day: string;
  startTime: string;
  endTime: string;
  isClosed: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  businessHours: BusinessHours[];
  onSave: (businessHours: BusinessHours[]) => void;
  title: string;
};

const DAYS_OF_WEEK = ['月', '火', '水', '木', '金', '土', '日'];

export default function EditBusinessHoursModal({
  isOpen,
  onClose,
  businessHours,
  onSave,
  title,
}: Props) {
  const [hours, setHours] = useState<BusinessHours[]>(
    businessHours.length > 0
      ? businessHours
      : DAYS_OF_WEEK.map((day) => ({
          day,
          startTime: '',
          endTime: '',
          isClosed: false,
        }))
  );

  const handleTimeChange = (
    index: number,
    field: 'startTime' | 'endTime',
    date: Date | null
  ) => {
    if (!date) return;

    const timeString = date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const newHours = [...hours];
    newHours[index] = {
      ...newHours[index],
      [field]: timeString,
    };
    setHours(newHours);
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
    const newHours = [...hours];
    newHours[index] = {
      ...newHours[index],
      isClosed: !newHours[index].isClosed,
      startTime: newHours[index].isClosed ? '' : newHours[index].startTime,
      endTime: newHours[index].isClosed ? '' : newHours[index].endTime,
    };
    setHours(newHours);
  };

  const handleSave = () => {
    onSave(hours);
    onClose();
  };

  const renderContent = () => (
    <Wrapper direction="col" gap="3rem">
      {/* 通常営業時間 */}
      <Wrapper direction="col" gap="1rem">
        <Wrapper direction="col" gap="1rem">
          {hours.map((hour, index) => (
            <div key={index} className={styles.business_hours_row}>
              <Typography content={hour.day} color="primary" size="normal" />
              {hour.isClosed ? (
                <Button
                  bgColor="secondary"
                  padding="0.5rem 1rem"
                  onClick={() => handleToggleClosed(index)}
                >
                  <Typography content="休業" color="primary" size="normal" />
                </Button>
              ) : (
                <Wrapper gap="1rem" align="align-center">
                  <TimePicker
                    defaultValue={parseTimeString(hour.startTime)}
                    onChange={(date) => handleTimeChange(index, 'startTime', date)}
                  />
                  <Typography content="~" color="primary" size="normal" />
                  <TimePicker
                    defaultValue={parseTimeString(hour.endTime)}
                    onChange={(date) => handleTimeChange(index, 'endTime', date)}
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
