import styles from "./EditProfileLayoutV2.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import { useAdvancedTabs } from "@/main/common/AdvancedTabs/useAdvancedTabs";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import OverviewTab from "./tabs/OverviewTab";
import ContactTab from "./tabs/ContactTab";
import LocationTab from "./tabs/LocationTab";
import HoursTab from "./tabs/HoursTab";
import OtherSectionTab from "./tabs/OtherSectionTab";
import { GoogleService } from "@/main/service/GoogleService";
import { ProfileUpdateService, ProfileField } from "@/main/service/ProfileUpdateService";
import { GoogleLocationBusinessHours, DayOfWeek, ServiceAreaInfo } from "@/main/model/LocationModel";

type Props = {
    googleService: GoogleService;
};

type Service = {
    id: string;
    name: string;
    isAvailable: boolean;
};

type WeeklyHours = {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
};

const formatDateToJapanese = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
};

export default function EditProfileLayoutV2({
    googleService,
}: Props) {
    const { locationId } = useParams();
    const profileUpdateService = useMemo(() => new ProfileUpdateService(googleService), [googleService]);
    const [isUpdating, setIsUpdating] = useState(false);

    // 概要タブの状態
    const [businessName, setBusinessName] = useState("");
    const [businessCategories, setBusinessCategories] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [openingDate, setOpeningDate] = useState("");

    // 連絡先タブの状態
    const [phoneNumber, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");
    const [menuLink, setMenuLink] = useState("");
    const [snsLinks, setSnsLinks] = useState<{ type: string; url: string; }[]>([]);

    // 所在地タブの状態
    const [address, setAddress] = useState("");
    const [serviceArea, setServiceArea] = useState<ServiceAreaInfo>({
        businessType: 'BUSINESS_TYPE_UNSPECIFIED',
        places: {
            placeInfos: []
        }
    });

    // 営業時間タブの状態
    const [regularHours, setRegularHours] = useState<WeeklyHours>({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
    });

    const [lunchHours, setLunchHours] = useState<WeeklyHours>({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
    });

    // その他タブの状態
    const [businessOwnerInfo, setBusinessOwnerInfo] = useState("");
    const [serviceInfo, setServiceInfo] = useState("");
    const [serviceOptionInfo, setServiceOptionInfo] = useState("");

    const [services, setServices] = useState<Service[]>([
        { id: 'alcohol', name: 'アルコール飲料あり', isAvailable: false },
        { id: 'cocktail', name: 'カクテルあり', isAvailable: false },
        { id: 'coffee', name: 'コーヒーあり', isAvailable: false },
        { id: 'drinkService', name: 'ドリンクのサービスタイムあり', isAvailable: false },
    ]);

    const { selectedTab, tabsRender } = useAdvancedTabs([
        { tabKey: 'overview', content: '概要' },
        { tabKey: 'contact', content: '連絡先' },
        { tabKey: 'location', content: '所在地' },
        { tabKey: 'hours', content: '営業時間' },
        { tabKey: 'other', content: 'その他' },
    ]);

    useEffect(() => {
        if (locationId) {
            profileUpdateService.fetchLocationProfile(locationId).then(profile => {
                // 概要タブの状態を設定
                setBusinessName(profile.title || "");
                if (profile.categories) {
                    const categoryNames = [
                        profile.categories.primaryCategory.displayName,
                        // ...(profile.categories.additionalCategories?.map(cat => cat.displayName) || [])
                    ];
                    setBusinessCategories(categoryNames);
                }
                setDescription(profile.profile?.description || "");
                if (profile.openInfo?.openingDate) {
                    const { year, month, day } = profile.openInfo.openingDate;
                    setOpeningDate(`${year}年${month}月${day}日`);
                }

                // 連絡先タブの状態を設定
                setPhoneNumber(profile.phoneNumbers?.primaryPhone || "");
                setWebsite(profile.websiteUri || "");
                setMenuLink(profile.menuUri || "");
                setSnsLinks(profile.socialLinks?.map(link => ({
                    type: link.type,
                    url: link.url
                })) || []);

                // 所在地タブの状態を設定
                setAddress(profile.storefrontAddress?.addressLines?.join(" ") || "");
                if (profile.serviceArea) {
                    setServiceArea({
                        businessType: profile.serviceArea.businessType,
                        places: {
                            placeInfos: profile.serviceArea.places?.placeInfos.map(place => ({
                                placeId: place.placeId || '',
                                placeName: place.placeName
                            })) || []
                        }
                    });
                }

                // 営業時間タブの状態を設定
                if (profile.regularHours?.periods) {
                    const defaultHours: WeeklyHours = {
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: "",
                        sunday: ""
                    };

                    const hours = profile.regularHours.periods.reduce((acc, period) => {
                        const day = period.openDay.toLowerCase() as keyof WeeklyHours;
                        acc[day] = `${period.openTime}-${period.closeTime}`;
                        return acc;
                    }, defaultHours);

                    setRegularHours(hours);
                }

                if (profile.specialHours?.periods) {
                    const defaultHours: WeeklyHours = {
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: "",
                        sunday: ""
                    };

                    const hours = profile.specialHours.periods.reduce((acc, period) => {
                        const day = period.openDay.toLowerCase() as keyof WeeklyHours;
                        acc[day] = `${period.openTime}-${period.closeTime}`;
                        return acc;
                    }, defaultHours);

                    setLunchHours(hours);
                }

                // その他タブの状態を設定
                setBusinessOwnerInfo(profile.businessOwnerInfo || "");
                setServiceInfo(profile.serviceInfo || "");
                setServiceOptionInfo(profile.serviceOptionInfo || "");
                if (profile.services) {
                    setServices(prev => prev.map(service => ({
                        ...service,
                        isAvailable: profile.services?.some(s => s.id === service.id) || false
                    })));
                }
            }).catch(error => {
                // TODO: エラー通知の実装
                console.error('店舗情報の取得に失敗しました:', error);
            });
        }
    }, [locationId, profileUpdateService]);

    const handleProfileUpdate = useCallback(async (
        field: ProfileField,
        value: string | object,
        onSuccess?: () => void
    ) => {
        if (!locationId) {
            // TODO: エラー通知の実装
            console.error('店舗情報が見つかりません');
            return;
        }

        setIsUpdating(true);
        try {
            const result = await profileUpdateService.updateProfile(
                locationId,
                field,
                value
            );

            if (result.success) {
                // TODO: 成功通知の実装
                console.log('更新が完了しました');
                onSuccess?.();
            } else {
                // TODO: エラー通知の実装
                console.error(result.error || '更新に失敗しました');
            }
        } catch (error) {
            // TODO: エラー通知の実装
            console.error('予期せぬエラーが発生しました');
        } finally {
            setIsUpdating(false);
        }
    }, [locationId, profileUpdateService]);

    const handleUpdateBusinessName = (name: string) => {
        setBusinessName(name);
        handleProfileUpdate('title', name);
    };

    const handleUpdateDescription = (desc: string) => {
        setDescription(desc);
        handleProfileUpdate('profile.description', desc);
    };

    const handleUpdatePhoneNumber = (phone: string) => {
        setPhoneNumber(phone);
        handleProfileUpdate('phoneNumbers.primaryPhone', phone);
    };

    const handleUpdateWebsite = (site: string) => {
        setWebsite(site);
        handleProfileUpdate('websiteUri', site);
    };

    const handleUpdateMenuLink = (link: string) => {
        setMenuLink(link);
        handleProfileUpdate('menuUri', link);
    };

    const handleUpdateAddress = (address: string) => {
        setAddress(address);
        // TODO: 住所のパース処理を実装
        const addressObject = {
            addressLines: [address],
            locality: "東京都",  // TODO: 住所から自動取得
            postalCode: "000-0000",  // TODO: 住所から自動取得
            administrativeArea: "東京都",  // TODO: 住所から自動取得
            regionCode: "JP"
        };
        handleProfileUpdate('storefrontAddress', addressObject);
    };

    const handleUpdateRegularHours = (hours: typeof regularHours) => {
        setRegularHours(hours);
        // Google Business Profile APIの形式に変換
        const formattedHours: GoogleLocationBusinessHours = {
            periods: Object.entries(hours).map(([day, time]) => {
                const [open, close] = time.split('-');
                return {
                    openDay: day.toUpperCase() as DayOfWeek,
                    closeDay: day.toUpperCase() as DayOfWeek,
                    openTime: open,
                    closeTime: close
                };
            })
        };
        handleProfileUpdate('regularHours', formattedHours);
    };

    const handleUpdateOpeningDate = (date: Date) => {
        setOpeningDate(formatDateToJapanese(date));

        // Google Business Profile APIの形式に変換して更新
        handleProfileUpdate('openInfo.openingDate', {
            openInfo: {
                openingDate: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            }
        });
    };

    const handleUpdateServiceArea = (newServiceArea: ServiceAreaInfo) => {
        setServiceArea(newServiceArea);
        handleProfileUpdate('serviceArea', newServiceArea);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'overview':
                return (
                    <OverviewTab
                        businessName={businessName}
                        businessCategories={businessCategories}
                        description={description}
                        openingDate={openingDate}
                        onUpdateBusinessName={handleUpdateBusinessName}
                        onUpdateDescription={handleUpdateDescription}
                        onUpdateOpeningDate={handleUpdateOpeningDate}
                        onUpdateBusinessCategories={setBusinessCategories}
                        isUpdating={isUpdating}
                    />
                );
            case 'contact':
                return (
                    <ContactTab
                        phoneNumber={phoneNumber}
                        website={website}
                        menuLink={menuLink}
                        snsLinks={snsLinks}
                        onPhoneNumberChange={handleUpdatePhoneNumber}
                        onWebsiteChange={handleUpdateWebsite}
                        onMenuLinkChange={handleUpdateMenuLink}
                        onSnsLinksChange={setSnsLinks}
                        isUpdating={isUpdating}
                    />
                );
            case 'location':
                return (
                    <LocationTab
                        address={address}
                        serviceArea={serviceArea}
                        onAddressChange={handleUpdateAddress}
                        onServiceAreaChange={handleUpdateServiceArea}
                        isUpdating={isUpdating}
                    />
                );
            case 'hours':
                return (
                    <HoursTab
                        regularHours={regularHours}
                        lunchHours={lunchHours}
                        onRegularHoursChange={handleUpdateRegularHours}
                        onLunchHoursChange={setLunchHours}
                        onAddOtherHours={() => {
                            // TODO: その他の営業時間追加モーダルを表示
                            console.log("その他の営業時間を追加");
                        }}
                        isUpdating={isUpdating}
                    />
                );
            case 'other':
                return (
                    <OtherSectionTab
                        businessOwnerInfo={businessOwnerInfo}
                        serviceInfo={serviceInfo}
                        serviceOptionInfo={serviceOptionInfo}
                        onEditBusinessOwner={setBusinessOwnerInfo}
                        onEditService={setServiceInfo}
                        onEditServiceOption={setServiceOptionInfo}
                        services={services}
                        onServicesChange={setServices}
                        isUpdating={isUpdating}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Wrapper direction="col" padding="5rem 4.3rem" className={styles.container}>
            {/* ヘッダー部分 */}
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
