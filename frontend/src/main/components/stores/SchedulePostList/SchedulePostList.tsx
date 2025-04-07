import styles from "@/main/components/stores/SchedulePostList/SchedulePostList.module.scss";
import { GoogleService } from "@/main/service/GoogleService";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SearchBox from "@/main/common/SearchBox";
import Separator from "@/main/common/Separator";
import Button from "@/main/common/Button";
import PostDetailModal, { Post } from "./PostDetailModal/PostDetailModal";
import { useState } from "react";

type Props = {
    googleService: GoogleService;
};

const posts: Post[] = [
    {
        title: "タイトル1",
        date: "2024年12月20日",
        time: "12時34分",
        shopList: "南青山店｜六本木店｜南青山店｜六本木店｜南青山店｜六本木店｜南青山店｜六本木店｜南青山",
        serviceList: "【Googleビジネスプロフィール】クーポン",
        postContent: "文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投",
        hashtags: ["#ハッシュタグ", "#ハッシュタグ", "#ハッシュタグ", "#ハッシュタグ", "#ハッシュタグ"],
        images: []
    },
    {
        title: "タイトル2",
        date: "2024年12月21日",
        time: "14時00分",
        shopList: "渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷",
        serviceList: "【Instagram】ストーリーズ",
        postContent: "別の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投",
        hashtags: ["#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ"],
        images: []
    },
    {
        title: "タイトル2",
        date: "2024年12月21日",
        time: "14時00分",
        shopList: "渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷",
        serviceList: "【Instagram】ストーリーズ",
        postContent: "別の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投",
        hashtags: ["#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ"],
        images: []
    },
    {
        title: "タイトル2",
        date: "2024年12月21日",
        time: "14時00分",
        shopList: "渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷",
        serviceList: "【Instagram】ストーリーズ",
        postContent: "別の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投",
        hashtags: ["#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ"],
        images: []
    },
    {
        title: "タイトル2",
        date: "2024年12月21日",
        time: "14時00分",
        shopList: "渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷",
        serviceList: "【Instagram】ストーリーズ",
        postContent: "別の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投",
        hashtags: ["#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ"],
        images: []
    },
    {
        title: "タイトル2",
        date: "2024年12月21日",
        time: "14時00分",
        shopList: "渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷店｜新宿店｜渋谷",
        serviceList: "【Instagram】ストーリーズ",
        postContent: "別の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投",
        hashtags: ["#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ", "#別のハッシュタグ"],
        images: []
    }
];

export default function SchedulePost({ googleService }: Props) {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const handleOpenModal = (post: Post) => {
        setSelectedPost(post);
    };

    const handleNextPost = () => {
        if (selectedPost) {
            const currentIndex = posts.findIndex(post => post.title === selectedPost.title);
            const nextIndex = (currentIndex + 1) % posts.length;
            setSelectedPost(posts[nextIndex]);
        }
    };

    const handlePrevPost = () => {
        if (selectedPost) {
            const currentIndex = posts.findIndex(post => post.title === selectedPost.title);
            const prevIndex = (currentIndex - 1 + posts.length) % posts.length;
            setSelectedPost(posts[prevIndex]);
        }
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
    };

    return (
        <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
            <Wrapper direction="col" gap="2rem">
                <Typography content="予約投稿一覧" color="primary" size="medium" />
                <Wrapper gap="3rem">
                    <SearchBox placeholder="ブランド名を検索" width="42.7rem" onChange={() => {}} />
                    <SearchBox placeholder="サービス名を検索" width="42.7rem" onChange={() => {}} />
                    <SearchBox placeholder="店舗名を検索" width="42.7rem" onChange={() => {}} />
                </Wrapper>
                <Separator width="100%" borderWidth="2px" />
            </Wrapper>
            <Wrapper direction="col" gap="2rem" align="align-start" padding="4rem 0 0 0">
                {posts.map((post, index) => (
                    <Wrapper key={index} gap="1rem" align="align-end" justify="justify-start">
                        <Wrapper padding="2.2rem" align="align-start" className={styles.card}>
                            <Wrapper gap="1.5rem">
                                <div className={styles.image_large} />
                                <div className={styles.image_large} />
                                <Wrapper direction="col" gap="1.5rem">
                                    <div className={styles.image_small} />
                                    <div className={styles.image_small} />
                                </Wrapper>
                            </Wrapper>
                            <Wrapper direction="col" gap="0.8rem" padding="0 2rem 0 5rem">
                                <Wrapper gap="1rem">
                                    <div className={styles.service_icon} />
                                    <div className={styles.service_icon} />
                                    <div className={styles.service_icon} />
                                    <div className={styles.service_icon} />
                                    <div className={styles.service_icon} />
                                </Wrapper>
                                <Typography content={`投稿予定日：${post.date} ${post.time}`} color="secondary" size="xsmall" />
                                <Typography content="投稿店舗" color="primary" size="xsmall" />
                                <Wrapper padding="1.1rem 1.7rem" className={styles.shop_list}>
                                    <Typography content={post.shopList} color="primary" size="xsmall" weight="normal" className={styles.shop_list_content} />
                                </Wrapper>
                            </Wrapper>
                            <Wrapper direction="col" gap="1rem">
                                <Typography content="投稿文章" color="primary" size="xsmall" />
                                <Wrapper padding="1.5rem 2rem" className={styles.post_wrapper}>
                                    <Typography content={post.postContent} color="primary" size="xsmall" weight="normal" className={styles.post_content} />
                                </Wrapper>
                            </Wrapper>
                        </Wrapper>
                        <Button bgColor="primary" onClick={() => handleOpenModal(post)} className={styles.edit_button}>
                            <Typography content="編集" color="primary" size="normal" weight="normal" />
                        </Button>
                    </Wrapper>
                ))}
            </Wrapper>
            {selectedPost && (
                <PostDetailModal isOpen={!!selectedPost} onClose={handleCloseModal} post={selectedPost} onNextClick={handleNextPost} onPrevClick={handlePrevPost} />
            )}
        </Wrapper>
    );
}
