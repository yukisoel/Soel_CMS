import { useMemo, useState } from "react";
import SelectService from "./SelectService";

type Props = {
    selectedStores: string[];
    onNextClick: () => void;
    onBackClick: () => void;
};

export type SelectServiceForm = {
    label: string;
    value: string;
    checked?: boolean;
    languages: {
        label: string;
        value: string;
        checked?: boolean;
    }[];
    options: {
        label: string;
        value: string;
        checked?: boolean;
    }[];
};

const translateLanguages: SelectServiceForm['languages'] = [
    { label: "日本語", value: "ja", checked: true },
    { label: "英語", value: "en", checked: false },
    { label: "簡体", value: "jian", checked: false },
    { label: "繁体", value: "fan", checked: false },
    { label: "韓国語", value: "ko", checked: false },
];

const options: SelectServiceForm['options'] = [
    { label: "基本", value: "base", checked: true },
    { label: "COVID19", value: "covid19", checked: false },
    { label: "クーポン", value: "coupon", checked: false },
];

const initialForms: SelectServiceForm[] = [
    {
        label: "Googleビジネスプロフィール",
        value: "google",
        checked: false,
        languages: translateLanguages.slice(),
        options: options.slice(),
    },
    {
        label: "食べログ",
        value: "tabelog",
        checked: false,
        languages: translateLanguages.slice(),
        options: options.slice(),
    },
    {
        label: "Instagram",
        value: "instagram",
        checked: false,
        languages: translateLanguages.slice(),
        options: options.slice(),
    },
    {
        label: "Twitter（新:X）",
        value: "twitter",
        checked: false,
        languages: translateLanguages.slice(),
        options: options.slice(),
    },
    {
        label: "Facebook",
        value: "facebook",
        checked: false,
        languages: translateLanguages.slice(),
        options: options.slice(),
    },
    {
        label: "大衆点評",
        value: "tanshin",
        checked: false,
        languages: translateLanguages.slice(),
        options: options.slice(),
    },
];

export const useSelectService = ({ selectedStores, onNextClick, onBackClick }: Props) => {
    const [selectServiceForms, setSelectServiceForms] = useState<SelectServiceForm[]>(initialForms);

    const selectedServiceForms = useMemo(() => {
        return selectServiceForms
            .filter(service => service.checked)
            .map(service => ({
                ...service,
                languages: service.languages.filter(lang => lang.checked),
                options: service.options.filter(option => option.checked),
            }));
    }, [selectServiceForms]);

    const handleFormCheckedChange = (index: number) => {
        setSelectServiceForms((prevForms) =>
            prevForms.map((form, i) =>
                i === index ? { ...form, checked: !form.checked } : form
            )
        );
    };

    const handleLanguageCheckedChange = (formIndex: number, langIndex: number) => {
        setSelectServiceForms((prevForms) =>
            prevForms.map((form, i) =>
                i === formIndex
                    ? {
                          ...form,
                          languages: form.languages.map((lang, j) =>
                              j === langIndex ? { ...lang, checked: !lang.checked } : lang
                          ),
                      }
                    : form
            )
        );
    };

    const handleOptionCheckedChange = (formIndex: number, optionIndex: number) => {
        setSelectServiceForms((prevForms) =>
            prevForms.map((form, i) =>
                i === formIndex
                    ? {
                          ...form,
                          options: form.options.map((option, j) => ({
                              ...option,
                              checked: j === optionIndex,
                          })),
                      }
                    : form
            )
        );
    };

    const selectServiceRender = () => (
        <SelectService
            selectedStores={selectedStores}
            selectServiceForms={selectServiceForms}
            onFormCheckedChange={handleFormCheckedChange}
            onLanguageCheckedChange={handleLanguageCheckedChange}
            onOptionCheckedChange={handleOptionCheckedChange}
            onNextClick={onNextClick}
            onBackClick={onBackClick}
            isNextButtonDisabled={selectedServiceForms.length === 0}
        />
    );

    return {
        selectedServiceForms,
        selectServiceRender,
    };
};
