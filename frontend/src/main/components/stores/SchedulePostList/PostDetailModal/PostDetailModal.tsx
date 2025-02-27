import React, { MouseEvent } from 'react';
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "./PostDetailModal.module.scss";
import CloseIcon from '@/main/assets/CloseIcon.svg';
import Separator from "@/main/common/Separator";
import ModalNavIcon from '@/main/assets/ModalNavIcon.svg';

export type Post = {
    title: string;
    date: string;
    time: string;
    shopList: string;
    serviceList: string;
    postContent: string;
    hashtags: string[];
    images: string[];
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    post: Post;
    onNextClick: () => void;
    onPrevClick: () => void;
};

const PostDetailModal = ({ isOpen, onClose, post, onPrevClick, onNextClick }: Props) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modal_overlay} onClick={handleOverlayClick}>
            <div className={styles.modal_wrapper}>
                <Wrapper gap="2.2rem">
                    <img src={ModalNavIcon} alt="modal nav icon" width="38px" height="662px" onClick={onPrevClick} />
                    <Wrapper direction="col" gap="3rem" className={styles.modal_content}>
                        <Wrapper direction="col" gap="2rem">
                            <div className={styles.modal_header}>
                                <Typography content="投稿詳細" color="primary" size="normal" />
                                <button className={styles.close_button} onClick={onClose}>
                                    <img src={CloseIcon} alt="close icon" />
                                </button>
                            </div>
                            <Separator width="100%" />
                        </Wrapper>
                        <Wrapper direction="col">
                            <Wrapper gap="3.5rem" padding="0 0 4rem 0">
                                <Wrapper direction="col" gap="3.9rem">
                                    <Wrapper direction="col" gap="1.3rem" className={styles.image_wrapper}>
                                        <div style={{ width: "298px", height: "298px", backgroundColor: "#D9D9D9" }} />
                                        <Wrapper gap="0.7rem" className={styles.image_list_wrapper}>
                                            <div style={{ width: "44px", height: "44px", backgroundColor: "#D9D9D9" }} />
                                            <div style={{ width: "44px", height: "44px", backgroundColor: "#D9D9D9" }} />
                                            <div style={{ width: "44px", height: "44px", backgroundColor: "#D9D9D9" }} />
                                            <div style={{ width: "44px", height: "44px", backgroundColor: "#D9D9D9" }} />
                                            <div style={{ width: "44px", height: "44px", backgroundColor: "#D9D9D9" }} />
                                            <div style={{ width: "44px", height: "44px", backgroundColor: "#D9D9D9" }} />
                                            <div style={{ width: "44px", height: "44px", backgroundColor: "#D9D9D9" }} />
                                        </Wrapper>
                                        <Typography content="画像にマウスを合わせると拡大されます。" color="secondary" size="xxsmall" weight="normal" />
                                    </Wrapper>
                                    <Wrapper direction="col" gap="1.8rem">
                                        <Typography content="予約日時" color="primary" size="normal" />
                                        <Typography content={`${post.date} ${post.time}`} color="primary" size="normal" weight="normal" className={styles.text_wrapper} />
                                    </Wrapper>
                                </Wrapper>
                                <Wrapper direction="col" gap="4rem">
                                    <Wrapper gap="3.3rem">
                                        <Wrapper direction="col" gap="1.8rem" style={{ flex: 1 }}>
                                            <Typography content="投稿予定店舗" color="primary" size="normal" />
                                            <Typography content={post.shopList} color="primary" size="normal" weight="normal" className={styles.text_wrapper} />
                                        </Wrapper>
                                        <Wrapper direction="col" gap="1.8rem" style={{ flex: 1 }}>
                                            <Typography content="投稿サービス" color="primary" size="normal" />
                                            <Typography content={post.serviceList} color="primary" size="normal" weight="normal" className={styles.text_wrapper} />
                                        </Wrapper>
                                    </Wrapper>
                                    <Wrapper direction="col" gap="1.8rem">
                                        <Typography content="投稿文章" color="primary" size="normal" />
                                        <Typography content={post.postContent} color="primary" size="normal" weight="normal" className={styles.text_wrapper} />
                                    </Wrapper>
                                    <Wrapper direction="col" gap="1.8rem">
                                        <Typography content="Instagramハッシュタグ" color="primary" size="normal" />
                                        <Typography content={post.hashtags.join(' ')} color="primary" size="normal" weight="normal" className={styles.text_wrapper} />
                                    </Wrapper>
                                </Wrapper>
                            </Wrapper>
                            <Wrapper justify="justify-end" gap="4rem">
                                <Button bgColor="secondary" padding="7px 10px" onClick={() => { }}>
                                    <Typography content="複製して新規投稿を作成" color="primary" size="normal" weight="normal" />
                                </Button>
                                <Button bgColor="primary" padding="7px 10px" onClick={() => { }}>
                                    <Typography content="修正する" color="primary" size="normal" weight="normal" />
                                </Button>
                            </Wrapper>
                        </Wrapper>
                    </Wrapper>
                    <img src={ModalNavIcon} alt="modal nav icon" width="38px" height="662px" className={styles.next_button} onClick={onNextClick} />
                </Wrapper>
            </div>
        </div>
    );
};

export default PostDetailModal;
