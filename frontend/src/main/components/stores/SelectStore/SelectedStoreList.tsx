import styles from "@/main/components/stores/SelectStore/SelectedStoreList.module.scss";
import Wrapper from "@/main/common/Wrapper"
import Typography from "@/main/common/Typography"
import Button from "@/main/common/Button"
import React from "react";

type Props = {
    selectedStores: string[]
    onBackClick: () => void
}

export default function SelectedStoreList({ selectedStores, onBackClick }: Props) {
    return (
        <Wrapper direction="col" gap="1.6rem">
            <Typography content="選択中の店舗" color="primary" size="normal" />
            <Wrapper gap="1rem" className={styles.selected_store_container}>
                <Wrapper padding="2rem 2.5rem 2.5rem" className={styles.selected_store}>
                    {selectedStores.map((store, index) => (
                        <React.Fragment key={index}>
                            <Typography content={store} color="primary" size="normal" />
                            {index !== selectedStores.length - 1 && (
                                <Typography content="|" color="primary" size="normal" />
                            )}
                        </React.Fragment>
                    ))}
                </Wrapper>
                <Button bgColor="primary" padding="0.7rem" className={styles.back_button} onClick={onBackClick}>
                    <Typography content="編集" color="primary" size="normal" />
                </Button>
            </Wrapper>
        </Wrapper>
    )
}
