import styles from "@/main/components/stores/SchedulePost/SchedulePost.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import SelectedStoreList from "../SelectStore/SelectedStoreList";
import SelectedServiceList from "../SelectService/SelectedServiceList";
import useFileUpload from "@/main/common/FileUpload/useFileUpload";

type Props = {
    selectedStores: string[]
    selectedServices: string[]
    onEditSelectStore: () => void
    onEditSelectService: () => void
}

export default function SchedulePost({selectedStores, selectedServices, onEditSelectStore, onEditSelectService}: Props) {

    const { render, uploadedPhotoFileList } = useFileUpload({size: 'regular'})

    return (
    <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
        <Wrapper direction="col" gap="5rem">
            <Typography content="投稿するサービスを選択" color="primary" size="medium" />
            <Wrapper direction="col" gap="4rem">
                <SelectedStoreList selectedStores={selectedStores} onBackClick={onEditSelectStore} />
                <SelectedServiceList selectedServicies={selectedServices} onBackClick={onEditSelectService} />
                <Wrapper direction="col" gap="1.6rem">
                    <Typography content="写真を追加" color="primary" size="normal" />
                    {render()}
                </Wrapper>
            </Wrapper>
        </Wrapper>
    </Wrapper>
    )
}
