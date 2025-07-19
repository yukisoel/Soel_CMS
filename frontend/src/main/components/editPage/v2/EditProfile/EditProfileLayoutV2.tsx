import styles from "./EditProfileLayoutV2.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import { useAdvancedTabs } from "@/main/common/AdvancedTabs/useAdvancedTabs";
import { useCallback, useState, useEffect } from "react";
import OverviewTab from "./tabs/OverviewTab";
import ContactTab from "./tabs/ContactTab";
import LocationTab from "./tabs/LocationTab";
import HoursTab from "./tabs/HoursTab";
import { GoogleService } from "@/main/service/GoogleService";
import { useParams } from "react-router-dom";
import {GoogleLocationProfileModel, GoogleLocationAttributesModel} from "@/types/apiModel.ts";

type Props = {
    googleService: GoogleService;
};

export default function EditProfileLayoutV2({
    googleService
}: Props) {
    const {locationId} = useParams()
    const [profile, setProfile] = useState<GoogleLocationProfileModel | null>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);
    const [isLoadingAttributes, setIsLoadingAttributes] = useState(false);
    
    const fetchProfile = useCallback(async () => {
        if (!locationId) return;
        setIsLoadingProfile(true);
        try {
            const profile = await googleService.getLocationProfile(locationId);
            setProfile(profile);
        } finally {
            setIsLoadingProfile(false);
        }
    }, [googleService, locationId]);
    
    const [attributes, setAttributes] = useState<GoogleLocationAttributesModel | null>(null);
    const fetchAttributes = useCallback(async () => {
        if (!locationId) return;
        setIsLoadingAttributes(true);
        try {
            const attributes = await googleService.getLocationAttributes(locationId);
            setAttributes(attributes);
        } finally {
            setIsLoadingAttributes(false);
        }
    }, [googleService, locationId]);

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
                        googleService={googleService}
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
                        googleService={googleService}
                        isLoading={isLoadingProfile || isLoadingAttributes}
                    />
                );
            case 'location':
                return (
                    <LocationTab
                        profile={profile ?? null}
                        fetchProfile={fetchProfile}
                        googleService={googleService}
                        isLoading={isLoadingProfile}
                    />
                );
            case 'hours':
                return (
                    <HoursTab
                        profile={profile ?? null}
                        googleService={googleService}
                        fetchProfile={fetchProfile}
                        isLoading={isLoadingProfile}
                    />
                );
            // case 'other':
            //     return (
            //         <OtherSectionTab
            //             register={register}
            //             errors={errors}
            //             values={{
            //                 businessOwnerInfo: formValues.businessOwnerInfo || '',
            //                 serviceOptionInfo: formValues.serviceOptionInfo || '',
            //                 services: formValues.services || []
            //             }}
            //             setValueAndValidate={setValueAndValidate}
            //             isUpdating={isSubmitting}
            //             validationErrors={{
            //                 businessOwnerInfo: errors.businessOwnerInfo?.message,
            //                 serviceOptionInfo: errors.serviceOptionInfo?.message,
            //                 services: errors.services?.message
            //             }}
            //         />
            //     );
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
