import styles from '@/main/components/stores/Review/ReviewCard.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import StarIcon from '@/main/assets/StarIcon.svg'
import NoReplyIcon from '@/main/assets/NoReplyIcon.svg'
import ReplyedIcon from '@/main/assets/ReplyedIcon.svg'
import Button from '@/main/common/Button'

export type Review = {
    id: string;
    serviceName: string;
    rating: number;
    date: string;
    content: string;
    replied: boolean;
    reviewReply?: {
        comment: string;
        updateTime: string;
    };
};

type Props = {
    review: Review;
    onClick: () => void;
};

export default function ReviewCard({ review, onClick }: Props) {
  const { serviceName, rating, date, content, replied } = review
  return (
    <Wrapper gap="1rem" align="align-end">
      <Wrapper direction="col" padding="2rem" gap="1rem" className={styles.card}>
        <Wrapper justify="justify-between">
          <Wrapper gap="1.3rem">
            <div className={styles.icon} />
            <Wrapper direction="col" gap="0.7rem">
              <Wrapper>
                <Typography content={`評価${rating}・${serviceName}`} color="primary" size="normal" />
                <Typography content={`・${date}`} color="secondary" size="normal" />
              </Wrapper>
              <Wrapper>
                {[...Array(rating)].map((_, index) => (
                  <img key={index} src={StarIcon} alt="star" />
                ))}
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <img src={replied ? ReplyedIcon : NoReplyIcon} alt="status" />
        </Wrapper>
        <Wrapper padding="1rem 2rem" className={styles.post_wrapper}>
          <Typography content={content} color="primary" size="xsmall" weight="normal" className={styles.post_content} />
        </Wrapper>
      </Wrapper>
      <Button bgColor="primary" onClick={onClick}>
        <Typography content="返信" color="primary" size="normal" weight="normal" />
      </Button>
    </Wrapper>
  )
}
