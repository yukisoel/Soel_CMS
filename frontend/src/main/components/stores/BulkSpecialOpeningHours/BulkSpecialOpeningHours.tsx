import styles from "@/main/components/stores/BulkSpecialOpeningHours/BulkSpecialOpeningHours.module.scss";
import { GoogleService } from "@/main/service/GoogleService";
import { useSelectStore } from "../SelectStore/useSelectStore";
import { useMemo, useState } from "react";
import SpecialOpeningHourList from "./SpecialOpeningHourList";
import SpecialOpeningHoursSettings from "./SpecialOpeningHoursSettings";

type Props = {
    googleService: GoogleService;
};

export default function BulkSpecialOpeningHours({ googleService }: Props) {
    const [mode, setMode] = useState<'list' | 'selectStore' | 'selectHours' | 'confirm'>('selectHours');

    const { selectedBranches, selectStoreRender } = useSelectStore({
        googleService,
        onNextClick: () => setMode('selectHours'),
        onBackClick: () => setMode('list')
    });

    const selectedStores = useMemo(() => selectedBranches.map((branch) => branch.name), [selectedBranches]);

    return (
        <>
            {mode === 'list' && (
            <SpecialOpeningHourList onNextClick={() => setMode('selectStore')} />
            )}
            {mode === 'selectStore' && selectStoreRender()}
            {mode === 'selectHours' && (
                <SpecialOpeningHoursSettings
                    selectedStores={selectedStores}
                    onNextClick={() => setMode('confirm')}
                    onBackClick={() => setMode('selectStore')}
                />
            )}
        </>
    );
}
