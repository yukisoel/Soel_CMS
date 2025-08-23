import SelectedStoreList from '../SelectStore/SelectedStoreList'
import SelectedServiceList from '../SelectService/SelectedServiceList'
import { Form } from './PostContentForm'
import styles from '@/main/components/stores/SchedulePost/PostContentForm.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Textarea from '@/main/common/Textarea'
import Button from '@/main/common/Button'
import Checkbox from '@/main/common/Checkbox'
import ToggleButton from '@/main/common/ToggleButton'
import DatePicker from '@/main/common/DatePicker/DatePicker'
import TimePicker from '@/main/common/TimePicker/TimePicker'

type Props = {
    selectedStores: string[];
    selectedServices: string[];
    formState: Form;
    uploadedPhotoFileList: FileList | null;
    onEdit: () => void;
    onSubmit: () => void;
};

export default function PostContentConfirm({
  selectedStores,
  selectedServices,
  formState,
  uploadedPhotoFileList,
  onEdit,
  onSubmit
}: Props) {
  return (
    <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
      <Wrapper direction="col" gap="5rem">
        <Typography content="投稿するサービスを選択" color="primary" size="medium" />
        <Wrapper direction="col" gap="4rem">
          <SelectedStoreList selectedStores={selectedStores} onBackClick={onEdit} />
          <SelectedServiceList selectedServices={selectedServices} onBackClick={onEdit} />
          <Wrapper direction="col" gap="1.6rem" className={styles.photo_container}>
            <Typography content="写真を追加" color="primary" size="normal" />
            <Wrapper gap="3rem">
              {uploadedPhotoFileList && Array.from(uploadedPhotoFileList).map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt={`uploaded ${index}`} width="150px" height="150px" />
              ))}
            </Wrapper>
          </Wrapper>
          <Wrapper direction="col" gap="1.6rem">
            <Typography content="投稿内容" color="primary" size="normal" />
            <Wrapper align="align-end" gap="1rem">
              <Wrapper direction="col" align="align-start" className={styles.textarea_container}>
                <Textarea
                  value={formState.content}
                  readOnly
                  placeholder="投稿内容を入力してください"
                  width="100%"
                  height="349px"
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <Wrapper direction="col" gap="1.6rem">
            <Typography content="ハッシュタグ（Instagram用）" color="primary" size="normal" />
            <Wrapper align="align-end" gap="1rem">
              <Textarea
                value={formState.hashtags}
                readOnly
                placeholder="#ハッシュタグ #入力"
                width="884px"
                height="149px"
              />
            </Wrapper>
          </Wrapper>
          <Wrapper gap="2rem">
            <Checkbox label="店舗のタグをつける" checked={formState.tagStore} readOnly />
            <Checkbox label="店舗の位置情報をつける" checked={formState.tagLocation} readOnly />
          </Wrapper>
          <Wrapper align="align-center" gap="0.8rem">
            <Typography content="投稿予約をする" color="primary" size="normal" />
            <ToggleButton checked={formState.schedulePost} readOnly />
          </Wrapper>
          {formState.schedulePost && (
            <Wrapper gap="2rem">
              <DatePicker defaultValue={formState.selectedDate} readOnly />
              <TimePicker defaultValue={formState.selectedTime} readOnly />
            </Wrapper>
          )}
        </Wrapper>
        <Wrapper justify="justify-start" gap="4rem">
          <Button bgColor="secondary" padding="7px 10px" onClick={onEdit}>
            <Typography content="修正する" color="primary" size="normal" weight="normal" />
          </Button>
          <Button bgColor="primary" padding="7px 10px" onClick={onSubmit}>
            <Typography content="投稿を登録" color="primary" size="normal" weight="normal" />
          </Button>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}
