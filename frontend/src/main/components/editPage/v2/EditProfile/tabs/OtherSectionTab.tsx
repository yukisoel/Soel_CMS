import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";

type Props = {
  businessOwnerInfo?: string;
  serviceInfo?: string;
  serviceOptionInfo?: string;
  onEditBusinessOwner?: () => void;
  onEditService?: () => void;
  onEditServiceOption?: () => void;
};

export default function OtherSectionTab({
  businessOwnerInfo = '内容が入ります。',
  serviceInfo = '内容が入ります。',
  serviceOptionInfo = '内容が入ります。',
  onEditBusinessOwner,
  onEditService,
  onEditServiceOption,
}: Props) {
  return (
    <Wrapper direction="col" gap="3rem" className={styles.main_content}>
      {/* ビジネス所有者情報セクション */}
      <Wrapper direction="col" gap="1rem">
        <Typography
          content="ビジネス所有者情報"
          color="primary"
          size="normal"
        />
        <Wrapper className={styles.field_row}>
          <Wrapper className={styles.field_container}>
            <Typography
              content={businessOwnerInfo}
              color="secondary"
              size="normal"
            />
          </Wrapper>
          <Button
            bgColor="primary"
            padding="0.5rem 1.8rem"
            onClick={onEditBusinessOwner}
          >
            <Typography
              content="編集"
              color="primary"
              size="normal"
            />
          </Button>
        </Wrapper>
      </Wrapper>

      {/* サービスセクション */}
      <Wrapper direction="col" gap="1rem">
        <Typography
          content="サービス"
          color="primary"
          size="normal"
        />
        <Wrapper className={styles.field_row}>
          <Wrapper className={styles.field_container}>
            <Typography
              content={serviceInfo}
              color="secondary"
              size="normal"
            />
          </Wrapper>
          <Button
            bgColor="primary"
            padding="0.5rem 1.8rem"
            onClick={onEditService}
          >
            <Typography
              content="編集"
              color="primary"
              size="normal"
            />
          </Button>
        </Wrapper>
      </Wrapper>

      {/* サービスオプションセクション */}
      <Wrapper direction="col" gap="1rem">
        <Typography
          content="サービスオプション"
          color="primary"
          size="normal"
        />
        <Wrapper className={styles.field_row}>
          <Wrapper className={styles.field_container}>
            <Typography
              content={serviceOptionInfo}
              color="secondary"
              size="normal"
            />
          </Wrapper>
          <Button
            bgColor="primary"
            padding="0.5rem 1.8rem"
            onClick={onEditServiceOption}
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
