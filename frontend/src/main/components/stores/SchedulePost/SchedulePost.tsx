import styles from "@/main/components/stores/SchedulePost/SchedulePost.module.scss";
import { GoogleService } from "@/main/service/GoogleService"
import { useSelectStore } from "../SelectStore/useSelectStore"
import { useSelectService } from "../SelectService/useSelectService";
import { useMemo, useState } from "react";
import PostContentForm from "./PostContentForm";

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

    const {selectedServiceForms, selectServiceRender} = useSelectService({
        googleService,
        selectedStores,
        onNextClick: () => setMode('schedulePost'),
        onBackClick: () => setMode('selectStore')
    })

    const selectedServices = useMemo(() => selectedServiceForms.map(service => {
        const name = service.label
        const option = service.options[0].label
        const languages = service.languages.map(lang => lang.label).join(', ')
        return `${name} | ${option} | ${languages}`
    }), [selectedServiceForms])

    return (
        <>
            {mode === 'selectStore' && selectStoreRender()}
            {mode === 'selectService' && selectServiceRender()}
            {mode === 'schedulePost' && (
            <PostContentForm selectedStores={selectedStores} selectedServices={selectedServices} onEditSelectStore={() => setMode('selectStore')} onEditSelectService={() => setMode('selectService')} />
            )}
        </>
    )
}
