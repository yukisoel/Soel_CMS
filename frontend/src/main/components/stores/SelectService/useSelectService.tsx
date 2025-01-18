import { useState } from "react"
import SelectService from "./SelectService"
import { GoogleService } from "@/main/service/GoogleService"

type Props = {
    googleService: GoogleService
    selectedStores: string[]
}

export const useSelectStore = ({googleService, selectedStores }: Props) => {
    // TODO: 組み込みで取得する
    const Services = [
        { label: "Googleビジネスプロフィール", value: "google", checked: false },
        { label: "食べログ", value: "tabelog", checked: false },
        { label: "Instagram", value: "instagram", checked: false },
        { label: "Twitter（新:X）", value: "twitter", checked: false },
        { label: "Facebook", value: "facebook", checked: false },
        { label: "大衆点評", value: "tanshin", checked: false },
    ]

    const [checkedServices, setCheckedServices] = useState<string[]>([]);

    const handleServiceChange = (value: string) => {
        setCheckedServices((prev) =>
            prev.includes(value)
                ? prev.filter((service) => service !== value)
                : [...prev, value]
        );
    };

    const selectServiceRender = () => (
        <SelectService
            selectedStores={selectedStores}
            services={Services}
            selectedServices={checkedServices}
            handleServiceChange={handleServiceChange}
        />
    )

    return {
        checkedServices,
        selectServiceRender,
    };
}
