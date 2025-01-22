import styles from "@/main/components/stores/SelectService/SelectedServiceList.module.scss";
import Wrapper from "@/main/common/Wrapper"
import Typography from "@/main/common/Typography"
import Button from "@/main/common/Button"

type Props = {
    selectedServicies: string[]
    onBackClick: () => void
}

export default function SelectedServiceList({ selectedServicies, onBackClick }: Props) {
    return (
        <Wrapper direction="col" gap="1.6rem">
            <Typography content="選択中の投稿先サービス" color="primary" size="normal" />
            <Wrapper gap="1rem" className={styles.selected_service_container}>
                <Wrapper padding="2rem 2.5rem 2.5rem" className={styles.selected_service}>
                    {selectedServicies.map((store, index) => (
                        <Typography key={index} content={store} color="primary" size="normal" />
                    ))}
                </Wrapper>
                <Button bgColor="primary" padding="0.7rem 0.9rem" className={styles.back_button} onClick={onBackClick}>
                    <Typography content="編集" color="primary" size="normal" />
                </Button>
            </Wrapper>
        </Wrapper>
    )
}
