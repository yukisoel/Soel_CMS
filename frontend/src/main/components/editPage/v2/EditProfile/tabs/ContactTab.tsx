import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";

type Props = {
    phoneNumber: string;
    website: string;
    menuLink: string;
    snsLinks: Array<{ type: string; url: string; }>;
};

export default function ContactTab({
    phoneNumber,
    website,
    menuLink,
    snsLinks,
}: Props) {
    return (
        <Wrapper direction="col" gap="3rem" className={styles.main_content}>
            {/* 電話番号セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="電話番号"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={phoneNumber}
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

            {/* ウェブサイトセクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="ウェブサイト"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={website}
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

            {/* SNSリンクセクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="SNSリンク"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={`${styles.field_container} ${styles.sns_container}`}>
                        {snsLinks.map((sns, index) => (
                            <Wrapper key={index} className={styles.sns_item}>
                                <Typography
                                    content={sns.url}
                                    color="secondary"
                                    size="normal"
                                />
                            </Wrapper>
                        ))}
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

            {/* メニューリンクセクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="メニューリンク"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={menuLink}
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
}
