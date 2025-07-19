import React from 'react';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Input from '@/main/common/Input';
import DatePicker from '@/main/common/DatePicker/DatePicker';
import PhotoPullDownMenu from '@/main/components/editPage/PhotoPullDownMenu';
import useFileUpload from '@/main/common/FileUpload/useFileUpload';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from '../EditLatestInformation.module.scss';
import { GoogleService } from '@/main/service/GoogleService';
import { useParams } from 'react-router-dom';
import { LocalPostTopicType, LocationButtonName } from '@/types/apiModel';

const schema = z.object({
  benefitTitle: z.string().min(1, '特典のタイトルは必須です'),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  buttonTitle: z.string(),
  selectedButton: z.string(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  googleService: GoogleService;
  setIsSubmitting?: (value: boolean) => void;
}

export const BenefitTab: React.FC<Props> = ({ googleService, setIsSubmitting }) => {
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
    
    setIsSubmitting?.(true);
    try {
      await googleService.postLocationLocalPosts(accountId ?? '', locationId ?? '', {
        summary: data.benefitTitle,
        callToAction: {
          actionType: Object.keys(LocationButtonName).find(key => LocationButtonName[key as keyof typeof LocationButtonName] === data.selectedButton) as LocationButtonName,
          url: data.buttonTitle,
        },
        topicType: LocalPostTopicType.OFFER,
        offer: {
          couponCode: data.benefitTitle,
          termsConditions: `期間: ${data.startDate?.toLocaleDateString() ?? ''} 〜 ${data.endDate?.toLocaleDateString() ?? ''}`
        }
      }, uploadedPhotoFileList);
    } finally {
      setIsSubmitting?.(false);
    }
  };

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
            content="特典のタイトル"
            size="normal"
            color="black"
            className={styles.sectionTitle}
          />
          <Input
            {...register('benefitTitle')}
            placeholder="特典のタイトルを入力"
            padding="10px 20px"
            className={styles.input}
          />
          {errors.benefitTitle && (
            <Typography content={errors.benefitTitle.message || ''} size="xsmall" color="error" />
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
