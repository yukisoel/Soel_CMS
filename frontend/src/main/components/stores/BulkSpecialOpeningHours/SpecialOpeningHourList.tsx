import styles from "@/main/components/stores/BulkSpecialOpeningHours/SpecialOpeningHourList.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import SearchBox from "@/main/common/SearchBox";
import Separator from "@/main/common/Separator";
import classNames from "classnames";

type SpecialOpeningHourItem = {
    status: 'closed' | 'special';
    date: string;
    time: string;
    stores: string[];
    lastEdit: string;
}

type Props = {
    onNextClick: () => void;
    // items: SpecialOpeningHourItem[];
};

const stores = ['青山店', '表参道店', '渋谷店', '新宿店', '池袋店', '上野店', '秋葉原店', '六本木店', '銀座店', '日本橋店', '品川店', 'お台場店', '赤坂店', '田町店', '恵比寿店', '目黒店', '自由が丘']

const items: SpecialOpeningHourItem[] = [
    {
        status: 'closed',
        date: '2021年12月31日（大晦日）',
        time: '11:00~22:30',
        stores,
        lastEdit: '2024年12月15日 14:23:01',
    },
    {
        status: 'special',
        date: '2021年12月31日（大晦日）',
        time: '11:00~22:30',
        stores,
        lastEdit: '2024年12月15日 14:23:01',
    },
    {
        status: 'closed',
        date: '2021年12月31日（大晦日）',
        time: '11:00~22:30',
        stores,
        lastEdit: '2024年12月15日 14:23:01',
    },
    {
        status: 'special',
        date: '2021年12月31日（大晦日）',
        time: '11:00~22:30',
        stores,
        lastEdit: '2024年12月15日 14:23:01',
    },
    {
        status: 'closed',
        date: '2021年12月31日（大晦日）',
        time: '11:00~22:30',
        stores,
        lastEdit: '2024年12月15日 14:23:01',
    },
]

export default function SpecialOpeningHourList({ onNextClick }: Props) {
    return (
    <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
        <Wrapper direction="col" gap="2rem">
            <Typography content="特別営業時間" color="primary" size="medium" />
            <Wrapper gap="4rem" align="align-center">
                <SearchBox placeholder="変更履歴を検索" width="42.7rem" onChange={() => {}} />
                <Button bgColor="primary" padding="0.7rem 1.8rem" className={styles.button} onClick={onNextClick}>
                    <Typography content="新規作成" color="primary" size="normal" weight="normal" />
                </Button>
            </Wrapper>
            <Separator width="100%" />
        </Wrapper>
        <Wrapper direction="col" padding="4rem 3.6rem" gap="3rem">
            {items.map((item, index) => (
                <SpecialOpeningHourItem key={index} {...item} />
            ))}
        </Wrapper>
    </Wrapper>
    );
}

function SpecialOpeningHourItem(
    { status, date, time, stores, lastEdit }: SpecialOpeningHourItem
) {
    return (
    <Wrapper>
        <Wrapper direction="col" gap="1rem">
            <Wrapper padding="0.8rem 1rem" gap="2rem" className={styles.special_container}>
                <Wrapper className={classNames(styles.special_status, status === 'closed' ? styles.closed : styles.special)}>
                    {status === 'closed' ? '休業' : '特別'}
                </Wrapper>
                <Wrapper direction="col" className={styles.special_hours}>
                    <Typography content={`設定日時:${date}`}  color="primary" size="xsmall" />
                    <Typography content={`営業時刻:${time}`} color="primary" size="xsmall" />
                </Wrapper>
                <Separator height="100%" orientation="vertical" borderWidth="2px" />
                <Typography content={`設定店舗:${stores.join(', ')}`} color="secondary" size="xsmall" className={styles.special_info_content} />
            </Wrapper>
            <Wrapper justify="justify-end">
                <Typography content={`最終編集日時:${lastEdit}`} color="secondary" size="xsmall" weight="normal" />
            </Wrapper>
        </Wrapper>
        <Wrapper gap="0.9rem" className={styles.button_container}>
            <Button bgColor="primary" padding="0 0.8rem" onClick={() => {}}>
                <Typography content="編集" color="primary" size="xsmall" weight="normal" />
            </Button>
            <Button bgColor="primary" padding="0 0.8rem" onClick={() => {}}>
                <Typography content="追加" color="primary" size="xsmall" weight="normal" />
            </Button>
        </Wrapper>
    </Wrapper>
    )
}
