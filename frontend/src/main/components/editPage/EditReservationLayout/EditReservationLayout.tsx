import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PankuzuItemListContext } from '@/main/contexts/PankuzuItemListContext.tsx';
import { GoogleSelectedLocationContext } from '@/main/contexts/GoogleSelectedLocationContext.tsx';
import Button from '@/main/common/Button';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import styles from '@/main/components/editPage/EditReservationLayout/EditReservationLayout.module.scss';
import { GoogleService } from '@/main/service/GoogleService';
import { useTabs } from '@/main/common/Tabs/useTabs';
import CheckCircleIcon from '@/main/assets/CheckCircleIcon.svg';
import RecommendReservationIcon from '@/main/assets/RecommendReservation.svg';

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
      <Wrapper direction="col" padding="6.8rem 0 5.4rem" gap="5rem" align="align-center" className={styles.reservation_container}>
        <Wrapper direction="col" gap="1.1rem" align="align-center">
            <Typography content="おすすめの予約ボタン" size="medium" color="primary" />
            <Wrapper direction="col" gap="1.6rem" align="align-center">
                <Typography content="プロフィールの上部に目立つようにボタンを表示し、" size="normal" color="gray" weight="normal" />
                <Typography content="ユーザーが優先プロバイダを使用して予約できるようにします。" size="normal" color="gray" weight="normal" />
            </Wrapper>
        </Wrapper>
        <Wrapper justify="justify-center" gap="7.5rem">
            <img src={RecommendReservationIcon} alt={'RecommendReservationIcon'} />
            <Wrapper direction="col" padding="3.2rem 0 0" gap="6rem">
                <Button bgColor="primary" padding="2.2rem 2.8rem 2.4rem 2.9rem">
                    <Typography content="使ってみる" size="medium" color="primary" />
                </Button>
                <Wrapper direction="col" gap="3.1rem">
                    <Wrapper gap="2.2rem">
                        <img src={CheckCircleIcon} alt={'CheckCircleIcon'} />
                        <Typography content="目を引くボタン" size="medium" color="primary" />
                    </Wrapper>
                    <Wrapper gap="2.2rem">
                        <img src={CheckCircleIcon} alt={'CheckCircleIcon'} />
                        <Typography content="Google サービスとの統合" size="medium" color="primary" />
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}
