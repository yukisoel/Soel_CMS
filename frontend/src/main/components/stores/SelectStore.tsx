import styles from "@/main/components/stores/SelectStore.module.scss";
import {GoogleService} from "@/main/service/GoogleService.ts";
import AdvancedSidebarMenu from "@/main/common/AdvancedSidebarMenu";

type Props = {
  googleService: GoogleService
}

export default function SearchStore({googleService}: Props) {
  return (
    <AdvancedSidebarMenu />
  )
}
