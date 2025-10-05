import { useState } from 'react'
import { TabItem, Tabs } from './Tabs'

type Props = {
    tabs: TabItem[]
    size?: 'normal' | 'medium'
    width?: string
}

export const useTabs = ({ tabs, size, width }: Props) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].tabKey)

  const tabsRender = () => (
    <Tabs tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} size={size} width={width} />
  )

  return {
    selectedTab,
    setSelectedTab,
    tabsRender
  }
}
