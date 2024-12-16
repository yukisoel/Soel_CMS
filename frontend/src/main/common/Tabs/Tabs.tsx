import styles from './Tabs.module.scss';
import Wrapper from '../Wrapper';
import Button from '../Button';
import Typography from '../Typography';

export type TabItem = {
  tabKey: string;
  content: string;
};

type Props = {
  tabs: TabItem[];
  selectedTab: string;
  setSelectedTab: (tabKey: string) => void;
};

export function Tabs({ tabs, selectedTab, setSelectedTab }: Props) {
  return (
    <Wrapper justify="justify-between" align="align-center" className={styles.tabs_container}>
        {tabs.map((tab) => (
            <Button
                padding="1.1rem 4rem"
                bgColor={selectedTab === tab.tabKey ? 'primary' : 'secondary'}
                onClick={() => setSelectedTab(tab.tabKey)}
                key={tab.tabKey}
            >
                <Typography content={tab.content} color="primary" size="medium" />
            </Button>
        ))}
    </Wrapper>
  )
}
