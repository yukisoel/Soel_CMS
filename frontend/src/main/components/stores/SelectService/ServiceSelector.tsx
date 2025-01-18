import { useState } from "react";
import styles from "@/main/components/stores/SelectService/ServiceSelector.module.scss";
import Wrapper from "@/main/common/Wrapper"
import Typography from "@/main/common/Typography"
import Checkbox from "@/main/common/Checkbox";
import ButtonCheckbox from "@/main/common/ButtonCheckbox";
import classNames from "classnames";
import RadioButton from "@/main/common/RadioButton";

type Props = {
    label: string
    value: string
    checked?: boolean
    onChange: (value: string) => void
}

const TranslateLanguages = [
    { label: "日本語", value: "ja" },
    { label: "英語", value: "en" },
    { label: "簡体", value: "jian" },
    { label: "繁体", value: "fan" },
    { label: "韓国語", value: "ko" },
]

const RadioButtons = [
    { label: "基本", value: "base" },
    { label: "COVID19", value: "covid19" },
    { label: "クーポン", value: "coupon" },
]

export default function ServiceSelector({ label, value, checked, onChange }: Props) {
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['ja'])
    const [selectedRadio, setSelectedRadio] = useState<string>('base');

    const handleLanguageChange = (langValue: string) => {
        setSelectedLanguages((prev) =>
            prev.includes(langValue)
                ? prev.filter((lang) => lang !== langValue)
                : [...prev, langValue]
        )
    }

    const handleRadioChange = (radioValue: string) => {
        setSelectedRadio(radioValue);
    }

    return (
        <>
            <Wrapper padding="0.8rem 0.8rem 0.8rem 1.8rem" align="align-center" className={classNames(styles.service_wrapper, { [styles.selected]: checked })}>
                <Checkbox checked={checked} onChange={() => onChange(value)} />
                <div className={styles.service_image} />
                <Typography content={label} color="primary" size="normal" className={styles.service_content} />
                <Wrapper gap="1rem" align="align-center">
                    <Typography content="翻訳言語" color="primary" size="normal" weight="normal" />
                    {TranslateLanguages.map((lang) => (
                        <ButtonCheckbox
                            key={lang.value}
                            label={lang.label}
                            checked={selectedLanguages.includes(lang.value)}
                            onChange={() => handleLanguageChange(lang.value)}
                        />
                    ))}
                </Wrapper>
            </Wrapper>
            {checked && (
                <Wrapper padding="2rem 0 3.9rem 1.8rem" gap="3rem" className={styles.selected_service}>
                    {RadioButtons.map((radio) => (
                        <RadioButton key={radio.value} name={value} label={radio.label} value={radio.value} checked={selectedRadio === radio.value} onChange={() => handleRadioChange(radio.value)}/>
                    ))}
                </Wrapper>
            )}
        </>
    )
}
