import styles from "@/main/components/stores/SelectService/SelectService.module.scss";
import Wrapper from "@/main/common/Wrapper"
import Typography from "@/main/common/Typography"
import Button from "@/main/common/Button"
import ServiceSelector from "./ServiceSelector";
import React from "react";

type Props = {
    selectedStores: string[]
    services: {
        label: string
        value: string
        checked?: boolean
    }[]
    selectedServices: string[]
    handleServiceChange: (value: string) => void
}

export default function SelectService({ selectedStores, services, selectedServices, handleServiceChange }: Props) {
    return (
        <>
            <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
                <Wrapper direction="col" gap="5rem">
                    <Typography content="投稿するサービスを選択" color="primary" size="medium" />
                    <Wrapper direction="col" gap="1.6rem">
                        <Typography content="選択中の店舗" color="primary" size="normal" />
                        <Wrapper padding="2rem 2.5rem 2.5rem" className={styles.selected_store}>
                            {selectedStores.map((store, index) => (
                                <React.Fragment key={index}>
                                    <Typography content={store} color="primary" size="normal" />
                                    <Typography content="|" color="primary" size="normal" />
                                </React.Fragment>
                            ))}
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
                <Wrapper direction="col" padding="4rem 0" gap="2rem">
                    <Typography content="投稿先サービスの選択" color="primary" size="normal" />
                    {services.map((service) => (
                        <ServiceSelector
                            key={service.value}
                            label={service.label}
                            value={service.value}
                            checked={selectedServices.includes(service.value)}
                            onChange={() => handleServiceChange(service.value)}
                        />
                    ))}
                </Wrapper>
                <Wrapper direction="col" gap="8rem">
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
        </>
    )
}
