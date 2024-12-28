import { useState } from "react";
import { TabItem, Tabs } from "./Tabs";

export const useTabs = (tabs: TabItem[]) => {
    const [selectedTab, setSelectedTab] = useState<string>(tabs[0].tabKey);

    const tabsRender = () => (
        <Tabs tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    )

    return {
        selectedTab,
        setSelectedTab,
        tabsRender,
    };
}
