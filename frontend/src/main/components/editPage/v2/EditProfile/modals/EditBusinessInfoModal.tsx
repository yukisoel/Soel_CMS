import React from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Input from '@/main/common/Input';
import Textarea from '@/main/common/Textarea';
import DatePicker from '@/main/common/DatePicker/DatePicker';

type EditType = 'businessName' | 'description' | 'openingDate';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type: EditType;
  content: string;
  onSave: (value: string | Date) => void;
};

const TITLE_MAP: Record<EditType, string> = {
  businessName: 'ビジネス名',
  description: '説明',
  openingDate: '開業日',
};

const parseJapaneseDateString = (dateStr: string): Date | null => {
  const match = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!match) return null;

  const [_, year, month, day] = match;
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

export default function EditBusinessInfoModal({
  isOpen,
  onClose,
  type,
  content,
  onSave,
}: Props) {
  const [value, setValue] = React.useState(content);
  const [date, setDate] = React.useState<Date | null>(() => {
    if (type === 'openingDate') {
      return parseJapaneseDateString(content);
    }
    return null;
  });

  const handleSave = () => {
    if (type === 'openingDate' && date) {
      onSave(date);
    } else {
      onSave(value);
    }
    onClose();
  };

  const renderInput = () => {
    switch (type) {
      case 'businessName':
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="ビジネス名を入力"
            padding="16px"
            width="100%"
          />
        );
      case 'description':
        return (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="説明を入力"
            padding="16px"
            width="100%"
            height="120px"
          />
        );
      case 'openingDate':
        return (
          <DatePicker
            defaultValue={date}
            onChange={(newDate) => setDate(newDate)}
          />
        );
    }
  };

  const renderContent = () => (
    <Wrapper direction="col" gap="3rem">
      <Wrapper direction="col" gap="1rem">
        <Typography content={TITLE_MAP[type]} color="primary" size="normal" />
        {renderInput()}
      </Wrapper>
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
      headerContent={`${TITLE_MAP[type]}を編集`}
      isOpen={isOpen}
      onClose={onClose}
      contentRender={renderContent}
    />
  );
}
