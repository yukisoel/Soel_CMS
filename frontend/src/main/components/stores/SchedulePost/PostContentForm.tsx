import { useState } from 'react';
import styles from "@/main/components/stores/SchedulePost/PostContentForm.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SelectedStoreList from "../SelectStore/SelectedStoreList";
import SelectedServiceList from "../SelectService/SelectedServiceList";
import useFileUpload from "@/main/common/FileUpload/useFileUpload";
import Textarea from "@/main/common/Textarea";
import Button from "@/main/common/Button";
import AddIcon from "@/main/assets/AddIcon.svg";
import Checkbox from "@/main/common/Checkbox";
import ToggleButton from "@/main/common/ToggleButton";
import DatePicker from "@/main/common/DatePicker/DatePicker";
import TimePicker from "@/main/common/TimePicker/TimePicker";
import TemplateManagerModal from '@/main/common/TemplatePostModal/TemplateManagerModal';

type Props = {
    selectedStores: string[];
    selectedServices: string[];
    onEditSelectStore: () => void;
    onEditSelectService: () => void;
};

export default function SchedulePost({ selectedStores, selectedServices, onEditSelectStore, onEditSelectService }: Props) {
    const { render, uploadedPhotoFileList } = useFileUpload({ size: 'regular' });

    const [content, setContent] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [tagStore, setTagStore] = useState(false);
    const [tagLocation, setTagLocation] = useState(false);
    const [schedulePost, setSchedulePost] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    const handleInsertTemplate = () => {
        setContent(content + '{{}}');
    };

    const handleSubmit = () => {
        // 投稿内容を送信する処理をここに追加
        console.log('投稿内容:', content);
        console.log('ハッシュタグ:', hashtags);
        console.log('店舗のタグをつける:', tagStore);
        console.log('店舗の位置情報をつける:', tagLocation);
        console.log('投稿予約をする:', schedulePost);
        console.log('選択された日付:', selectedDate);
        console.log('選択された時間:', selectedTime);
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
                        {render()}
                    </Wrapper>
                    <Wrapper direction="col" gap="1.6rem">
                        <Typography content="投稿内容" color="primary" size="normal" />
                        <Wrapper align="align-end" gap="1rem">
                            <Wrapper direction="col" align="align-start" className={styles.textarea_container}>
                                <Textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="投稿内容を入力してください"
                                    width="100%"
                                    height="349px"
                                />
                                <Wrapper padding="10px 0 20px 20px" gap="2rem">
                                    <Button bgColor="primary" padding="0.7rem 1rem" onClick={() => setContent(content + '{{店舗名}}')} className={styles.insert_template_variable_button}>
                                        <Typography content="店舗名" color="primary" size="normal" weight="normal" />
                                        <img src={AddIcon} alt="add" />
                                    </Button>
                                    <Button bgColor="primary" padding="0.7rem 1rem" onClick={() => setContent(content + '{{担当者名}}')} className={styles.insert_template_variable_button}>
                                        <Typography content="担当者名" color="primary" size="normal" weight="normal" />
                                        <img src={AddIcon} alt="add" />
                                    </Button>
                                    <Button bgColor="primary" padding="0.7rem 1rem" onClick={() => setContent(content + '{{HPのURL}}')} className={styles.insert_template_variable_button}>
                                        <Typography content="HPのURL" color="primary" size="normal" weight="normal" />
                                        <img src={AddIcon} alt="add" />
                                    </Button>
                                    <Button bgColor="primary" padding="0.7rem 1rem" onClick={() => setContent(content + '{{お店の特徴}}')} className={styles.insert_template_variable_button}>
                                        <Typography content="お店の特徴" color="primary" size="normal" weight="normal" />
                                        <img src={AddIcon} alt="add" />
                                    </Button>
                                </Wrapper>
                            </Wrapper>
                            <Button bgColor="primary" padding="0.7rem 1rem" onClick={handleInsertTemplate}>
                                <Typography content="テンプレートを挿入" color="primary" size="normal" weight="normal" />
                            </Button>
                        </Wrapper>
                    </Wrapper>
                    <Wrapper direction="col" gap="1.6rem">
                        <Typography content="ハッシュタグ（Instagram用）" color="primary" size="normal" />
                        <Wrapper align="align-end" gap="1rem">
                            <Textarea
                                value={hashtags}
                                onChange={(e) => setHashtags(e.target.value)}
                                placeholder="#ハッシュタグ #入力"
                                width="884px"
                                height="149px"
                            />
                            <Button bgColor="primary" padding="0.7rem 1rem" onClick={() => setHashtags(hashtags + ' {{テンプレート}}')}>
                                <Typography content="テンプレートを挿入" color="primary" size="normal" weight="normal" />
                            </Button>
                        </Wrapper>
                    </Wrapper>
                    <Wrapper gap="2rem">
                        <Checkbox label="店舗のタグをつける" checked={tagStore} onChange={() => setTagStore(!tagStore)} reverse />
                        <Checkbox label="店舗の位置情報をつける" checked={tagLocation} onChange={() => setTagLocation(!tagLocation)} reverse />
                    </Wrapper>
                    <Wrapper align="align-center" gap="0.8rem">
                        <Typography content="投稿予約をする" color="primary" size="normal" />
                        <ToggleButton checked={schedulePost} onChange={() => setSchedulePost(!schedulePost)} />
                    </Wrapper>
                    {schedulePost && (
                        <Wrapper gap="2rem">
                            <DatePicker defaultValue={selectedDate} onChange={setSelectedDate} />
                            <TimePicker defaultValue={selectedTime} onChange={setSelectedTime} />
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
            <TemplateManagerModal isOpen={false} onClose={() => {}} />
        </Wrapper>
    );
}
