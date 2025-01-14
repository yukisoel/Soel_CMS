import styles from "@/main/components/stores/SelectStore.module.scss";
import {GoogleService} from "@/main/service/GoogleService.ts";
import AdvancedSidebarMenu from "@/main/common/AdvancedSidebarMenu";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import { useAdvancedTabs } from "@/main/common/AdvancedTabs/useAdvancedTabs";
import BrandSelector from "./BrandSelector";
import AreaSelector from "./AreaSelector";
import Button from "@/main/common/Button";

type Props = {
  googleService: GoogleService
}

const stores = [
  {
    name: '鳥貴族',
    branches: [
      '熱海店',
      '青山一丁目駅前',
      '六本木ヒルズ',
      '文字数が多い場合は改行です',
      '六本木ヒルズ',
    ]
  },
  {
    name: '焼肉きんぐ',
    branches: [
      '熱海店',
      '青山一丁目駅前',
      '六本木ヒルズ',
      '文字数が多い場合は改行です',
      '六本木ヒルズ',
    ]
  }
]

const regions = [
  {
    name: '東北',
    prefectures: [
      {
        name: '青森',
        stores: [
          {
            name: '鳥貴族',
            branches: [
              '熱海店',
              '青山一丁目駅前',
              '六本木ヒルズ',
              '文字数が多い場合は改行です',
              '六本木ヒルズ',
            ]
          },
          {
            name: '焼肉きんぐ',
            branches: [
              '熱海店',
              '青山一丁目駅前',
              '六本木ヒルズ',
              '文字数が多い場合は改行です',
              '六本木ヒルズ',
            ]
          }
        ]
      },
      {
        name: '岩手',
        stores: [
          {
            name: '鳥貴族',
            branches: [
              '熱海店',
              '青山一丁目駅前',
              '六本木ヒルズ',
              '文字数が多い場合は改行です',
              '六本木ヒルズ',
            ]
          },
          {
            name: '焼肉きんぐ',
            branches: [
              '熱海店',
              '青山一丁目駅前',
              '六本木ヒルズ',
              '文字数が多い場合は改行です',
              '六本木ヒルズ',
            ]
          }
        ]
      }
    ]
  },
  {
    name: '関東',
    prefectures: [
      {
        name: '茨城',
        stores: [
          {
            name: '鳥貴族',
            branches: [
              '熱海店',
              '青山一丁目駅前',
              '六本木ヒルズ',
              '文字数が多い場合は改行です',
              '六本木ヒルズ',
            ]
          },
          {
            name: '焼肉きんぐ',
            branches: [
              '熱海店',
              '青山一丁目駅前',
              '六本木ヒルズ',
              '文字数が多い場合は改行です',
              '六本木ヒルズ',
            ]
          }
        ]
      },
      {
        name: '栃木',
        stores: [
          {
            name: '鳥貴族',
            branches: [
              '熱海店',
              '青山一丁目駅前',
              '六本木ヒルズ',
              '文字数が多い場合は改行です',
              '六本木ヒルズ',
            ]
          },
          {
            name: '焼肉きんぐ',
            branches: [
              '熱海店',
              '青山一丁目駅前',
              '六本木ヒルズ',
              '文字数が多い場合は改行です',
              '六本木ヒルズ',
            ]
          }
        ]
      }
    ]
  }
]

export default function SelectStore({googleService}: Props) {
  const { selectedTab, tabsRender } = useAdvancedTabs([
    {tabKey: 'brand', content: 'ブランドから選択'},
    {tabKey: 'area', content: 'エリアから選択'}
  ])

  return (
    <Wrapper className={styles.wrapper}>
      <AdvancedSidebarMenu />
      <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
        <Wrapper direction="col" gap="5rem">
          <Typography content="投稿する店舗を選択" color="primary" size="medium" />
          {tabsRender()}
        </Wrapper>
        {
          selectedTab === 'brand' && (
            <BrandSelector stores={stores} />
          )
        }
        {
          selectedTab === 'area' && (
            <AreaSelector regions={regions} />
          )
        }
        <Wrapper direction="col" padding="5rem 0 0" gap="8.1rem">
          <Wrapper>
            <Button bgColor="primary" padding="0.7rem 3.5rem" className={styles.button}>
              <Typography content="次に進む" color="primary" size="normal" />
            </Button>
          </Wrapper>
          <Wrapper>
            <Button bgColor="secondary" padding="0.7rem 3.5rem" className={styles.button}>
              <Typography content="戻る" color="primary" size="normal" />
            </Button>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}
