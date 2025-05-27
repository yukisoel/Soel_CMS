import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import CheckCircleIcon from '@/main/assets/CheckCircleIcon.svg';
import RecommendReservationIcon from '@/main/assets/RecommendReservation.svg';
import styles from '../EditReservationV2.module.scss';

type Props = {
  onTryButtonClick: () => void;
};

export const RecommendedTab = ({ onTryButtonClick }: Props) => {
  return (
    <Wrapper direction="col" align="align-start" gap="5rem" padding="0 3rem">
      <Wrapper direction="col" align="align-start" gap="1.1rem">
        <Typography content="おすすめの予約ボタン" size="normal" color="primary" />
        <Wrapper direction="col" align="align-start">
          <Typography
            content="プロフィールの上部に目立つようにボタンを表示し、ユーザーが優先プロバイダを使用して"
            size="xsmall"
            color="gray"
            weight="normal"
          />
          <Typography content="予約できるようにします。" size="xsmall" color="gray" weight="normal" />
        </Wrapper>
      </Wrapper>

      <Wrapper justify="justify-start" gap="7.5rem" padding="0 0 0 4rem" className={styles.feature_section}>
        <Wrapper direction="col" gap="3rem" padding="3.2rem 0 0" justify="justify-center" align="align-start">
          <Wrapper direction="col" gap="3.1rem">
            <Wrapper gap="2.2rem" align="align-center">
              <img src={CheckCircleIcon} alt="CheckCircleIcon" />
              <Typography content="目を引くボタン" size="medium" color="primary" />
            </Wrapper>
            <Wrapper gap="2.2rem" align="align-center">
              <img src={CheckCircleIcon} alt="CheckCircleIcon" />
              <Typography content="Google サービスとの統合" size="medium" color="primary" />
            </Wrapper>
          </Wrapper>
          <Button bgColor="primary" padding="0.5rem 3rem" onClick={onTryButtonClick} className={styles.try_button}>
            <Typography content="使ってみる" size="medium" color="primary" />
          </Button>
        </Wrapper>
        <img src={RecommendReservationIcon} alt="RecommendReservationIcon" />
      </Wrapper>
    </Wrapper>
  );
};
