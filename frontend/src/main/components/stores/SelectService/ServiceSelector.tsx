import styles from "@/main/components/stores/SelectService/ServiceSelector.module.scss";
import Wrapper from "@/main/common/Wrapper"
import Typography from "@/main/common/Typography"
import Checkbox from "@/main/common/Checkbox";
import ButtonCheckbox from "@/main/common/ButtonCheckbox";
import classNames from "classnames";
import RadioButton from "@/main/common/RadioButton";
import { SelectServiceForm } from "./useSelectService";

type Props = {
    selectServiceForm: SelectServiceForm
    onFormCheckedChange: () => void
    onLanguageCheckedChange: (langIndex: number) => void;
    onOptionCheckedChange: (optionIndex: number) => void;
}

export default function ServiceSelector({ selectServiceForm, onFormCheckedChange, onLanguageCheckedChange, onOptionCheckedChange }: Props) {
    const { label, value, checked, languages, options } = selectServiceForm

    return (
        <>
            <Wrapper padding="0.8rem 0.8rem 0.8rem 1.8rem" align="align-center" className={classNames(styles.service_wrapper, { [styles.selected]: checked })}>
                <Checkbox checked={checked} onChange={onFormCheckedChange} />
                <div className={styles.service_image} />
                <Typography content={label} color="primary" size="normal" className={styles.service_content} />
                <Wrapper gap="1rem" align="align-center">
                    <Typography content="翻訳言語" color="primary" size="normal" weight="normal" />
                    {languages.map((lang, index) => (
                        <ButtonCheckbox
                            key={lang.value}
                            label={lang.label}
                            checked={lang.checked}
                            onChange={() => onLanguageCheckedChange(index)}
                        />
                    ))}
                </Wrapper>
            </Wrapper>
            {checked && (
                <Wrapper padding="2rem 0 3.9rem 1.8rem" gap="3rem" className={styles.selected_service}>
                    {options.map((option, index) => (
                        <RadioButton key={option.value} name={value} label={option.label} value={option.value} checked={option.checked} onChange={() => onOptionCheckedChange(index)}/>
                    ))}
                </Wrapper>
            )}
        </>
    )
}
