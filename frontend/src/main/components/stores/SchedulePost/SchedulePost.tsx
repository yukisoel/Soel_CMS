import styles from "@/main/components/stores/SchedulePost/SchedulePost.module.scss";
import { GoogleService } from "@/main/service/GoogleService"
import { useSelectStore } from "../SelectStore/useSelectStore"
import { useSelectService } from "../SelectService/useSelectService";
import { useMemo, useState } from "react";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";

type Props = {
    googleService: GoogleService
}

export default function SchedulePost({googleService}: Props) {
    const [mode, setMode] = useState<'selectStore' | 'selectService' | 'schedulePost'>('selectStore');

    const { selectedBranches, selectStoreRender } = useSelectStore({
        googleService,
        onNextClick: () => setMode('selectService'),
        onBackClick: () => {}
    })

    const selectedStores = useMemo(() => selectedBranches.map((branch) => branch.name), [selectedBranches])

    const {selectServiceForms, selectServiceRender} = useSelectService({
        googleService,
        selectedStores,
        onNextClick: () => setMode('schedulePost'),
        onBackClick: () => setMode('selectStore')
    })





    return (
        <>
            {mode === 'selectStore' && selectStoreRender()}
            {mode === 'selectService' && selectServiceRender()}
            {mode === 'schedulePost' && (
            <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
                <Wrapper direction="col" gap="5rem">
                    <Typography content="投稿するサービスを選択" color="primary" size="medium" />
                </Wrapper>
            </Wrapper>
            )}
        </>
    )
}
