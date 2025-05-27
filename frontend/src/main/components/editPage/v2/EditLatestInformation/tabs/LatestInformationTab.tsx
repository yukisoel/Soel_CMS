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

const schema = z.object({
  description: z.string().max(1500, '説明は1500文字以内で入力してください'),
  buttonTitle: z.string(),
  selectedButton: z.string(),
});

type FormData = z.infer<typeof schema>;

export const LatestInformationTab: React.FC = () => {
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

  const descriptionValue = watch('description') || '';

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
