import React, { useState } from 'react';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Input from '@/main/common/Input';
import DatePicker from '@/main/common/DatePicker/DatePicker';
import PhotoPullDownMenu from '@/main/components/editPage/PhotoPullDownMenu';
import useFileUpload from '@/main/common/FileUpload/useFileUpload';
import styles from '../EditLatestInformation.module.scss';

export const BenefitTab: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>('');
  const [buttonTitle, setButtonTitle] = useState<string>('');
  const [benefitTitle, setBenefitTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const buttonOptions = ['予約', '電話', 'ウェブサイト', 'メニュー'];
  const { render: renderFileUpload } = useFileUpload({ size: 'regular' });

  return (
    <Wrapper direction="col" gap="32px" padding="24px">
      <Wrapper direction="col" gap="16px" className={styles.imageUploadContainer}>
        <Typography
          content="写真を追加"
          size="normal"
          color="black"
          className={styles.sectionTitle}
        />
        {renderFileUpload()}
      </Wrapper>

      <Wrapper direction="col" gap="16px">
        <Typography
          content="特典のタイトル"
          size="normal"
          color="black"
          className={styles.sectionTitle}
        />
        <Input
          placeholder="特典のタイトルを入力"
          value={benefitTitle}
          onChange={(e) => setBenefitTitle(e.target.value)}
          padding="10px 20px"
          className={styles.input}
        />
      </Wrapper>

      <Wrapper direction="col" gap="16px">
        <Typography
          content="開始日"
          size="normal"
          color="black"
          className={styles.sectionTitle}
        />
        <DatePicker
          defaultValue={startDate}
          onChange={setStartDate}
        />
      </Wrapper>

      <Wrapper direction="col" gap="16px">
        <Typography
          content="終了日"
          size="normal"
          color="black"
          className={styles.sectionTitle}
        />
        <DatePicker
          defaultValue={endDate}
          onChange={setEndDate}
        />
      </Wrapper>

      <Wrapper direction="col" gap="16px">
        <Typography
          content="追加ボタンのタイトル"
          size="normal"
          color="black"
          className={styles.sectionTitle}
        />
        <Input
          placeholder="リンクの入力"
          value={buttonTitle}
          onChange={(e) => setButtonTitle(e.target.value)}
          padding="10px 20px"
          className={styles.input}
        />
      </Wrapper>

      <Wrapper direction="col" gap="16px">
        <Typography
          content="ボタンの追加（省略可）"
          size="normal"
          color="black"
          className={styles.sectionTitle}
        />
        <PhotoPullDownMenu
          placeholder="ボタンの種類を選択"
          selectedContent={selectedButton}
          setSelectedContent={setSelectedButton}
          options={buttonOptions}
        />
      </Wrapper>

      <Wrapper justify="justify-start">
        <Button
          className={styles.submitButton}
          bgColor="primary"
        >
          投稿する
        </Button>
      </Wrapper>
    </Wrapper>
  );
};
