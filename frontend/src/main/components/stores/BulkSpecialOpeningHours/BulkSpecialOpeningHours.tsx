import styles from "@/main/components/stores/BulkSpecialOpeningHours/BulkSpecialOpeningHours.module.scss";
import { GoogleService } from "@/main/service/GoogleService";
import { useSelectStore } from "../SelectStore/useSelectStore";
import { useMemo, useState } from "react";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SpecialOpeningHourList from "./SpecialOpeningHourList";

type Props = {
    googleService: GoogleService;
};

export default function BulkSpecialOpeningHours({ googleService }: Props) {
    const [mode, setMode] = useState<'list' | 'selectStore' | 'confirm'>('list');

    const { selectedBranches, selectStoreRender } = useSelectStore({
        googleService,
        onNextClick: () => setMode('confirm'),
        onBackClick: () => setMode('list')
    });

    const selectedStores = useMemo(() => selectedBranches.map((branch) => branch.name), [selectedBranches]);

    return (
        <>
            {mode === 'list' && (
            <SpecialOpeningHourList onNextClick={() => setMode('selectStore')} />
            )}
            {mode === 'selectStore' && selectStoreRender()}
            {mode === 'confirm' && (
                <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
                    <Wrapper direction="col" gap="5rem">
                        <Typography content="投稿するサービスを選択" color="primary" size="medium" />
                        <Wrapper direction="col" gap="4rem">
                            {/* <SelectedStoreList selectedStores={selectedStores} onBackClick={() => setMode('selectStore')} />
                            <SelectedPhotoList  selectedPhotos={selectedPhotoIndices} onBackClick={() => setMode('selectPhoto')} /> */}
                        </Wrapper>
                        <Wrapper gap="4rem">
                            {/* <Button bgColor="secondary" padding="0.7rem 1.9rem" onClick={() => setMode('selectPhoto')}>
                                <Typography content="修正する" color="primary" size="normal" />
                            </Button>
                            <Button bgColor="primary" padding="0.7rem 3.4rem" onClick={() => setMode('selectPhoto')}>
                                <Typography content="投稿を登録" color="primary" size="normal" />
                            </Button> */}
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
            )}
        </>
    );
}
