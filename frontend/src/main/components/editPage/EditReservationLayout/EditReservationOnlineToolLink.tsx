import Button from "@/main/common/Button";
import Typography from "@/main/common/Typography";
import Wrapper from "@/main/common/Wrapper";
import RecommendReservationIcon from '@/main/assets/RecommendReservation.svg';
import styles from '@/main/components/editPage/EditReservationLayout/EditReservationOnlineToolLink.module.scss';
import EditableTextItem from "@/main/common/EditableTextItem";
import { useEffect, useState } from "react";

type LinkItem = {
    label: string;
    text: string;
}

type Props = {
    items: LinkItem[]
    onSave: (items: LinkItem[]) => void
}

export default function EditReservationOnlineToolLink({items: linkItems, onSave}: Props) {
    const [items, setItems] = useState<LinkItem[]>([])

    const handleAddItem = () => {
        setItems([...items, { label: '', text: '' }])
    }

    const handleChange = (index: number, value: string) => {
        const newItems = items.map((item, i) =>
            i === index ? { ...item, text: value } : item
        );
        setItems(newItems)
        onSave(newItems)
    }

    useEffect(() => {
        setItems(linkItems)
    }, [])

    return (
    <Wrapper padding="4.8rem 11rem 5.8rem 15rem" justify="justify-between" className={styles.reservation_container}>
        <Wrapper direction="col">
            <Wrapper direction="col" gap="1.1rem">
                <Typography content="オンライン予約ツールへのリンク" size="medium" color="primary" />
                <Wrapper direction="col" gap="1.6rem">
                    <Typography content="オンライン予約ページへのカスタムリンクを追加して、" size="normal" color="gray" weight="normal" />
                    <Typography content="ユーザーが直接予約できるようにしましょう。" size="normal" color="gray" weight="normal" />
                </Wrapper>
            </Wrapper>
            <Wrapper padding="5.6em 0 3.6em">
                <Button bgColor="primary" padding="2rem 4.3rem 2.2rem 3.9rem" onClick={handleAddItem}>
                    <Typography content="別のリンクを追加" size="medium" color="primary" />
                </Button>
            </Wrapper>
            <Wrapper direction="col" gap="4.9rem" padding="0 0 3.8rem 0">
                {items.map((item, index) => (
                    <EditableTextItem key={index} label={item.label} text={item.text} handleSaveClick={(text) => handleChange(index, text)} width="635px" />
                ))}
            </Wrapper>
        </Wrapper>
        <img src={RecommendReservationIcon} alt={'RecommendReservationIcon'} />
      </Wrapper>
    )
}
