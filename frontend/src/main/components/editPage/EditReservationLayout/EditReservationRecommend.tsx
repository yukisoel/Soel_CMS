import Button from "@/main/common/Button";
import Typography from "@/main/common/Typography";
import Wrapper from "@/main/common/Wrapper";
import CheckCircleIcon from '@/main/assets/CheckCircleIcon.svg';
import RecommendReservationIcon from '@/main/assets/RecommendReservation.svg';
import styles from '@/main/components/editPage/EditReservationLayout/EditReservationLayout.module.scss';

export default function EditReservationRecommend() {
    return (
        <Wrapper direction="col" padding="6.8rem 0 5.4rem" gap="5rem" align="align-center" className={styles.reservation_container}>
        <Wrapper direction="col" gap="1.1rem" align="align-center">
            <Typography content="おすすめの予約ボタン" size="medium" color="primary" />
            <Wrapper direction="col" gap="1.6rem" align="align-center">
                <Typography content="プロフィールの上部に目立つようにボタンを表示し、" size="normal" color="gray" weight="normal" />
                <Typography content="ユーザーが優先プロバイダを使用して予約できるようにします。" size="normal" color="gray" weight="normal" />
            </Wrapper>
        </Wrapper>
        <Wrapper justify="justify-center" gap="7.5rem">
            <img src={RecommendReservationIcon} alt={'RecommendReservationIcon'} />
            <Wrapper direction="col" padding="3.2rem 0 0" gap="6rem">
                <Button bgColor="primary" padding="2.2rem 2.8rem 2.4rem 2.9rem">
                    <Typography content="使ってみる" size="medium" color="primary" />
                </Button>
                <Wrapper direction="col" gap="3.1rem">
                    <Wrapper gap="2.2rem">
                        <img src={CheckCircleIcon} alt={'CheckCircleIcon'} />
                        <Typography content="目を引くボタン" size="medium" color="primary" />
                    </Wrapper>
                    <Wrapper gap="2.2rem">
                        <img src={CheckCircleIcon} alt={'CheckCircleIcon'} />
                        <Typography content="Google サービスとの統合" size="medium" color="primary" />
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Wrapper>
      </Wrapper>
    )
}
