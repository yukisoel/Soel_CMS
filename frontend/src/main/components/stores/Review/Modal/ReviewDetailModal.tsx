import styles from "@/main/components/stores/Review/Modal/ReviewDetailModal.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Modal from "@/main/common/Modal/Modal";
import StarIcon from "@/main/assets/StarIcon.svg";
import NoReplyIcon from "@/main/assets/NoReplyIcon.svg";
import ReplyedIcon from "@/main/assets/ReplyedIcon.svg";
import Button from "@/main/common/Button";
import LayoutLabeledFormItem from "@/main/common/LayoutLabeledFormItem";
import { useState } from "react";
import Textarea from "@/main/common/Textarea";
import { Review } from "../ReviewCard";

type Props = {
    isOpen: boolean;
    handleReply: (replyContent: string  ) => void;
    onClose: () => void;
    review: Review
};

export default function ReviewDetailModal({ isOpen, handleReply, onClose, review }: Props) {
    const [replyContent, setReplyContent] = useState<string>("");

    const handleSubmit = () => {
        handleReply(replyContent);
        setReplyContent("");
    };

    const handleClose = () => {
        setReplyContent("");
        onClose();
    };

    return (
        <Modal headerContent="口コミ詳細" isOpen={isOpen} onClose={handleClose} contentRender={() => (
            <Wrapper direction="col" gap="3rem" className={styles.container}>
                <Wrapper direction="col" gap="1rem" className={styles.card}>
                    <Wrapper justify="justify-between">
                        <Wrapper gap="1.3rem">
                            <div className={styles.icon} />
                            <Wrapper direction="col" gap="0.7rem">
                                <Wrapper>
                                    <Typography content={`評価${review.rating}・${review.serviceName}`} color="primary" size="normal" />
                                    <Typography content={`・${review.date}`} color="secondary" size="normal" />
                                </Wrapper>
                                <Wrapper>
                                    {[...Array(review.rating)].map((_, index) => (
                                        <img key={index} src={StarIcon} alt="star" />
                                    ))}
                                </Wrapper>
                            </Wrapper>
                        </Wrapper>
                        <img src={review.replied ? ReplyedIcon : NoReplyIcon} alt="status" />
                    </Wrapper>
                    <Wrapper padding="1rem 2rem" className={styles.post_wrapper}>
                        <Typography content={review.content} color="primary" size="xsmall" weight="normal" className={styles.post_content} />
                    </Wrapper>
                </Wrapper>
                <LayoutLabeledFormItem label="返信">
                    <Textarea placeholder="返信を入力" value={replyContent} onChange={(e) => setReplyContent(e.target.value)} width="100%" />
                </LayoutLabeledFormItem>
                <Wrapper justify="justify-end" gap="4rem">
                    <Button bgColor="secondary" padding="7px 20px" onClick={handleClose}>
                        <Typography content="戻る" color="primary" size="normal" weight="normal" />
                    </Button>
                    <Button bgColor="primary" padding="7px 10px" onClick={handleSubmit}>
                        <Typography content="返信する" color="primary" size="normal" weight="normal" />
                    </Button>
                </Wrapper>
            </Wrapper>
        )}/>
    );
}
