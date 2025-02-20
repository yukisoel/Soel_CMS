import styles from "@/main/components/stores/SchedulePost/PostContentForm.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SelectedStoreList from "../SelectStore/SelectedStoreList";
import SelectedServiceList from "../SelectService/SelectedServiceList";
import Textarea from "@/main/common/Textarea";
import Button from "@/main/common/Button";
import AddIcon from "@/main/assets/AddIcon.svg";
import Checkbox from "@/main/common/Checkbox";
import ToggleButton from "@/main/common/ToggleButton";
import DatePicker from "@/main/common/DatePicker/DatePicker";
import TimePicker from "@/main/common/TimePicker/TimePicker";
import TemplateManagerModal from './TemplatePostModal/TemplateManagerModal';
import TagTemplateManagerModal from './TagTemplatePostModal/TagTemplateManagerModal';
import { useModal } from '@/main/common/Modal/useModal';

export type Form = {
    content: string;
    hashtags: string;
    tagStore: boolean;
    tagLocation: boolean;
    schedulePost: boolean;
    selectedDate: Date | null;
    selectedTime: Date | null;
}

type Props = {
    selectedStores: string[];
    selectedServices: string[];
    onEditSelectStore: () => void;
    onEditSelectService: () => void;
    onNext: () => void;
    formState: Form;
    setField:  (field: string, value: any) => void;
    renderFileUpload: () => JSX.Element;
};

export default function PostContentForm({ selectedStores, selectedServices, onEditSelectStore, onEditSelectService, onNext, formState, setField, renderFileUpload }: Props) {
    const { isOpen: isTemplateManagerOpen, openModal: openTemplateManager, closeModal: closeTemplateManager } = useModal();
    const { isOpen: isTagTemplateManagerOpen, openModal: openTagTemplateManager, closeModal: closeTagTemplateManager } = useModal();

    const handleSubmit = () => {
        onNext();
    };

    return (
        <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
            <Wrapper direction="col" gap="5rem">
                <Typography content="投稿するサービスを選択" color="primary" size="medium" />
                <Wrapper direction="col" gap="4rem">
                    <SelectedStoreList selectedStores={selectedStores} onBackClick={onEditSelectStore} />
                    <SelectedServiceList selectedServices={selectedServices} onBackClick={onEditSelectService} />
                    <Wrapper direction="col" gap="1.6rem" className={styles.photo_container}>
                        <Typography content="写真を追加" color="primary" size="normal" />
                        {renderFileUpload()}
                    </Wrapper>
                    <Wrapper direction="col" gap="1.6rem">
                        <Typography content="投稿内容" color="primary" size="normal" />
                        <Wrapper align="align-end" gap="1rem">
                            <Wrapper direction="col" align="align-start" className={styles.textarea_container}>
                                <Textarea
                                    value={formState.content}
                                    onChange={(e) => setField('content', e.target.value)}
                                    placeholder="投稿内容を入力してください"
                                    width="100%"
                                    height="349px"
                                />
                                <Wrapper padding="10px 0 20px 20px" gap="2rem">
                                    <Button bgColor="primary" padding="0.7rem 1rem" onClick={() => setField('content', formState.content + '{{店舗名}}')} className={styles.insert_template_variable_button}>
                                        <Typography content="店舗名" color="primary" size="normal" weight="normal" />
                                        <img src={AddIcon} alt="add" />
                                    </Button>
                                    <Button bgColor="primary" padding="0.7rem 1rem" onClick={() => setField('content', formState.content + '{{担当者名}}')} className={styles.insert_template_variable_button}>
                                        <Typography content="担当者名" color="primary" size="normal" weight="normal" />
                                        <img src={AddIcon} alt="add" />
                                    </Button>
                                    <Button bgColor="primary" padding="0.7rem 1rem" onClick={() => setField('content', formState.content + '{{HPのURL}}')} className={styles.insert_template_variable_button}>
                                        <Typography content="HPのURL" color="primary" size="normal" weight="normal" />
                                        <img src={AddIcon} alt="add" />
                                    </Button>
                                    <Button bgColor="primary" padding="0.7rem 1rem" onClick={() => setField('content', formState.content + '{{お店の特徴}}')} className={styles.insert_template_variable_button}>
                                        <Typography content="お店の特徴" color="primary" size="normal" weight="normal" />
                                        <img src={AddIcon} alt="add" />
                                    </Button>
                                </Wrapper>
                            </Wrapper>
                            <Button bgColor="primary" padding="0.7rem 1rem" onClick={openTemplateManager}>
                                <Typography content="テンプレートを挿入" color="primary" size="normal" weight="normal" />
                            </Button>
                        </Wrapper>
                    </Wrapper>
                    <Wrapper direction="col" gap="1.6rem">
                        <Typography content="ハッシュタグ（Instagram用）" color="primary" size="normal" />
                        <Wrapper align="align-end" gap="1rem">
                            <Textarea
                                value={formState.hashtags}
                                onChange={(e) => setField('hashtags', e.target.value)}
                                placeholder="#ハッシュタグ #入力"
                                width="884px"
                                height="149px"
                            />
                            <Button bgColor="primary" padding="0.7rem 1rem" onClick={openTagTemplateManager}>
                                <Typography content="テンプレートを挿入" color="primary" size="normal" weight="normal" />
                            </Button>
                        </Wrapper>
                    </Wrapper>
                    <Wrapper gap="2rem">
                        <Checkbox label="店舗のタグをつける" checked={formState.tagStore} onChange={() => setField('tagStore', !formState.tagStore)} reverse />
                        <Checkbox label="店舗の位置情報をつける" checked={formState.tagLocation} onChange={() => setField('tagLocation', !formState.tagLocation)} reverse />
                    </Wrapper>
                    <Wrapper align="align-center" gap="0.8rem">
                        <Typography content="投稿予約をする" color="primary" size="normal" />
                        <ToggleButton checked={formState.schedulePost} onChange={() => setField('schedulePost', !formState.schedulePost)} />
                    </Wrapper>
                    {formState.schedulePost && (
                        <Wrapper gap="2rem">
                            <DatePicker defaultValue={formState.selectedDate} onChange={(date) => setField('selectedDate', date)} />
                            <TimePicker defaultValue={formState.selectedTime} onChange={(time) => setField('selectedTime', time)} />
                        </Wrapper>
                    )}
                </Wrapper>
                <Wrapper direction="col" gap="3rem" align="align-start">
                    <Button bgColor="primary" padding="0.7rem 3.4rem" onClick={handleSubmit}>
                        <Typography content="次に進む" color="primary" size="normal" weight="normal" />
                    </Button>
                    <Button bgColor="secondary" padding="0.7rem 3.4rem" onClick={onEditSelectStore}>
                        <Typography content="戻る" color="primary" size="normal" weight="normal" />
                    </Button>
                </Wrapper>
            </Wrapper>
            <TemplateManagerModal isOpen={isTemplateManagerOpen} onClose={closeTemplateManager} />
            <TagTemplateManagerModal isOpen={isTagTemplateManagerOpen} onClose={closeTagTemplateManager} />
        </Wrapper>
    );
}
