import styles from "@/main/components/stores/SchedulePost/SchedulePost.module.scss";
import { GoogleService } from "@/main/service/GoogleService";
import { useSelectStore } from "../SelectStore/useSelectStore";
import { useMemo, useState } from "react";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SelectedStoreList from "../SelectStore/SelectedStoreList";
import useSelectPhoto from "./useSelectPhoto";
import SelectedPhotoList from "./SelectedPhotoList";

type Props = {
    googleService: GoogleService;
};

export default function BulkPhoto({ googleService }: Props) {
    const [mode, setMode] = useState<'selectStore' | 'selectPhoto' | 'confirm'>('selectStore');

    const { selectedBranches, selectStoreRender } = useSelectStore({
        googleService,
        onNextClick: () => setMode('selectPhoto'),
        onBackClick: () => {}
    });

    const { render: selectPhotoRender, selectedPhotoIndices } = useSelectPhoto({
        onNextClick: () => setMode('confirm'),
        onBackClick: () => setMode('selectStore')
    });

    const selectedStores = useMemo(() => selectedBranches.map((branch) => branch.name), [selectedBranches]);

    return (
        <>
            {mode === 'selectStore' && selectStoreRender()}
            {mode === 'selectPhoto' && selectPhotoRender()}
            {mode === 'confirm' && (
                <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
                    <Wrapper direction="col" gap="5rem">
                        <Typography content="投稿するサービスを選択" color="primary" size="medium" />
                        <Wrapper direction="col" gap="4rem">
                            <SelectedStoreList selectedStores={selectedStores} onBackClick={() => setMode('selectStore')} />
                            <SelectedPhotoList  selectedPhotos={selectedPhotoIndices} onBackClick={() => setMode('selectPhoto')} />
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
            )}
        </>
    );
}
