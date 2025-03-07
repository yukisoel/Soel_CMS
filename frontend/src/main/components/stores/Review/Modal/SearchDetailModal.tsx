import styles from "@/main/components/stores/Review/Modal/SearchDetailModal.module.scss";
import Wrapper from "@/main/common/Wrapper";
import LayoutLabeledFormItem from "@/main/common/LayoutLabeledFormItem";
import Modal from "@/main/common/Modal/Modal";
import PhotoPullDownMenu from "@/main/components/editPage/PhotoPullDownMenu";
import DatePicker from "@/main/common/DatePicker/DatePicker";
import RadioButton from "@/main/common/RadioButton";
import { useState } from "react";
import Button from "@/main/common/Button";
import Typography from "@/main/common/Typography";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function SearchDetailModal({ isOpen, onClose }: Props) {
    const [selectedService, setSelectedService] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectedStore, setSelectedStore] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [replyStatus, setReplyStatus] = useState<string>("指定なし");
    const [ratingOrder, setRatingOrder] = useState<string>("指定なし");

    const serviceOptions = ["Googleビジネスプロフィール", "食べログ", "Instagram"];
    const brandOptions = ["ブランドA", "ブランドB", "ブランドC"];
    const storeOptions = ["店舗A", "店舗B", "店舗C"];

    const replyOptions = [
        { label: "未返信", value: "未返信" },
        { label: "返信済み", value: "返信済み" },
        { label: "指定なし", value: "指定なし" },
    ];

    const ratingOptions = [
        { label: "高評価", value: "高評価" },
        { label: "低評価", value: "低評価" },
        { label: "指定なし", value: "指定なし" },
    ];

    return (
        <Modal headerContent="詳細を指定" isOpen={isOpen} onClose={onClose} contentRender={() => (
            <Wrapper direction="col" gap="3rem">
                <Wrapper gap="10rem">
                    <LayoutLabeledFormItem label="サービス名" className={styles.input_wrapper}>
                        <PhotoPullDownMenu
                            selectedContent={selectedService}
                            setSelectedContent={setSelectedService}
                            options={serviceOptions}
                        />
                    </LayoutLabeledFormItem>
                    <LayoutLabeledFormItem label="開始日">
                        <DatePicker onChange={(date) => setStartDate(date)} />
                    </LayoutLabeledFormItem>
                </Wrapper>
                <Wrapper gap="10rem">
                    <LayoutLabeledFormItem label="ブランド名" className={styles.input_wrapper}>
                        <PhotoPullDownMenu
                            selectedContent={selectedBrand}
                            setSelectedContent={setSelectedBrand}
                            options={brandOptions}
                        />
                    </LayoutLabeledFormItem>
                    <LayoutLabeledFormItem label="終了日">
                        <DatePicker onChange={(date) => setEndDate(date)} />
                    </LayoutLabeledFormItem>
                </Wrapper>
                <LayoutLabeledFormItem label="店舗名" className={styles.input_wrapper}>
                    <PhotoPullDownMenu
                        selectedContent={selectedStore}
                        setSelectedContent={setSelectedStore}
                        options={storeOptions}
                    />
                </LayoutLabeledFormItem>
                <LayoutLabeledFormItem label="表示順番（返信）">
                    <Wrapper direction="row" gap="1rem">
                        {replyOptions.map(option => (
                            <RadioButton
                                key={option.value}
                                label={option.label}
                                value={option.value}
                                name="replyStatus"
                                checked={replyStatus === option.value}
                                onChange={setReplyStatus}
                            />
                        ))}
                    </Wrapper>
                </LayoutLabeledFormItem>
                <LayoutLabeledFormItem label="表示順番（評価）">
                    <Wrapper direction="row" gap="1rem">
                        {ratingOptions.map(option => (
                            <RadioButton
                                key={option.value}
                                label={option.label}
                                value={option.value}
                                name="ratingOrder"
                                checked={ratingOrder === option.value}
                                onChange={setRatingOrder}
                            />
                        ))}
                    </Wrapper>
                </LayoutLabeledFormItem>
                <Wrapper justify="justify-end" gap="4rem">
                    <Button bgColor="secondary" padding="7px 20px" onClick={onClose}>
                        <Typography content="戻る" color="primary" size="normal" weight="normal" />
                    </Button>
                    <Button bgColor="primary" padding="7px 10px" onClick={() => { }}>
                        <Typography content="検索する" color="primary" size="normal" weight="normal" />
                    </Button>
                </Wrapper>
            </Wrapper>
        )}/>
    );
}
