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
import { useState, useEffect } from "react";
import { GoogleService } from "@/main/service/GoogleService";
import { GoogleLocationReviewModel } from "@/types/apiModel";
import { GoogleLocationReviewCustomStarRating } from "@/types/api";
import { useParams } from "react-router-dom";

type Props = {
    googleService: GoogleService;
};

export default function ReviewPage({ googleService }: Props) {
    const { isOpen: isSearchModalOpen, openModal: openSearchModal, closeModal: closeSearchModal } = useModal();
    const { isOpen: isReviewDetailModalOpen, openModal: openReviewDetailModal, closeModal: closeReviewDetailModal } = useModal();
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);

    const { accountId, locationId } = useParams();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Contextの値が設定されている場合のみAPIを呼び出し
                if (accountId && locationId) {
                    const locationReviews = await googleService.getLocationReviews(
                        accountId,
                        locationId
                    );

                    const formattedReviews: Review[] = locationReviews.map((review: GoogleLocationReviewModel, index: number) => {
                        const ratingValue = review.starRating ? (() => {
                            switch (review.starRating) {
                                case GoogleLocationReviewCustomStarRating.ONE:
                                    return 1;
                                case GoogleLocationReviewCustomStarRating.TWO:
                                    return 2;
                                case GoogleLocationReviewCustomStarRating.THREE:
                                    return 3;
                                case GoogleLocationReviewCustomStarRating.FOUR:
                                    return 4;
                                case GoogleLocationReviewCustomStarRating.FIVE:
                                    return 5;
                                default:
                                    return 0;
                            }
                        })() : 0;
                        const reviewDate = review.createTime ? (() => {
                            const date = new Date(review.createTime);
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const day = String(date.getDate()).padStart(2, '0');
                            return `${year}年${month}月${day}日`;
                        })() : '';

                        // 確実に一意のIDを生成（indexベースで一意性を保証）
                        const generateUniqueId = () => {
                            // reviewIdが存在し、有効な数値に変換できる場合
                            if (review.reviewId && typeof review.reviewId === 'string' && review.reviewId.trim() !== '') {
                                const parsedId = parseInt(review.reviewId);
                                if (!isNaN(parsedId) && parsedId > 0) {
                                    return parsedId;
                                }
                            }
                            // フォールバック: indexベースで一意性を保証
                            return index + 1;
                        };

                        return {
                            id: generateUniqueId(),
                            serviceName: "GBP",
                            rating: ratingValue,
                            date: reviewDate,
                            content: review.comment || '',
                            replied: !!review.reviewReply,
                            reviewReply: review.reviewReply ? {
                                comment: review.reviewReply.comment || '',
                                updateTime: review.reviewReply.updateTime || ''
                            } : undefined
                        };
                    });

                    setReviews(formattedReviews);
                }
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            }
        };

        fetchReviews();
    }, [googleService, accountId, locationId]);

    const handleReviewClick = (review: Review) => {
        setSelectedReview(review);
        openReviewDetailModal();
    };

    const handleReply = (replyContent: string) => {
        if (accountId && locationId && selectedReview) {
            googleService.postLocationReviewReply(accountId, locationId, selectedReview.id.toString(), replyContent);
        }
    };

    const handleDeleteReply = async () => {
        if (accountId && locationId && selectedReview) {
            try {
                await googleService.deleteLocationReviewReply(accountId, locationId, selectedReview.id.toString());
                // Refresh the reviews after deletion
                const updatedReviews = reviews.map(review => 
                    review.id === selectedReview.id 
                        ? { ...review, replied: false, reviewReply: undefined }
                        : review
                );
                setReviews(updatedReviews);
                closeReviewDetailModal();
            } catch (error) {
                console.error('Failed to delete review reply:', error);
            }
        }
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
                {reviews.length === 0 ? (
                    <Typography content="レビューがありません" color="gray" size="normal" />
                ) : (
                    reviews.map(review => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            onClick={() => handleReviewClick(review)}
                        />
                    ))
                )}
            </Wrapper>
            <SearchDetailModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
            {selectedReview && (
                <ReviewDetailModal 
                    isOpen={isReviewDetailModalOpen} 
                    onClose={closeReviewDetailModal} 
                    review={selectedReview} 
                    handleReply={handleReply}
                    handleDeleteReply={handleDeleteReply}
                />
            )}
        </Wrapper>
    );
}
