import styles from './Tabs.module.scss';
import Button from '../Button';
import Typography from '../Typography';
import Separator from '../Separator';

export type TabItem = {
  tabKey: string;
  content: string;
};

type Props = {
  tabs: TabItem[];
  selectedTab: string;
  setSelectedTab: (tabKey: string) => void;
  size?: 'normal' | 'medium';
  width?: string;
};

export function Tabs({ tabs, selectedTab, setSelectedTab, width, size = "medium" }: Props) {
  return (
    <div className={styles.tabs_container} style={{ width: width }}>
        {tabs.map((tab, index) => (
            <>
              <Button
                  bgColor={selectedTab === tab.tabKey ? 'primary' : 'input'}
                  onClick={() => setSelectedTab(tab.tabKey)}
                  key={tab.tabKey}
              >
                  <Typography content={tab.content} color="primary" size={size} weight="normal" />
              </Button>
              {
                (index < tabs.length -1 && tab.tabKey !== selectedTab) &&
                <Separator orientation="vertical" height="27px" borderWidth="2px" />
              }
            </>
        ))}
    </div>
  )
}
