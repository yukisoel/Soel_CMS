import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PankuzuItemListContext } from '@/main/contexts/PankuzuItemListContext.tsx';
import { GoogleSelectedLocationContext } from '@/main/contexts/GoogleSelectedLocationContext.tsx';
import Wrapper from '@/main/common/Wrapper';
import styles from '@/main/components/editPage/EditReservationLayout/EditReservationLayout.module.scss';
import { GoogleService } from '@/main/service/GoogleService';
import { useTabs } from '@/main/common/Tabs/useTabs';
import EditReservationRecommend from './EditReservationRecommend';
import EditReservationOnlineToolLink from './EditReservationOnlineToolLink';

type Props = {
  googleService: GoogleService;
};

export default function EditReservationLayout({ googleService }: Props) {
  const { setPankuzuItemList } = useContext(PankuzuItemListContext);
  const { googleSelectedLocation, setGoogleSelectedLocation } = useContext(GoogleSelectedLocationContext);

  const { accountId, locationId } = useParams();

  const { selectedTab, tabsRender } = useTabs([
    { tabKey: 'recommended', content: 'おすすめの予約ボタン' },
    { tabKey: 'onlineTool', content: 'オンライン予約ツールへのリンク' },
  ])

  useEffect(() => {
    setPankuzuItemList([
      { name: 'ページ編集', path: '/edit' },
      { name: 'GBP', path: '/edit/gbp' },
      { name: '予約', path: '/edit/reservation' },
    ]);
    if (googleSelectedLocation.name === '' && locationId) {
      googleService.getLocation(locationId).then((location) => {
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
          <EditReservationRecommend />
        )}
        {selectedTab === 'onlineTool' && (
          <EditReservationOnlineToolLink />
        )}
      </>
    </Wrapper>
  );
}
