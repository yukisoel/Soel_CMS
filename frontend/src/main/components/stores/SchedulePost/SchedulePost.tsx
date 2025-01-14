import { GoogleService } from "@/main/service/GoogleService"
import { useSelectStore } from "../SelectStore/useSelectStore"

type Props = {
    googleService: GoogleService
}

export default function SchedulePost({googleService}: Props) {
    const { selectedBranches, selectStoreRender } = useSelectStore({googleService})

    return (
        <>
            {selectStoreRender()}
        </>
    )
}
