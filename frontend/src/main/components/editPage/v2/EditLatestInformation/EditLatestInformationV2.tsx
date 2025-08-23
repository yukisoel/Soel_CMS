import React, { useState } from 'react'
import { LatestInformationTab } from './tabs/LatestInformationTab'
import { BenefitTab } from './tabs/BenefitTab'
import { EventTab } from './tabs/EventTab'
import styles from './EditLatestInformation.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Loading from '@/main/common/Loading'
import { useAdvancedTabs } from '@/main/common/AdvancedTabs/useAdvancedTabs'
export const EditLatestInformationV2: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { selectedTab, tabsRender } = useAdvancedTabs([
    { tabKey: 'latest_information', content: '最新情報の追加' },
    { tabKey: 'benefit', content: '特典の追加' },
    { tabKey: 'event', content: 'イベントを追加' }
  ])

  const renderTabContent = () => {
    switch (selectedTab) {
    case 'latest_information':
      return <LatestInformationTab setIsSubmitting={setIsSubmitting} />
    case 'benefit':
      return <BenefitTab setIsSubmitting={setIsSubmitting} />
    case 'event':
      return <EventTab setIsSubmitting={setIsSubmitting} />
    default:
      return null
    }
  }

  if (isSubmitting) {
    return <Loading message="投稿中..." />
  }

  return (
    <Wrapper direction="col" gap="32px" padding="50px">
      <Typography
        content="最新情報を追加"
        size="large"
        color="black"
        className={styles.title}
      />
      {tabsRender()}
      {renderTabContent()}
    </Wrapper>
  )
}
