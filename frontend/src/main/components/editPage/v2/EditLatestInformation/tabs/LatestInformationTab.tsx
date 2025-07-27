import React from 'react';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Textarea from '@/main/common/Textarea';
import Input from '@/main/common/Input';
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
  description: z.string().max(1500, '説明は1500文字以内で入力してください'),
  buttonTitle: z.string(),
  selectedButton: z.string(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  googleService: GoogleService;
}

export const LatestInformationTab: React.FC<Props> = ({ googleService }) => {
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
      summary: data.description,
      callToAction: {
        actionType: Object.keys(LocationButtonName).find(key => LocationButtonName[key as keyof typeof LocationButtonName] === data.selectedButton) as LocationButtonName,
        url: data.buttonTitle,
      },
      topicType: LocalPostTopicType.STANDARD,
    }, uploadedPhotoFileList)
  };

  const descriptionValue = watch('description') || '';

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
          <LayoutLabeledFormItem
            label="説明を追加"
            counter={{
              current: descriptionValue.length,
              max: 1500
            }}
          >
          <Textarea
            {...register('description')}
            placeholder="説明を入力"
            className={styles.textarea}
          />
          {errors.description && (
            <Typography content={errors.description.message || ''} size="xsmall" color="error" />
          )}
          </LayoutLabeledFormItem>
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
