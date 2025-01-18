import styles from "@/main/components/stores/SchedulePost/SchedulePost.module.scss";
import { GoogleService } from "@/main/service/GoogleService"
import { useSelectStore } from "../SelectStore/useSelectStore"
import Wrapper from "@/main/common/Wrapper"
import Typography from "@/main/common/Typography"
import Button from "@/main/common/Button"
import Checkbox from "@/main/common/Checkbox";
import ButtonCheckbox from "@/main/common/ButtonCheckbox";
import SelectService from "../SelectService/SelectService";

type Props = {
    googleService: GoogleService
}

export default function SchedulePost({googleService}: Props) {
    const { selectedBranches, selectStoreRender } = useSelectStore({googleService})

    return (
        <>
            {/* {selectStoreRender()} */}
            {/* <SelectService googleService={googleService} selectedStores={[]} /> */}
        </>
    )
}
