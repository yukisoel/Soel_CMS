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
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem';
import { GoogleService } from '@/main/service/GoogleService';
import { useParams } from 'react-router-dom';
import { LocalPostTopicType, LocationButtonName } from '@/types/apiModel';

const schema = z.object({
  eventTitle: z.string().min(1, 'イベントのタイトルは必須です'),
  startDate: z.date().nullable(),
  startTime: z.date().nullable(),
  endDate: z.date().nullable(),
  endTime: z.date().nullable(),
  eventDetail: z.string().max(1500, 'イベントの詳細は1500文字以内で入力してください'),
  buttonTitle: z.string(),
  selectedButton: z.string(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  googleService: GoogleService;
}

export const EventTab: React.FC<Props> = ({ googleService }) => {
  const { accountId, locationId } = useParams();
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

  const { render: renderFileUpload, uploadedPhotoFileList } = useFileUpload({ size: 'regular' });

  const onSubmit = async (data: FormData) => {
    if (!uploadedPhotoFileList) return;
    console.log(data);
    await googleService.postLocationLocalPosts(accountId ?? '', locationId ?? '', {
      summary: data.eventDetail,
      callToAction: {
        actionType: Object.keys(LocationButtonName).find(key => LocationButtonName[key as keyof typeof LocationButtonName] === data.selectedButton) as LocationButtonName,
        url: data.buttonTitle,
      },
      topicType: LocalPostTopicType.EVENT,
      event: {
        title: data.eventTitle,
        schedule: {
          startDate: data.startDate ? {
            year: data.startDate.getFullYear(),
            month: data.startDate.getMonth() + 1,
            day: data.startDate.getDate(),
          } : undefined,
          endDate: data.endDate ? {
            year: data.endDate.getFullYear(),
            month: data.endDate.getMonth() + 1,
            day: data.endDate.getDate(),
          } : undefined,
          startTime: data.startTime ? {
            hours: data.startTime.getHours(),
            minutes: data.startTime.getMinutes(),
            seconds: 0,
            nanos: 0
          } : undefined,
          endTime: data.endTime ? {
            hours: data.endTime.getHours(),
            minutes: data.endTime.getMinutes(),
            seconds: 0,
            nanos: 0
          } : undefined
        }
      }
    }, uploadedPhotoFileList)
  };

  const eventDetailValue = watch('eventDetail') || '';
  const selectedButton = watch('selectedButton') ?? '';

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

        <LayoutLabeledFormItem
          label="イベントの詳細"
          counter={{
            current: eventDetailValue.length,
            max: 1500
          }}
        >
          <Textarea
            {...register('eventDetail')}
            placeholder="イベントの詳細を入力"
            className={styles.textarea}
          />
          {errors.eventDetail && (
            <Typography content={errors.eventDetail.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>

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
            setSelectedContent={(value) => setValue('selectedButton', value)}
            options={Object.values(LocationButtonName).map(value => value.toString())}
          />
          {errors.selectedButton && (
            <Typography content={errors.selectedButton.message || ''} size="xsmall" color="error" />
          )}
        </Wrapper>

        {selectedButton !== '' && (
          <Wrapper direction="col" gap="16px">
            <Typography
              content={selectedButton}
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
        )}

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
