import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import styles from "../EditProfileLayoutV2.module.scss";
import EditBusinessCategoriesModal from "../modals/EditBusinessCategoriesModal";
import { GoogleLocationProfileModel, GoogleLocationCategory } from "@/types/apiModel.ts";
import { GoogleService } from "@/main/service/GoogleService";
import { useModal } from "@/main/common/Modal/useModal";
import { useParams } from "react-router-dom";
import { EditTitleModal } from "../modals/EditTitleModal";
import { EditDescriptionModal } from "../modals/EditDescriptionModal";
import { EditOpeningDateModal } from "../modals/EditOpeningDateModal";
import { useMemo } from "react";
type Props = {
    profile: GoogleLocationProfileModel | null;
    fetchProfile: () => Promise<void>;
    googleService: GoogleService;
};

export default function OverviewTab({
    profile,
    fetchProfile,
    googleService,
}: Props) {
    const { locationId } = useParams();
    const { isOpen: isTitleModalOpen, openModal: openTitleModal, closeModal: closeTitleModalBase } = useModal();
    const handleTitleSave = async (data: {title: string}) => {
        await googleService.updateLocationProfileTitle(locationId ?? '', data.title);
        await fetchProfile();
        closeTitleModalBase();
    };
    const { isOpen: isDescriptionModalOpen, openModal: openDescriptionModal, closeModal: closeDescriptionModalBase } = useModal();
    const handleDescriptionSave = async (data: {description: string}) => {
        await googleService.updateLocationProfileDescription(locationId ?? '', data.description);
        await fetchProfile();
        closeDescriptionModalBase();
    };
    const { isOpen: isPrimaryCategoriesModalOpen, openModal: openPrimaryCategoriesModal, closeModal: closePrimaryCategoriesModalBase } = useModal();
    const handlePrimaryCategoriesSave = async (categories: GoogleLocationCategory[]) => {
        const primaryCategory = categories[0];
        await googleService.updateLocationProfilePrimaryCategories(locationId ?? '', primaryCategory);
        await fetchProfile();
        closePrimaryCategoriesModalBase();
    };
    const { isOpen: isAdditionalCategoriesModalOpen, openModal: openAdditionalCategoriesModal, closeModal: closeAdditionalCategoriesModalBase } = useModal();
    const handleAdditionalCategoriesSave = async (categories: GoogleLocationCategory[]) => {
        await googleService.updateLocationProfileAdditionalCategories(locationId ?? '', categories);
        await fetchProfile();
        closeAdditionalCategoriesModalBase();
    };
    const { isOpen: isOpeningDateModalOpen, openModal: openOpeningDateModal, closeModal: closeOpeningDateModalBase } = useModal();
    const handleOpeningDateSave = async (data: {openingDate: Date | null}) => {
        if (!data.openingDate) return;
        await googleService.updateLocationProfileOpeningDate(locationId ?? '', {year: data.openingDate.getFullYear(), month: data.openingDate.getMonth() + 1, day: data.openingDate.getDate()});
        await fetchProfile();
        closeOpeningDateModalBase();
    };

    const openingDate = useMemo(() => {
        return profile?.openInfo?.openingDate && profile.openInfo.openingDate.year && profile.openInfo.openingDate.month && profile.openInfo.openingDate.day
            ? new Date(
                profile.openInfo.openingDate.year,
                profile.openInfo.openingDate.month - 1,
                profile.openInfo.openingDate.day
            )
            : null;
    }, [profile?.openInfo?.openingDate]);

    return (
        <Wrapper direction="col" gap="3rem" className={styles.main_content}>
            {/* ビジネス名セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="ビジネス名"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={profile?.title || ''}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={openTitleModal}
                        // disabled={isUpdating}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* ビジネスカテゴリセクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="ビジネスカテゴリ"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={profile?.categories?.primaryCategory?.displayName ?? 'カテゴリが設定されていません'}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={openPrimaryCategoriesModal}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* ビジネスカテゴリセクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="追加カテゴリ"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={profile?.categories?.additionalCategories?.map(category => category.displayName).join(', ') ?? 'カテゴリが設定されていません'}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={openAdditionalCategoriesModal}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* 説明セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="説明"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={profile?.profile?.description || ''}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={openDescriptionModal}
                        // disabled={isUpdating}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>

            {/* 開業日セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="開業日"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={profile?.openInfo?.openingDate ? formatDateToJapanese(profile?.openInfo?.openingDate) : ''}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={openOpeningDateModal}
                        // disabled={isUpdating}
                    >
                        <Typography
                            content="編集"
                            color="primary"
                            size="normal"
                        />
                    </Button>
                </Wrapper>
            </Wrapper>
            <EditTitleModal
                isOpen={isTitleModalOpen}
                onClose={closeTitleModalBase}
                onSubmit={handleTitleSave}
                initialValues={{
                    title: profile?.title ?? '',
                }}
            />
            <EditDescriptionModal
                isOpen={isDescriptionModalOpen}
                onClose={closeDescriptionModalBase}
                onSubmit={handleDescriptionSave}
                initialValues={{
                    description: profile?.profile?.description ?? '',
                }}
            />
            <EditBusinessCategoriesModal
                isOpen={isPrimaryCategoriesModalOpen}
                onClose={closePrimaryCategoriesModalBase}
                onSave={handlePrimaryCategoriesSave}
                categories={[profile?.categories?.primaryCategory ?? {name: '', displayName: ''}]}
                googleService={googleService}
                isSingleSelect={true}
            />
            <EditBusinessCategoriesModal
                isOpen={isAdditionalCategoriesModalOpen}
                onClose={closeAdditionalCategoriesModalBase}
                onSave={handleAdditionalCategoriesSave}
                categories={profile?.categories?.additionalCategories ?? []}
                googleService={googleService}
                isSingleSelect={false}
            />
            <EditOpeningDateModal
                isOpen={isOpeningDateModalOpen}
                onClose={closeOpeningDateModalBase}
                onSubmit={handleOpeningDateSave}
                initialValues={{openingDate: openingDate}}
            />
        </Wrapper>
    );
}

const formatDateToJapanese = (info: {year?: number, month?: number, day?: number}): string => {
    if (!info.year || !info.month || !info.day) return '';
    return `${info.year}年${info.month}月${info.day}日`;
};
