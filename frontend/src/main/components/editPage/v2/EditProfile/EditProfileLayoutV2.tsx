import styles from "./EditProfileLayoutV2.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import { useAdvancedTabs } from "@/main/common/AdvancedTabs/useAdvancedTabs";
import { useState } from "react";
import OverviewTab from "./tabs/OverviewTab";
import ContactTab from "./tabs/ContactTab";
import LocationTab from "./tabs/LocationTab";
import HoursTab from "./tabs/HoursTab";
import OtherSectionTab from "./tabs/OtherSectionTab";
import { GoogleService } from "@/main/service/GoogleService.ts";

type Props = {
    googleService: GoogleService;
};

export default function EditProfileLayoutV2({
    googleService,
}: Props) {
    // 概要タブの状態
    const [businessName, setBusinessName] = useState("SOELグルメ通り店");
    const [businessCategories, setBusinessCategories] = useState([
        "寿司店",
        "回転寿司店",
        "テイクアウト寿司店",
        "シーフード・海鮮料理店",
        "和食店"
    ]);
    const [description, setDescription] = useState(
        "こだわりが廻るグルメ回転寿司。こころを握る美味しい時間。\n" +
        "日本海の魚介を職人の目利きで仕入れ、さばき、握る。米、醤油、調味料はもちろん、国産の\n" +
        "割箸にまでこだわる。安心して美味しい寿司を召し上がっていただ..."
    );
    const [openingDate, setOpeningDate] = useState("2024年8月26日");

    // 連絡先タブの状態
    const [phoneNumber, setPhoneNumber] = useState("03-1234-5678");
    const [website, setWebsite] = useState("https://www.soel-gourmet.com");
    const [menuLink, setMenuLink] = useState("https://www.soel-gourmet.com/menu");
    const [snsLinks, setSnsLinks] = useState([
        { type: "Instagram", url: "https://www.instagram.com/soel_gourmet" },
        { type: "Twitter", url: "https://twitter.com/soel_gourmet" },
        { type: "Facebook", url: "https://www.facebook.com/soel.gourmet" }
    ]);

    // 所在地タブの状態
    const [address, setAddress] = useState("191-0041　東京都日野市南平1-37-1");
    const [serviceArea, setServiceArea] = useState("東京都日野市");

    // 営業時間タブの状態
    const [regularHours, setRegularHours] = useState({
        monday: "10:00-21:00",
        tuesday: "10:00-21:00",
        wednesday: "10:00-21:00",
        thursday: "10:00-21:00",
        friday: "10:00-21:00",
        saturday: "10:00-21:00",
        sunday: "10:00-21:00"
    });

    const [lunchHours, setLunchHours] = useState({
        monday: "11:00-15:00",
        tuesday: "11:00-15:00",
        wednesday: "11:00-15:00",
        thursday: "11:00-15:00",
        friday: "11:00-15:00",
        saturday: "11:00-15:00",
        sunday: "11:00-15:00"
    });

    // その他タブの状態
    const [businessOwnerInfo, setBusinessOwnerInfo] = useState("内容が入ります。");
    const [serviceInfo, setServiceInfo] = useState("内容が入ります。");
    const [serviceOptionInfo, setServiceOptionInfo] = useState("内容が入ります。");

    const { selectedTab, tabsRender } = useAdvancedTabs([
        { tabKey: 'overview', content: '概要' },
        { tabKey: 'contact', content: '連絡先' },
        { tabKey: 'location', content: '所在地' },
        { tabKey: 'hours', content: '営業時間' },
        { tabKey: 'other', content: 'その他' },
    ]);

    const renderContent = () => {
        switch (selectedTab) {
            case 'overview':
                return (
                    <OverviewTab
                        businessName={businessName}
                        businessCategories={businessCategories}
                        description={description}
                        openingDate={openingDate}
                    />
                );
            case 'contact':
                return (
                    <ContactTab
                        phoneNumber={phoneNumber}
                        website={website}
                        menuLink={menuLink}
                        snsLinks={snsLinks}
                    />
                );
            case 'location':
                return (
                    <LocationTab
                        address={address}
                        serviceArea={serviceArea}
                        onAddressChange={setAddress}
                        onServiceAreaChange={setServiceArea}
                    />
                );
            case 'hours':
                return (
                    <HoursTab
                        regularHours={regularHours}
                        lunchHours={lunchHours}
                        onRegularHoursChange={setRegularHours}
                        onLunchHoursChange={setLunchHours}
                        onAddOtherHours={() => {
                            // TODO: その他の営業時間追加モーダルを表示
                            console.log("その他の営業時間を追加");
                        }}
                    />
                );
            case 'other':
                return (
                    <OtherSectionTab
                        businessOwnerInfo={businessOwnerInfo}
                        serviceInfo={serviceInfo}
                        serviceOptionInfo={serviceOptionInfo}
                        onEditBusinessOwner={() => {/* 編集処理を実装 */}}
                        onEditService={() => {/* 編集処理を実装 */}}
                        onEditServiceOption={() => {/* 編集処理を実装 */}}
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
