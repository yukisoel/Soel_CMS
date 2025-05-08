import React from 'react';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Input from '@/main/common/Input';
import Textarea from '@/main/common/Textarea';
import DatePicker from '@/main/common/DatePicker/DatePicker';
import TimePicker from '@/main/common/TimePicker/TimePicker';
import PhotoPullDownMenu from '@/main/components/editPage/PhotoPullDownMenu';
import useFileUpload from '@/main/common/FileUpload/useFileUpload';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from '../EditLatestInformation.module.scss';

const schema = z.object({
  eventTitle: z.string().min(1, 'イベントのタイトルは必須です'),
  startDate: z.date().nullable(),
  startTime: z.date().nullable(),
  endDate: z.date().nullable(),
  endTime: z.date().nullable(),
  eventDetail: z.string(),
  buttonTitle: z.string(),
  selectedButton: z.string(),
});

type FormData = z.infer<typeof schema>;

export const EventTab: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      selectedButton: '',
    },
  });

  const buttonOptions = ['なし', '予約', 'オンライン注文', '購入', '詳細', '登録', '今すぐ電話'];
  const { render: renderFileUpload } = useFileUpload({ size: 'regular' });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    // TODO: API呼び出しなどの処理を実装
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            content="イベントのタイトル"
            size="normal"
            color="black"
            className={styles.sectionTitle}
          />
          <Input
            {...register('eventTitle')}
            placeholder="イベントのタイトルを入力"
            padding="10px 20px"
            className={styles.input}
          />
          {errors.eventTitle && (
            <Typography content={errors.eventTitle.message || ''} size="xsmall" color="error" />
          )}
        </Wrapper>

        <Wrapper direction="col" gap="16px">
          <Typography
            content="開始日"
            size="normal"
            color="black"
            className={styles.sectionTitle}
          />
          <DatePicker
            defaultValue={watch('startDate')}
            onChange={(date) => setValue('startDate', date)}
          />
          {errors.startDate && (
            <Typography content={errors.startDate.message || ''} size="xsmall" color="error" />
          )}
        </Wrapper>

        <Wrapper direction="col" gap="16px">
          <Typography
            content="開始時間"
            size="normal"
            color="black"
            className={styles.sectionTitle}
          />
          <TimePicker
            defaultValue={watch('startTime')}
            onChange={(time) => setValue('startTime', time)}
          />
          {errors.startTime && (
            <Typography content={errors.startTime.message || ''} size="xsmall" color="error" />
          )}
        </Wrapper>

        <Wrapper direction="col" gap="16px">
          <Typography
            content="終了日"
            size="normal"
            color="black"
            className={styles.sectionTitle}
          />
          <DatePicker
            defaultValue={watch('endDate')}
            onChange={(date) => setValue('endDate', date)}
          />
          {errors.endDate && (
            <Typography content={errors.endDate.message || ''} size="xsmall" color="error" />
          )}
        </Wrapper>

        <Wrapper direction="col" gap="16px">
          <Typography
            content="終了時間"
            size="normal"
            color="black"
            className={styles.sectionTitle}
          />
          <TimePicker
            defaultValue={watch('endTime')}
            onChange={(time) => setValue('endTime', time)}
          />
          {errors.endTime && (
            <Typography content={errors.endTime.message || ''} size="xsmall" color="error" />
          )}
        </Wrapper>

        <Wrapper direction="col" gap="16px">
          <Typography
            content="イベントの詳細"
            size="normal"
            color="black"
            className={styles.sectionTitle}
          />
          <Textarea
            {...register('eventDetail')}
            placeholder="イベントの詳細を入力"
            className={styles.textarea}
          />
          {errors.eventDetail && (
            <Typography content={errors.eventDetail.message || ''} size="xsmall" color="error" />
          )}
        </Wrapper>

        <Wrapper direction="col" gap="16px">
          <Typography
            content="追加ボタンのタイトル"
            size="normal"
            color="black"
            className={styles.sectionTitle}
          />
          <Input
            {...register('buttonTitle')}
            placeholder="リンクの入力"
            padding="10px 20px"
            className={styles.input}
          />
          {errors.buttonTitle && (
            <Typography content={errors.buttonTitle.message || ''} size="xsmall" color="error" />
          )}
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
            selectedContent={watch('selectedButton')}
            setSelectedContent={(value) => setValue('selectedButton', value)}
            options={buttonOptions}
          />
          {errors.selectedButton && (
            <Typography content={errors.selectedButton.message || ''} size="xsmall" color="error" />
          )}
        </Wrapper>

        <Wrapper justify="justify-start">
          <Button
            className={styles.submitButton}
            bgColor="primary"
            type="submit"
          >
            投稿する
          </Button>
        </Wrapper>
      </Wrapper>
    </form>
  );
};
