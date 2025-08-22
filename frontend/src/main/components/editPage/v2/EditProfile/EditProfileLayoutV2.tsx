import styles from "./EditProfileLayoutV2.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import { useAdvancedTabs } from "@/main/common/AdvancedTabs/useAdvancedTabs";
import { useCallback, useState, useEffect } from "react";
import OverviewTab from "./tabs/OverviewTab";
import ContactTab from "./tabs/ContactTab";
import LocationTab from "./tabs/LocationTab";
import HoursTab from "./tabs/HoursTab";
import OtherSectionTab from "./tabs/OtherSectionTab";
import { useGoogleRepository } from "@/main/contexts/GoogleRepositoryContext";
import { useParams } from "react-router-dom";
import {GoogleLocationProfileModel, GoogleLocationAttributesModel} from "@/types/apiModel.ts";

export default function EditProfileLayoutV2() {
    const googleRepository = useGoogleRepository();
    const {locationId} = useParams()
    const [profile, setProfile] = useState<GoogleLocationProfileModel | null>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [isLoadingAttributes, setIsLoadingAttributes] = useState(false);
    
    const fetchProfile = useCallback(async () => {
        if (!locationId) return;
        setIsLoadingProfile(true);
        try {
            const profile = await googleRepository.getLocationProfile(locationId);
            setProfile(profile);
        } finally {
            setIsLoadingProfile(false);
        }
    }, [googleRepository, locationId]);
    
    const [attributes, setAttributes] = useState<GoogleLocationAttributesModel | null>(null);
    const fetchAttributes = useCallback(async () => {
        if (!locationId) return;
        setIsLoadingAttributes(true);
        try {
            const attributes = await googleRepository.getLocationAttributes(locationId);
            setAttributes(attributes);
        } finally {
            setIsLoadingAttributes(false);
        }
    }, [googleRepository, locationId]);

    const { selectedTab, tabsRender } = useAdvancedTabs([
        { tabKey: 'overview', content: '概要' },
        { tabKey: 'contact', content: '連絡先' },
        { tabKey: 'location', content: '所在地' },
        { tabKey: 'hours', content: '営業時間' },
        { tabKey: 'other', content: 'その他' },
    ]);

    useEffect(() => {
        fetchProfile();
        fetchAttributes();
    }, [fetchProfile, fetchAttributes]);

    const renderContent = () => {
        switch (selectedTab) {
            case 'overview':
                return (
                    <OverviewTab
                        profile={profile ?? null}
                        fetchProfile={fetchProfile}
                        googleRepository={googleRepository}
                        isLoading={isLoadingProfile}
                    />
                );
            case 'contact':
                return (
                    <ContactTab
                        profile={profile ?? null}
                        attributes={attributes ?? null}
                        fetchProfile={fetchProfile}
                        fetchAttributes={fetchAttributes}
                        googleRepository={googleRepository}
                        isLoading={isLoadingProfile || isLoadingAttributes}
                    />
                );
            case 'location':
                return (
                    <LocationTab
                        profile={profile ?? null}
                        fetchProfile={fetchProfile}
                        googleRepository={googleRepository}
                        isLoading={isLoadingProfile}
                    />
                );
            case 'hours':
                return (
                    <HoursTab
                        profile={profile ?? null}
                        googleRepository={googleRepository}
                        fetchProfile={fetchProfile}
                        isLoading={isLoadingProfile}
                    />
                );
            case 'other':
                return (
                    <OtherSectionTab
                        profile={profile ?? null}
                        attributes={attributes ?? null}
                        fetchProfile={fetchProfile}
                        fetchAttributes={fetchAttributes}
                        googleRepository={googleRepository}
                        isLoading={isLoadingProfile || isLoadingAttributes}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Wrapper direction="col" padding="5rem 4.3rem" className={styles.container}>
            <Wrapper direction="col" gap="2rem" className={styles.header}>
                <Typography
                    content="プロフィールを編集"
                    color="primary"
                    size="large"
                    weight="normal"
                />
            </Wrapper>

            {/* ナビゲーション */}
            <Wrapper direction="col" gap="5rem">
                {tabsRender()}
            </Wrapper>

            {/* タブコンテンツ */}
            {renderContent()}
        </Wrapper>
    );
}
