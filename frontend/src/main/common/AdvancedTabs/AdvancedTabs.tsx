import classNames from 'classnames'
import styles from '@/main/common/AdvancedTabs/AdvancedTabs.module.scss'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'

export type TabItem = {
    tabKey: string
    content: string
}

type Props = {
    tabs: TabItem[]
    selectedTab: string
    setSelectedTab: (tabKey: string) => void
}

export default function AdvancedTabs({ tabs, selectedTab, setSelectedTab }: Props) {
  return (
    <Wrapper className={styles.tab_menu_container}>
      {tabs.map(({ tabKey, content }) => (
        <div className={classNames(styles.tab_menu_content_wrapper, selectedTab === tabKey ? styles.tab_menu_content_selected : '')} key={tabKey} onClick={() => setSelectedTab(tabKey)}>
          <Typography content={content} color="primary" size="normal" className={styles.tab_menu_content} />
        </div>
      ))}
    </Wrapper>
  )
}
