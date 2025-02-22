import styles from "@/main/components/stores/SchedulePostList/SchedulePostList.module.scss";
import { GoogleService } from "@/main/service/GoogleService"
import { useSelectStore } from "../SelectStore/useSelectStore"
import { useSelectService } from "../SelectService/useSelectService";
import { useMemo, useState } from "react";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SearchBox from "@/main/common/SearchBox";
import Separator from "@/main/common/Separator";
import Button from "@/main/common/Button";

type Props = {
    googleService: GoogleService
}

export default function SchedulePost({googleService}: Props) {
    const shopList = "南青山店｜六本木店｜南青山店｜六本木店｜南青山店｜六本木店｜南青山店｜六本木店｜南青山"
    const postContent = "文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投稿の文章サンプル投"

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
                <Wrapper gap="1rem" align="align-end" justify="justify-start">
                    <Wrapper padding="2.2rem" align="align-start" className={styles.card}>
                        <Wrapper gap="1.5rem">
                            <div className={styles.image_large}/>
                            <div className={styles.image_large}/>
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
                            <Typography content="投稿予定日：2024年12月20日　12時34分" color="secondary" size="xsmall" />
                            <Typography content="投稿店舗" color="primary" size="xsmall" />
                            <Wrapper padding="1.1rem 1.7rem" className={styles.shop_list}>
                                <Typography content={shopList} color="primary" size="xsmall" weight="normal" className={styles.shop_list_content} />
                            </Wrapper>
                        </Wrapper>
                        <Wrapper direction="col" gap="1rem">
                            <Typography content="投稿文章" color="primary" size="xsmall" />
                            <Wrapper padding="1.5rem 2rem" className={styles.post_wrapper} >
                                <Typography content={postContent} color="primary" size="xsmall"  weight="normal" className={styles.post_content} />
                            </Wrapper>
                        </Wrapper>
                    </Wrapper>
                    <Button bgColor="primary"  onClick={() => {}} className={styles.edit_button}>
                        <Typography content="編集" color="primary" size="normal" weight="normal" />
                    </Button>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    )
}
