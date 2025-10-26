import styles from './EditReservationV2.module.scss'
import { RecommendedTab } from './tabs/RecommendedTab'
import { OnlineToolTab } from './tabs/OnlineToolTab'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import { useAdvancedTabs } from '@/main/common/AdvancedTabs/useAdvancedTabs'

type Props = {
  onTryButtonClick: () => void;
};

export default function EditReservationV2({ onTryButtonClick }: Props) {
  const { selectedTab, tabsRender } = useAdvancedTabs([
    { tabKey: 'recommended', content: 'おすすめの予約ボタン' },
    { tabKey: 'onlineTool', content: 'オンライン予約ツールへのリンク' }
  ])

  return (
    <Wrapper direction="col" gap="4rem" padding="5rem" className={styles.content_container}>
      <Typography content="予約" color="primary" size="medium" className={styles.section_title} />
      <Wrapper justify="justify-center" gap="2rem" className={styles.header_container}>
        {tabsRender()}
      </Wrapper>
      {selectedTab === 'recommended' && <RecommendedTab onTryButtonClick={onTryButtonClick} />}
      {selectedTab === 'onlineTool' && <OnlineToolTab onTryButtonClick={onTryButtonClick} />}
    </Wrapper>
  )
}
