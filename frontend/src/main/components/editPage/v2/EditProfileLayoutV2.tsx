import styles from "./EditProfileLayoutV2.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import Separator from "@/main/common/Separator";
import { useAdvancedTabs } from "@/main/common/AdvancedTabs/useAdvancedTabs";
import { GoogleService } from "@/main/service/GoogleService.ts";
import { useState } from "react";

type Props = {
    googleService: GoogleService;
};

export default function EditProfileLayoutV2({
    googleService,
}: Props) {
    // 内部状態の定義
    const [businessName, setBusinessName] = useState("SOELグルメ通り店");
    const [businessCategories, setBusinessCategories] = useState([
        "寿司店",
        "回転寿司店",
        "テイクアウト寿司店",
        "シーフード・海鮮料理店",
        "和食店"
    ]);
    const [description, setDescription] = useState(
        "こだわりが廻るグルメ回転寿司。こころを握る美味しい時間。\n" +
        "日本海の魚介を職人の目利きで仕入れ、さばき、握る。米、醤油、調味料はもちろん、国産の\n" +
        "割箸にまでこだわる。安心して美味しい寿司を召し上がっていただ..."
    );
    const [openingDate, setOpeningDate] = useState("2024年8月26日");

    const { selectedTab, tabsRender } = useAdvancedTabs([
        { tabKey: 'overview', content: '概要' },
        { tabKey: 'contact', content: '連絡先' },
        { tabKey: 'location', content: '所在地' },
        { tabKey: 'other', content: 'その他' },
        { tabKey: 'hours', content: '営業時間' },
    ]);

    const renderContent = () => {
        switch (selectedTab) {
            case 'overview':
                return (
                    <Wrapper direction="col" gap="3rem" className={styles.main_content}>
                        {/* ビジネス名セクション */}
                        <Wrapper direction="col" gap="1rem">
                            <Typography
                                content="ビジネス名"
                                color="primary"
                                size="normal"
                            />
                            <Wrapper className={styles.field_row}>
                                <Wrapper className={styles.field_container}>
                                    <Typography
                                        content={businessName}
                                        color="secondary"
                                        size="normal"
                                    />
                                </Wrapper>
                                <Button
                                    bgColor="primary"
                                    padding="0.5rem 1.8rem"
                                    onClick={() => {}}
                                >
                                    <Typography
                                        content="編集"
                                        color="primary"
                                        size="normal"
                                    />
                                </Button>
                            </Wrapper>
                        </Wrapper>

                        {/* ビジネスカテゴリセクション */}
                        <Wrapper direction="col" gap="1rem">
                            <Typography
                                content="ビジネスカテゴリ"
                                color="primary"
                                size="normal"
                            />
                            <Wrapper className={styles.field_row}>
                                <Wrapper className={styles.field_container}>
                                    <Typography
                                        content={businessCategories.join(', ')}
                                        color="secondary"
                                        size="normal"
                                    />
                                </Wrapper>
                                <Button
                                    bgColor="primary"
                                    padding="0.5rem 1.8rem"
                                    onClick={() => {}}
                                >
                                    <Typography
                                        content="編集"
                                        color="primary"
                                        size="normal"
                                    />
                                </Button>
                            </Wrapper>
                        </Wrapper>

                        {/* 説明セクション */}
                        <Wrapper direction="col" gap="1rem">
                            <Typography
                                content="説明"
                                color="primary"
                                size="normal"
                            />
                            <Wrapper className={styles.field_row}>
                                <Wrapper className={styles.field_container}>
                                    <Typography
                                        content={description}
                                        color="secondary"
                                        size="normal"
                                    />
                                </Wrapper>
                                <Button
                                    bgColor="primary"
                                    padding="0.5rem 1.8rem"
                                    onClick={() => {}}
                                >
                                    <Typography
                                        content="編集"
                                        color="primary"
                                        size="normal"
                                    />
                                </Button>
                            </Wrapper>
                        </Wrapper>

                        {/* 開業日セクション */}
                        <Wrapper direction="col" gap="1rem">
                            <Typography
                                content="開業日"
                                color="primary"
                                size="normal"
                            />
                            <Wrapper className={styles.field_row}>
                                <Wrapper className={styles.field_container}>
                                    <Typography
                                        content={openingDate}
                                        color="secondary"
                                        size="normal"
                                    />
                                </Wrapper>
                                <Button
                                    bgColor="primary"
                                    padding="0.5rem 1.8rem"
                                    onClick={() => {}}
                                >
                                    <Typography
                                        content="編集"
                                        color="primary"
                                        size="normal"
                                    />
                                </Button>
                            </Wrapper>
                        </Wrapper>
                    </Wrapper>
                );
            case 'contact':
                return (
                    <Wrapper direction="col" gap="3rem" className={styles.main_content}>
                        {/* 連絡先のコンテンツをここに実装 */}
                        <Typography
                            content="連絡先セクションは開発中です"
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                );
            case 'location':
                return (
                    <Wrapper direction="col" gap="3rem" className={styles.main_content}>
                        {/* 所在地のコンテンツをここに実装 */}
                        <Typography
                            content="所在地セクションは開発中です"
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                );
            case 'other':
                return (
                    <Wrapper direction="col" gap="3rem" className={styles.main_content}>
                        {/* その他のコンテンツをここに実装 */}
                        <Typography
                            content="その他セクションは開発中です"
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                );
            case 'hours':
                return (
                    <Wrapper direction="col" gap="3rem" className={styles.main_content}>
                        {/* 営業時間のコンテンツをここに実装 */}
                        <Typography
                            content="営業時間セクションは開発中です"
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                );
            default:
                return null;
        }
    };

    return (
        <Wrapper direction="col" padding="5rem 4.3rem" className={styles.container}>
            {/* ヘッダー部分 */}
            <Wrapper direction="col" gap="2rem" className={styles.header}>
                <Typography
                    content="プロフィールを編集"
                    color="primary"
                    size="large"
                    weight="normal"
                />
            </Wrapper>

            {/* ナビゲーション */}
            <Wrapper direction="col" gap="5rem">
                {tabsRender()}
            </Wrapper>

            {/* タブコンテンツ */}
            {renderContent()}
        </Wrapper>
    );
}
