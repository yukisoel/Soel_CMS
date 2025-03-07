import { useState } from "react";
import AdvancedTabs, { TabItem } from "./AdvancedTabs";


export const useAdvancedTabs = (tabs: TabItem[]) => {
    const [selectedTab, setSelectedTab] = useState<string>(tabs[0].tabKey);

    const tabsRender = () => (
        <AdvancedTabs tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    )

    return {
        selectedTab,
        setSelectedTab,
        tabsRender,
    }
}
