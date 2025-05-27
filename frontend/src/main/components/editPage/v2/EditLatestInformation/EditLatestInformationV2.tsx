import React from 'react';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import { useAdvancedTabs } from '@/main/common/AdvancedTabs/useAdvancedTabs';
import { LatestInformationTab } from './tabs/LatestInformationTab';
import { BenefitTab } from './tabs/BenefitTab';
import { EventTab } from './tabs/EventTab';
import styles from './EditLatestInformation.module.scss';
import { GoogleServiceImpl } from '@/main/service/GoogleService';

interface Props {
  googleService: GoogleServiceImpl;
}

export const EditLatestInformationV2: React.FC<Props> = ({ googleService }) => {
  const { selectedTab, tabsRender } = useAdvancedTabs([
    { tabKey: 'latest_information', content: '最新情報の追加' },
    { tabKey: 'benefit', content: '特典の追加' },
    { tabKey: 'event', content: 'イベントを追加' },
  ]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'latest_information':
        return <LatestInformationTab />;
      case 'benefit':
        return <BenefitTab />;
      case 'event':
        return <EventTab />;
      default:
        return null;
    }
  };

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
  );
};
