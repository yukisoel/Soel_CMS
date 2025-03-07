import styles from "@/main/components/stores/Review/ReviewPage.module.scss";
import { GoogleService } from "@/main/service/GoogleService";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SearchBox from "@/main/common/SearchBox";
import Separator from "@/main/common/Separator";
import Button from "@/main/common/Button";
import ReviewCard from "./ReviewCard";
import SearchDetailModal from "./Modal/SearchDetailModal";
import { useModal } from "@/main/common/Modal/useModal";

type Props = {
    googleService: GoogleService;
};

const reviews = [
    { id: 1, customer: "山田太郎", rating: 5, date: "2025-03-01", content: "素晴らしいサービスでした！", replied: false },
    { id: 2, customer: "鈴木花子", rating: 4, date: "2025-03-02", content: "とても満足しています。", replied: true },
];

export default function ReviewPage({ googleService }: Props) {
    const { isOpen: isSearchModalOpen, openModal: openSearchModal, closeModal: closeSearchModal } = useModal();

    return (
        <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
            <Wrapper direction="col" gap="2rem">
                <Typography content="口コミ" color="primary" size="medium" />
                <Wrapper gap="3rem">
                    <SearchBox placeholder="ワードを検索" width="42.7rem" onChange={() => {}} />
                    <Button bgColor="primary" onClick={openSearchModal}>
                        <Typography content="詳細を指定" color="primary" size="normal" weight="normal" />
                    </Button>
                </Wrapper>
                <Separator width="100%" borderWidth="2px" />
            </Wrapper>
            <Wrapper direction="col" gap="2rem" align="align-start" padding="4rem 0 0 0">
                {reviews.map(review => (
                    <ReviewCard
                        key={review.id}
                        customer={review.customer}
                        rating={review.rating}
                        date={review.date}
                        content={review.content}
                        replied={review.replied}
                    />
                ))}
            </Wrapper>
            <SearchDetailModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
        </Wrapper>
    );
}
