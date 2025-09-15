import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import Loading from "@/main/common/Loading";
import styles from "../EditProfileLayoutV2.module.scss";
import { GoogleLocationProfileModel, GoogleLocationAttributesModel, GoogleLocationAttributeSnsLinkRequest, GoogleLocationAttribute } from "@/types/apiModel";
import { GoogleService } from "@/main/service/GoogleService";
import { useParams } from "react-router-dom";
import { useModal } from "@/main/common/Modal/useModal";
import { EditPhoneModal } from "../modals/EditPhoneModal";
import { EditWebSiteUrlModal } from "../modals/EditWebSiteUrlModal";
import { EditMenuLinkModal } from "../modals/EditMenuLinkModal";
import { EditSnsLinkModal } from "../modals/EditSnsLinkModal";
import { useMemo, useState } from "react";

type Props = {
    profile: GoogleLocationProfileModel | null;
    attributes: GoogleLocationAttributesModel | null;
    fetchProfile: () => Promise<void>;
    fetchAttributes: () => Promise<void>;
    googleService: GoogleService;
    isLoading?: boolean;
};

const SNS_TYPE_LABEL_MAP = {
    FACEBOOK: 'Facebookリンク',
    INSTAGRAM: 'Instagramリンク',
    TWITTER: 'X（旧Twitter）リンク',
    TIKTOK: 'TikTokリンク',
    YOUTUBE: 'YouTubeリンク',
    LINKEDIN: 'LinkedInリンク',
    PINTEREST: 'Pinterestリンク',
};

export default function ContactTab({
    profile,
    attributes: attributesModel,
    fetchProfile,
    fetchAttributes,
    googleService,
    isLoading = false,
}: Props) {
    const { locationId } = useParams();
    const { isOpen: isPhoneNumberModalOpen, openModal: openPhoneNumberModal, closeModal: closePhoneNumberModalBase } = useModal();
    const handlePhoneNumberSave = async (data: {phone: string}) => {
        await googleService.updateLocationProfilePhoneNumber(locationId ?? '', data.phone);
        await fetchProfile();
        closePhoneNumberModalBase();
    };
    const { isOpen: isWebsiteModalOpen, openModal: openWebsiteModal, closeModal: closeWebsiteModalBase } = useModal();
    const handleWebsiteSave = async (data: {webSiteUri: string}) => {
        await googleService.updateLocationProfileWebsiteUri(locationId ?? '', data.webSiteUri);
        await fetchProfile();
        closeWebsiteModalBase();
    };
    const { isOpen: isMenuLinkModalOpen, openModal: openMenuLinkModal, closeModal: closeMenuLinkModalBase } = useModal();
    const handleMenuLinkSave = async (data: {menuLink: string}) => {
        await googleService.updateLocationAttributeMenuLink(locationId ?? '', data.menuLink);
        await fetchAttributes();
        closeMenuLinkModalBase();
    };
    const menuLink = useMemo(() => {
        const uriValues = attributesModel?.attributes?.find(attribute => attribute.name === 'attributes/url_menu')?.uriValues;
        return uriValues?.[0]?.uri || '';
    }, [attributesModel]);

    const { isOpen: isSnsLinkModalOpen, openModal: openSnsLinkModal, closeModal: closeSnsLinkModalBase } = useModal();
    const handleSnsLinkSave = async (data: {snsLink: string}) => {
        if (!selectedSnsLink) return;
        const snsType = selectedSnsLink.name?.replace('attributes/url_', '').toUpperCase() as GoogleLocationAttributeSnsLinkRequest['snsType'] || '';
        await googleService.updateLocationAttributeSnsLink(locationId ?? '', { snsType, snsUrl: data.snsLink });
        await fetchAttributes();
        closeSnsLinkModalBase();
    };

    const snsLinks = useMemo(() => {
        const snsLinks = attributesModel?.attributes?.filter(attribute => attribute.valueType === "URL")?.filter(attribute => attribute.name !== 'attributes/url_menu');
        return snsLinks;
    }, [attributesModel]);

    const [selectedSnsLink, setSelectedSnsLink] = useState<GoogleLocationAttribute | null>(null);

    if (isLoading) {
        return <Loading message="連絡先情報を更新中..." size="small" minHeight="200px" />;
    }

    return (
        <Wrapper direction="col" gap="3rem" className={styles.main_content}>
            {/* 電話番号セクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="電話番号"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={profile?.phoneNumbers?.primaryPhone || ''}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={openPhoneNumberModal}
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

            {/* ウェブサイトセクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="ウェブサイト"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={profile?.websiteUri || ''}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={openWebsiteModal}
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

            {/* SNSリンクセクション */}
            {snsLinks?.map((attribute, idx) => (
                <Wrapper direction="col" gap="1rem" key={attribute.name || idx}>
                    <Typography
                        content={attribute.name ? (SNS_TYPE_LABEL_MAP[attribute.name.replace('attributes/url_', '').toUpperCase() as keyof typeof SNS_TYPE_LABEL_MAP] || 'SNSリンク') : 'SNSリンク'}
                        color="primary"
                        size="normal"
                    />
                    <Wrapper className={styles.field_row}>
                        <Wrapper className={styles.field_container}>
                            <Typography
                                content={attribute.uriValues?.[0]?.uri || ''}
                                color="secondary"
                                size="normal"
                            />
                        </Wrapper>
                        <Button
                            bgColor="primary"
                            padding="0.5rem 1.8rem"
                            onClick={() => { setSelectedSnsLink(attribute); openSnsLinkModal(); }}
                        >
                            <Typography
                                content="編集"
                                color="primary"
                                size="normal"
                            />
                        </Button>
                    </Wrapper>
                </Wrapper>
            ))}


            {/* メニューリンクセクション */}
            <Wrapper direction="col" gap="1rem">
                <Typography
                    content="メニューリンク"
                    color="primary"
                    size="normal"
                />
                <Wrapper className={styles.field_row}>
                    <Wrapper className={styles.field_container}>
                        <Typography
                            content={menuLink}
                            color="secondary"
                            size="normal"
                        />
                    </Wrapper>
                    <Button
                        bgColor="primary"
                        padding="0.5rem 1.8rem"
                        onClick={openMenuLinkModal}
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

            <EditPhoneModal
                isOpen={isPhoneNumberModalOpen}
                onClose={closePhoneNumberModalBase}
                onSubmit={handlePhoneNumberSave}
                initialValues={{phone: profile?.phoneNumbers?.primaryPhone || ''}}
            />
            <EditWebSiteUrlModal
                isOpen={isWebsiteModalOpen}
                onClose={closeWebsiteModalBase}
                onSubmit={handleWebsiteSave}
                initialValues={{webSiteUri: profile?.websiteUri || ''}}
            />
            <EditMenuLinkModal
                isOpen={isMenuLinkModalOpen}
                onClose={closeMenuLinkModalBase}
                onSubmit={handleMenuLinkSave}
                initialValues={{menuLink: menuLink}}
            />
            <EditSnsLinkModal
                isOpen={isSnsLinkModalOpen}
                onClose={closeSnsLinkModalBase}
                onSubmit={handleSnsLinkSave}
                type={selectedSnsLink ? selectedSnsLink.name?.replace('attributes/url_', '').toUpperCase() as GoogleLocationAttributeSnsLinkRequest['snsType'] : 'TWITTER' as GoogleLocationAttributeSnsLinkRequest['snsType']}
                initialValues={{ snsLink: selectedSnsLink?.uriValues?.[0]?.uri || '' }}
            />
        </Wrapper>
    );
}
