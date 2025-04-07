import styles from "./EditProfileLayoutV2.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import { useAdvancedTabs } from "@/main/common/AdvancedTabs/useAdvancedTabs";
import { useCallback, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "@/main/schemas/profileSchema";
import OverviewTab from "./tabs/OverviewTab";
import ContactTab from "./tabs/ContactTab";
import LocationTab from "./tabs/LocationTab";
import HoursTab from "./tabs/HoursTab";
import OtherSectionTab from "./tabs/OtherSectionTab";
import { GoogleService } from "@/main/service/GoogleService";
import { ProfileUpdateService } from "@/main/service/ProfileUpdateService";
import { GoogleLocationBusinessHours, DayOfWeek, ServiceAreaInfo, BusinessType } from "@/main/model/LocationModel";
import { Path } from "react-hook-form";

type Props = {
    googleService: GoogleService;
};

export type SetValueType = ProfileFormData[keyof ProfileFormData] | string[] | { [key: string]: unknown };

export default function EditProfileLayoutV2({
    googleService,
}: Props) {
    const { locationId } = useParams();
    const profileUpdateService = useMemo(() => new ProfileUpdateService(googleService), [googleService]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        formState: { errors, isSubmitting }
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        mode: "onChange"
    });

    const { selectedTab, tabsRender } = useAdvancedTabs([
        { tabKey: 'overview', content: '概要' },
        { tabKey: 'contact', content: '連絡先' },
        { tabKey: 'location', content: '所在地' },
        { tabKey: 'hours', content: '営業時間' },
        { tabKey: 'other', content: 'その他' },
    ]);

    const setValueAndValidate = useCallback(async (
        name: Path<ProfileFormData>,
        value: SetValueType,
        shouldValidate = true
    ) => {
        setValue(name, value as ProfileFormData[keyof ProfileFormData]);
        if (shouldValidate) {
            return await trigger(name);
        }
        return true;
    }, [setValue, trigger]);

    useEffect(() => {
        if (locationId) {
            profileUpdateService.fetchLocationProfile(locationId).then(profile => {
                // フォームの初期値を設定
                setValue("title", profile.title || "");
                setValue("description", profile.profile?.description || "");
                if (profile.openInfo?.openingDate) {
                    const { year, month, day } = profile.openInfo.openingDate;
                    if (year !== undefined && month !== undefined && day !== undefined) {
                        setValue("openingDate", new Date(year, month - 1, day));
                    }
                }

                setValue("phoneNumbers.primaryPhone", profile.phoneNumbers?.primaryPhone || "");
                setValue("websiteUri", profile.websiteUri || "");
                setValue("menuUri", profile.menuUri || "");

                if (profile.storefrontAddress) {
                    setValue("storefrontAddress", profile.storefrontAddress);
                }
                if (profile.serviceArea) {
                    setValue("serviceArea", profile.serviceArea);
                }

                if (profile.regularHours) {
                    setValue("regularHours", profile.regularHours);
                }
                if (profile.specialHours) {
                    setValue("specialHours", profile.specialHours);
                }

                setValue("businessOwnerInfo", profile.businessOwnerInfo || "");
                setValue("serviceInfo", profile.serviceInfo || "");
                setValue("serviceOptionInfo", profile.serviceOptionInfo || "");
            }).catch(error => {
                console.error('店舗情報の取得に失敗しました:', error);
            });
        }
    }, [locationId, profileUpdateService, setValue]);

    const onSubmit = useCallback(async (data: ProfileFormData) => {
        if (!locationId) return;

        try {
            // TODO: 更新処理の実装
            console.log('更新データ:', data);
        } catch (error) {
            console.error('更新に失敗しました:', error);
        }
    }, [locationId]);

    const renderContent = () => {
        const formValues = watch();

        switch (selectedTab) {
            case 'overview':
                return (
                    <OverviewTab
                        register={register}
                        errors={errors}
                        values={{
                            businessName: formValues.title,
                            description: formValues.description || '',
                            openingDate: formValues.openingDate
                        }}
                        setValueAndValidate={setValueAndValidate}
                        isUpdating={isSubmitting}
                        validationErrors={{
                            businessName: errors.title?.message,
                            description: errors.description?.message,
                            openingDate: errors.openingDate?.message
                        }}
                    />
                );
            case 'contact':
                return (
                    <ContactTab
                        register={register}
                        errors={errors}
                        values={{
                            phoneNumber: formValues.phoneNumbers?.primaryPhone || '',
                            website: formValues.websiteUri || '',
                            menuLink: formValues.menuUri || ''
                        }}
                        setValueAndValidate={setValueAndValidate}
                        isUpdating={isSubmitting}
                        validationErrors={{
                            phoneNumber: errors.phoneNumbers?.primaryPhone?.message,
                            website: errors.websiteUri?.message,
                            menuLink: errors.menuUri?.message
                        }}
                    />
                );
            case 'location':
                return (
                    <LocationTab
                        register={register}
                        errors={errors}
                        values={{
                            address: formValues.storefrontAddress ?
                                `${formValues.storefrontAddress.addressLines.join(' ')} ${formValues.storefrontAddress.locality} ${formValues.storefrontAddress.administrativeArea} ${formValues.storefrontAddress.postalCode}` : '',
                            serviceArea: {
                                businessType: formValues.serviceArea?.businessType as BusinessType || 'CUSTOMER_AT_BUSINESS',
                                places: formValues.serviceArea?.places
                            }
                        }}
                        setValueAndValidate={setValueAndValidate}
                        isUpdating={isSubmitting}
                        validationErrors={{
                            address: errors.storefrontAddress?.message,
                            serviceArea: errors.serviceArea?.message
                        }}
                    />
                );
            case 'hours':
                return (
                    <HoursTab
                        register={register}
                        errors={errors}
                        values={{
                            regularHours: {
                                periods: formValues.regularHours?.periods.map(period => ({
                                    openDay: period.openDay as DayOfWeek,
                                    closeDay: period.closeDay as DayOfWeek,
                                    openTime: period.openTime,
                                    closeTime: period.closeTime
                                })) || []
                            },
                            specialHours: formValues.specialHours ? {
                                periods: formValues.specialHours.periods.map(period => ({
                                    openDay: period.openDay as DayOfWeek,
                                    closeDay: period.closeDay as DayOfWeek,
                                    openTime: period.openTime,
                                    closeTime: period.closeTime
                                }))
                            } : undefined
                        }}
                        setValueAndValidate={setValueAndValidate}
                        isUpdating={isSubmitting}
                        onAddOtherHours={() => {}}
                        validationErrors={{
                            regularHours: errors.regularHours?.message,
                            specialHours: errors.specialHours?.message
                        }}
                    />
                );
            case 'other':
                return (
                    <OtherSectionTab
                        register={register}
                        errors={errors}
                        values={{
                            businessOwnerInfo: formValues.businessOwnerInfo || '',
                            serviceOptionInfo: formValues.serviceOptionInfo || '',
                            services: formValues.services || []
                        }}
                        setValueAndValidate={setValueAndValidate}
                        isUpdating={isSubmitting}
                        validationErrors={{
                            businessOwnerInfo: errors.businessOwnerInfo?.message,
                            serviceOptionInfo: errors.serviceOptionInfo?.message,
                            services: errors.services?.message
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Wrapper direction="col" padding="5rem 4.3rem" className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
            </form>
        </Wrapper>
    );
}
