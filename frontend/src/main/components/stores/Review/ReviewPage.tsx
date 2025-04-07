import styles from "@/main/components/stores/Review/ReviewPage.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SearchBox from "@/main/common/SearchBox";
import Separator from "@/main/common/Separator";
import Button from "@/main/common/Button";
import ReviewCard, { Review } from "./ReviewCard";
import SearchDetailModal from "./Modal/SearchDetailModal";
import { useModal } from "@/main/common/Modal/useModal";
import ReviewDetailModal from "./Modal/ReviewDetailModal";
import { useState } from "react";

const reviews: Review[] = [
    { id: 1, serviceName: "GBP", rating: 5, date: "2025-03-01", content: "素晴らしいサービスでした！".repeat(50), replied: false },
    { id: 2, serviceName: "GBP", rating: 4, date: "2025-03-02", content: "とても満足しています。", replied: true },
];

export default function ReviewPage() {
    const { isOpen: isSearchModalOpen, openModal: openSearchModal, closeModal: closeSearchModal } = useModal();
    const { isOpen: isReviewDetailModalOpen, openModal: openReviewDetailModal, closeModal: closeReviewDetailModal } = useModal();
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    const handleReviewClick = (review: Review) => {
        setSelectedReview(review);
        openReviewDetailModal();
    };

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
                        review={review}
                        onClick={() => handleReviewClick(review)}
                    />
                ))}
            </Wrapper>
            <SearchDetailModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
            {selectedReview && (
                <ReviewDetailModal isOpen={isReviewDetailModalOpen} onClose={closeReviewDetailModal} review={selectedReview} />
            )}
        </Wrapper>
    );
}
