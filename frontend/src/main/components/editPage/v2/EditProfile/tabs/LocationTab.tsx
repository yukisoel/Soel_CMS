import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";

type Props = {
    address: string;
    serviceArea: string;
    onAddressChange: (value: string) => void;
    onServiceAreaChange: (value: string) => void;
};

export default function LocationTab({
    address,
    serviceArea,
    onAddressChange,
    onServiceAreaChange
}: Props) {
    return (
        <Wrapper direction="col" gap="3rem" className={styles.main_content}>
            {/* 店舗の住所セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="店舗の住所"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={address}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => onAddressChange(address)}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* サービス提供地域セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="サービス提供地域"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={serviceArea}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={() => onServiceAreaChange(serviceArea)}
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
