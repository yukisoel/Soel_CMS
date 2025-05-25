import React from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import Input from '@/main/common/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem';
import type { GoogleLocationAttributeSnsLinkRequestSnsType } from '@/types/api.d.ts';

const schema = z.object({
  snsLink: z.string()
    .min(1, 'SNSリンクは必須です')
    .max(200, 'SNSリンクは200文字以内で入力してください')
    .url('正しいURL形式で入力してください'),
});

type FormData = z.infer<typeof schema>;

type EditSnsLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  type: GoogleLocationAttributeSnsLinkRequestSnsType;
  initialValues?: {
    snsLink: string;
  };
};

const SNS_TYPE_LABEL_MAP: Record<GoogleLocationAttributeSnsLinkRequestSnsType, string> = {
  FACEBOOK: 'Facebookリンク',
  INSTAGRAM: 'Instagramリンク',
  TWITTER: 'X（旧Twitter）リンク',
  TIKTOK: 'TikTokリンク',
  YOUTUBE: 'YouTubeリンク',
  LINKEDIN: 'LinkedInリンク',
  PINTEREST: 'Pinterestリンク',
};

export const EditSnsLinkModal: React.FC<EditSnsLinkModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  type,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const snsLinkValue = watch('snsLink') || '';

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        snsLink: '',
      });
    }
  }, [isOpen, reset, initialValues]);

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem
          label={SNS_TYPE_LABEL_MAP[type] || type}
          counter={{
            current: snsLinkValue.length,
            max: 200
          }}
        >
          <Input
            {...register('snsLink')}
            placeholder="SNSリンクを入力"
            padding="0.7rem 1.5rem"
            width="100%"
          />
          {errors.snsLink && (
            <Typography content={errors.snsLink.message || ''} size="xsmall" color="error" />
          )}
        </LayoutLabeledFormItem>
        <Wrapper justify="justify-end" gap="1rem">
          <Wrapper gap="1rem">
            <Button bgColor="secondary" onClick={onClose}>
              <Typography content="戻る" size="normal" color="primary" />
            </Button>
            <Button bgColor="primary" type="submit">
              <Typography content="保存する" size="normal" color="primary" />
            </Button>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </form>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      headerContent="SNSリンクを編集"
      contentRender={contentRender}
    />
  );
};
