import styles from "./EditProfileLayoutV2.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import { useAdvancedTabs } from "@/main/common/AdvancedTabs/useAdvancedTabs";
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "@/main/schemas/profileSchema";
import OverviewTab from "./tabs/OverviewTab";
import ContactTab from "./tabs/ContactTab";
import LocationTab from "./tabs/LocationTab";
import HoursTab from "./tabs/HoursTab";
import OtherSectionTab from "./tabs/OtherSectionTab";
import { GoogleServiceImpl } from "@/main/service/GoogleService";
import { DayOfWeek, BusinessType } from "@/main/model/LocationModel";
import { useParams } from "react-router-dom";
import {GoogleLocationProfileModel, GoogleLocationAttributesModel} from "@/types/apiModel.ts";

type Props = {
    googleService: GoogleServiceImpl;
};

export type SetValueType = ProfileFormData[keyof ProfileFormData] | string[] | { [key: string]: unknown };

export default function EditProfileLayoutV2({
    googleService
}: Props) {
    const {locationId} = useParams()
    const [profile, setProfile] = useState<GoogleLocationProfileModel | null>(null);
    const fetchProfile = useCallback(async () => {
        if (!locationId) return;
        const profile = await googleService.getLocationProfile(locationId);
        setProfile(profile);
    }, [googleService, locationId]);
    const [attributes, setAttributes] = useState<GoogleLocationAttributesModel | null>(null);
    const fetchAttributes = useCallback(async () => {
        if (!locationId) return;
        const attributes = await googleService.getLocationAttributes(locationId);
        setAttributes(attributes);
    }, [googleService, locationId]);

    const [isSubmitting] = useState(false);
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
    }, []);

    const {
        register,
        setValue,
        watch,
        trigger,
        formState: { errors }
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        mode: "onChange"
    });

    // const convertToProfileField = (name: Path<ProfileFormData>): ProfileField => {
    //     switch (name) {
    //         case 'title':
    //             return 'title';
    //         case 'description':
    //             return 'profile.description';
    //         case 'phoneNumbers.primaryPhone':
    //             return 'phoneNumbers.primaryPhone';
    //         case 'websiteUri':
    //             return 'websiteUri';
    //         case 'menuUri':
    //             return 'menuUri';
    //         case 'storefrontAddress':
    //             return 'storefrontAddress';
    //         case 'serviceArea':
    //             return 'serviceArea';
    //         case 'regularHours':
    //             return 'regularHours';
    //         case 'specialHours':
    //             return 'regularHours'; // specialHoursは regularHoursと一緒に更新される
    //         case 'businessOwnerInfo':
    //             return 'businessOwnerInfo';
    //         case 'serviceInfo':
    //             return 'serviceInfo';
    //         case 'serviceOptionInfo':
    //             return 'serviceOptionInfo';
    //         case 'openingDate':
    //             return 'openInfo.openingDate';
    //         default:
    //             throw new Error(`Unsupported field: ${name}`);
    //     }
    // };

    // const setValueAndValidate = useCallback(async (
    //     name: Path<ProfileFormData>,
    //     value: SetValueType,
    //     shouldValidate = true
    // ) => {
    //     setValue(name, value as ProfileFormData[keyof ProfileFormData]);
    //     if (shouldValidate) {
    //         const isValid = await trigger(name);
    //         if (isValid && locationId) {
    //             try {
    //                 if (name === 'title') {
    //                     await googleService.updateLocationProfileTitle(locationId, value as string);
    //                 } else if (name === 'description') {
    //                     await googleService.updateLocationProfileDescription(locationId, value as string);
    //                 } else {
    //                     const result = await profileUpdateService.updateProfile(
    //                         locationId,
    //                         convertToProfileField(name),
    //                         value as ProfileFormData[keyof ProfileFormData]
    //                     );
    //                     if (!result.success) {
    //                         console.error(`${name}の更新に失敗しました:`, result.error);
    //                         return false;
    //                     }
    //                 }
    //                 console.log(`${name}の更新が完了しました`);
    //                 return true;
    //             } catch (error) {
    //                 console.error('予期せぬエラーが発生しました:', error);
    //                 return false;
    //             }
    //         }
    //         return isValid;
    //     }
    //     return true;
    // }, [setValue, trigger, locationId, googleService, profileUpdateService]);

    // useEffect(() => {
    //     if (locationId) {
    //         profileUpdateService.fetchLocationProfile(locationId).then((profile) => {
    //             // フォームの初期値を設定
    //             setValue("title", profile.title || "");
    //             setValue("description", profile.profile?.description || "");
    //             if (profile.openInfo?.openingDate) {
    //                 const { year, month, day } = profile.openInfo.openingDate;
    //                 if (year !== undefined && month !== undefined && day !== undefined) {
    //                     setValue("openingDate", new Date(year, month - 1, day));
    //                 }
    //             }

    //             setValue("phoneNumbers.primaryPhone", profile.phoneNumbers?.primaryPhone || "");
    //             setValue("websiteUri", profile.websiteUri || "");
    //             setValue("menuUri", profile.menuUri || "");

    //             if (profile.storefrontAddress) {
    //                 setValue("storefrontAddress", profile.storefrontAddress);
    //             }
    //             if (profile.serviceArea) {
    //                 setValue("serviceArea", profile.serviceArea);
    //             }

    //             if (profile.regularHours) {
    //                 setValue("regularHours", profile.regularHours);
    //             }
    //             if (profile.specialHours) {
    //                 setValue("specialHours", profile.specialHours);
    //             }

    //             setValue("businessOwnerInfo", profile.businessOwnerInfo || "");
    //             setValue("serviceInfo", profile.serviceInfo || "");
    //             setValue("serviceOptionInfo", profile.serviceOptionInfo || "");
    //         }).catch((error: Error) => {
    //             console.error('店舗情報の取得に失敗しました:', error);
    //         });
    //     }
    // }, [locationId, profileUpdateService, setValue]);

    const renderContent = () => {
        const formValues = watch();

        switch (selectedTab) {
            case 'overview':
                return (
                    <OverviewTab
                        profile={profile ?? null}
                        fetchProfile={fetchProfile}
                        googleService={googleService}
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
                    />
                );
            // case 'location':
            //     return (
            //         <LocationTab
            //             register={register}
            //             errors={errors}
            //             values={{
            //                 address: formValues.storefrontAddress ?
            //                     `${formValues.storefrontAddress.addressLines.join(' ')} ${formValues.storefrontAddress.locality} ${formValues.storefrontAddress.administrativeArea} ${formValues.storefrontAddress.postalCode}` : '',
            //                 serviceArea: {
            //                     businessType: formValues.serviceArea?.businessType as BusinessType || 'CUSTOMER_AT_BUSINESS',
            //                     places: formValues.serviceArea?.places
            //                 }
            //             }}
            //             setValueAndValidate={setValueAndValidate}
            //             isUpdating={isSubmitting}
            //             validationErrors={{
            //                 address: errors.storefrontAddress?.message,
            //                 serviceArea: errors.serviceArea?.message
            //             }}
            //         />
            //     );
            // case 'hours':
            //     return (
            //         <HoursTab
            //             register={register}
            //             errors={errors}
            //             values={{
            //                 regularHours: {
            //                     periods: formValues.regularHours?.periods.map(period => ({
            //                         openDay: period.openDay as DayOfWeek,
            //                         closeDay: period.closeDay as DayOfWeek,
            //                         openTime: period.openTime,
            //                         closeTime: period.closeTime
            //                     })) || []
            //                 },
            //                 specialHours: formValues.specialHours ? {
            //                     periods: formValues.specialHours.periods.map(period => ({
            //                         openDay: period.openDay as DayOfWeek,
            //                         closeDay: period.closeDay as DayOfWeek,
            //                         openTime: period.openTime,
            //                         closeTime: period.closeTime
            //                     }))
            //                 } : undefined
            //             }}
            //             setValueAndValidate={setValueAndValidate}
            //             isUpdating={isSubmitting}
            //             onAddOtherHours={() => {}}
            //             validationErrors={{
            //                 regularHours: errors.regularHours?.message,
            //                 specialHours: errors.specialHours?.message
            //             }}
            //         />
            //     );
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
