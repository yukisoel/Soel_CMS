import React from 'react';
import Modal from '@/main/common/Modal/Modal';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LayoutLabeledFormItem from '@/main/common/LayoutLabeledFormItem';
import SearchPulldownMenu from '@/main/components/editPage/SearchPullDownMenu';
import { GoogleService } from '@/main/service/GoogleService';

const schema = z.object({
  serviceArea: z.string()
    .min(1, 'サービスエリアは必須です')
    .max(140, 'サービスエリアは140文字以内で入力してください'),
  placeId: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type EditServiceAreaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: {
    serviceArea: string;
    placeId?: string;
  };
  googleService: GoogleService;
};

export const EditServiceAreaModal: React.FC<EditServiceAreaModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  googleService,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const serviceAreaValue = watch('serviceArea') || '';
  const [options, setOptions] = React.useState<string[]>([]);
  const [placeIdMap, setPlaceIdMap] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (isOpen) {
      reset(initialValues || {
        serviceArea: '',
        placeId: '',
      });
    }
  }, [isOpen, reset, initialValues]);

  const handleSearch = async (query: string): Promise<void> => {
    const results = await googleService.postPlacesAutoComplete(query);
    const placeList = results.placeSetList ?? [];
    const newOptions = placeList.map(place => place.text ?? '');
    const newPlaceIdMap = placeList.reduce((acc, place) => ({
      ...acc,
      [place.text ?? '']: place.placeId ?? '',
    }), {} as Record<string, string>);

    setOptions(newOptions);
    setPlaceIdMap(newPlaceIdMap);
  };

  const handleSelect = (selected: string) => {
    setValue('serviceArea', selected);
    setValue('placeId', placeIdMap[selected] ?? '');
  };

  const contentRender = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper direction="col" gap="2rem">
        <LayoutLabeledFormItem
          label="サービスエリア"
          counter={{
            current: serviceAreaValue.length,
            max: 140
          }}
        >
          <SearchPulldownMenu
            selectedContent={serviceAreaValue}
            setSelectedContent={handleSelect}
            options={options}
            placeholder="サービスエリアを入力"
            width="100%"
            onSearch={handleSearch}
            searchDelay={500}
          />
          {errors.serviceArea && (
            <Typography content={errors.serviceArea.message || ''} size="xsmall" color="error" />
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
      headerContent="サービスエリアを編集"
      contentRender={contentRender}
    />
  );
};

export default EditServiceAreaModal;
