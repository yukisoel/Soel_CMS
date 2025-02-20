import { GoogleService } from "@/main/service/GoogleService"
import { useSelectStore } from "../SelectStore/useSelectStore"
import { useSelectService } from "../SelectService/useSelectService";
import { useMemo, useState } from "react";
import PostContentConfirm from "./PostContentConfirm";
import usePostContentForm from "./usePostContentForm";

type Props = {
    googleService: GoogleService
}

export default function SchedulePost({googleService}: Props) {
    const [mode, setMode] = useState<'selectStore' | 'selectService' | 'schedulePost' | 'confirmPost'>('selectStore');

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

    const { formState, render: renderFormContent, uploadedPhotoFileList } = usePostContentForm({
        selectedStores,
        selectedServices,
        onEditSelectStore: () => setMode('selectStore'),
        onEditSelectService: () => setMode('selectService'),
        onNext: () => setMode('confirmPost')
    })

    return (
        <>
            {mode === 'selectStore' && selectStoreRender()}
            {mode === 'selectService' && selectServiceRender()}
            {mode === 'schedulePost' && renderFormContent()}
            {mode === 'confirmPost' && (
                <PostContentConfirm
                    selectedStores={selectedStores}
                    selectedServices={selectedServices}
                    formState={formState}
                    uploadedPhotoFileList={uploadedPhotoFileList}
                    onEdit={() => setMode('schedulePost')}
                    onSubmit={() => {
                        // 投稿内容を送信する処理をここに追加
                        console.log('投稿内容:', formState.content);
                        console.log('ハッシュタグ:', formState.hashtags);
                        console.log('店舗のタグをつける:', formState.tagStore);
                        console.log('店舗の位置情報をつける:', formState.tagLocation);
                        console.log('投稿予約をする:', formState.schedulePost);
                        console.log('選択された日付:', formState.selectedDate);
                        console.log('選択された時間:', formState.selectedTime);
                    }}
                />
            )}
        </>
    )
}
