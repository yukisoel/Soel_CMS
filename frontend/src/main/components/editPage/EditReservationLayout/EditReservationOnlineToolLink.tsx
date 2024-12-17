import Button from "@/main/common/Button";
import Typography from "@/main/common/Typography";
import Wrapper from "@/main/common/Wrapper";
import RecommendReservationIcon from '@/main/assets/RecommendReservation.svg';
import styles from '@/main/components/editPage/EditReservationLayout/EditReservationOnlineToolLink.module.scss';

function OnlineToolLinkItem() {
    return (
        <Wrapper>
            <Wrapper padding="1.7rem 3rem 2.6rem 0">
                <Button bgColor="primary" padding="1rem 2.1rem 1rem 2.1rem" className={styles.edit_button}>
                    <Typography content="編集" size="small" color="primary" />
                </Button>
            </Wrapper>
            <Wrapper direction="col" gap="1.6rem">
                <Typography content="食べログ" size="medium" color="secondary" />
                <Typography content="https://tabelog.com/" size="large" color="primary" />
            </Wrapper>
        </Wrapper>
    )
}

export default function EditReservationOnlineToolLink() {
    return (
    <Wrapper padding="4.8rem 11rem 5.8rem 15rem" justify="justify-between" className={styles.reservation_container}>
        <Wrapper direction="col">
            <Wrapper direction="col" gap="1.1rem">
                <Typography content="オンライン予約ツールへのリンク" size="medium" color="primary" />
                <Wrapper direction="col" gap="1.6rem">
                    <Typography content="オンライン予約ページへのカスタムリンクを追加して、" size="normal" color="gray" weight="normal" />
                    <Typography content="ユーザーが直接予約できるようにしましょう。" size="normal" color="gray" weight="normal" />
                </Wrapper>
            </Wrapper>
            <Wrapper padding="5.6em 0 3.6em">
                <Button bgColor="primary" padding="2rem 4.3rem 2.2rem 3.9rem">
                    <Typography content="別のリンクを追加" size="medium" color="primary" />
                </Button>
            </Wrapper>
            <Wrapper direction="col" gap="4.9rem">
                <OnlineToolLinkItem />
                <OnlineToolLinkItem />
                <OnlineToolLinkItem />
            </Wrapper>
        </Wrapper>
        <img src={RecommendReservationIcon} alt={'RecommendReservationIcon'} />
      </Wrapper>
    )
}
