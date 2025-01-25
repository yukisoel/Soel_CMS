import styles from "@/main/components/stores/SchedulePost/SchedulePost.module.scss";
import { GoogleService } from "@/main/service/GoogleService"
import { useSelectStore } from "../SelectStore/useSelectStore"
import { useSelectService } from "../SelectService/useSelectService";
import { useMemo, useState } from "react";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SelectedStoreList from "../SelectStore/SelectedStoreList";
import SelectedServiceList from "../SelectService/SelectedServiceList";
import SelectPhoto from "./SelectPhoto";

type Props = {
    googleService: GoogleService
}

export default function BlukPhoto({googleService}: Props) {
    const [mode, setMode] = useState<'selectStore' | 'selectPhoto' | 'confirm'>('selectStore');

    const { selectedBranches, selectStoreRender } = useSelectStore({
        googleService,
        onNextClick: () => setMode('selectPhoto'),
        onBackClick: () => {}
    })

    const selectedStores = useMemo(() => selectedBranches.map((branch) => branch.name), [selectedBranches])

    return (
        <>
            {mode === 'selectStore' && selectStoreRender()}
            {mode === 'selectPhoto' && (
                <SelectPhoto onNextClick={() => {}} onBackClick={() => {}} />
            )}
            {mode === 'confirm' && (
            <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
                <Wrapper direction="col" gap="5rem">
                    <Typography content="投稿するサービスを選択" color="primary" size="medium" />
                    <Wrapper direction="col" gap="4rem">
                        <SelectedStoreList selectedStores={selectedStores} onBackClick={() => setMode('selectStore')} />
                    </Wrapper>
                </Wrapper>
            </Wrapper>
            )}
        </>
    )
}
