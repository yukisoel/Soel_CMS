import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PankuzuItemListContext } from '@/main/contexts/PankuzuItemListContext.tsx';
import { GoogleSelectedLocationContext } from '@/main/contexts/GoogleSelectedLocationContext.tsx';
import Wrapper from '@/main/common/Wrapper';
import styles from '@/main/components/editPage/EditReservationLayout/EditReservationLayout.module.scss';
import { useTabs } from '@/main/common/Tabs/useTabs';
import EditReservationRecommend from './EditReservationRecommend';
import EditReservationOnlineToolLink from './EditReservationOnlineToolLink';
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext';


export default function EditReservationLayout() {
  const googleRepository = useGoogleRepository();
  const { setPankuzuItemList } = useContext(PankuzuItemListContext);
  const { googleSelectedLocation, setGoogleSelectedLocation } = useContext(GoogleSelectedLocationContext);

  const { locationId } = useParams();

  const { selectedTab, setSelectedTab, tabsRender } = useTabs({
    tabs: [
      { tabKey: 'recommended', content: 'おすすめの予約ボタン' },
      { tabKey: 'onlineTool', content: 'オンライン予約ツールへのリンク' },
    ]
  })

  const linkItems = [
    { label: '食べログ', text: 'https://tabelog.com/soel' },
    { label: 'ぐるなび', text: 'https://tabelog.com/soel' },
    { label: 'ホットペッパーグルメ', text: 'https://tabelog.com/soel' },
  ]

  useEffect(() => {
    setPankuzuItemList([
      { name: 'ページ編集', path: '/edit' },
      { name: 'GBP', path: '/edit/gbp' },
      { name: '予約', path: '/edit/reservation' },
    ]);
    if (googleSelectedLocation.name === '' && locationId) {
      googleRepository.getLocation(locationId).then((location) => {
        setGoogleSelectedLocation(location);
      });
    }
  }, []);

  return (
    <Wrapper direction="col" className={styles.edit_reservation_container}>
      <Wrapper justify="justify-center" gap="2rem" className={styles.header_container}>
        {tabsRender()}
      </Wrapper>
      <>
        {selectedTab === 'recommended' && (
          <EditReservationRecommend handleClick={() => setSelectedTab('onlineTool')} />
        )}
        {selectedTab === 'onlineTool' && (
          <EditReservationOnlineToolLink items={linkItems} onSave={() => {}} />
        )}
      </>
    </Wrapper>
  );
}
