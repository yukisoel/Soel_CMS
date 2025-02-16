import styles from "@/main/common/Checkbox.module.scss";
import Typography from "@/main/common/Typography";
import classNames from "classnames";
import { useId } from "react";

type Props = {
    label?: string
    supplementaryText?: string
    checked?: boolean
    reverse?: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Checkbox({ label, supplementaryText, checked, reverse = false, onChange }: Props) {
    const id = useId();
    return (
        <>
            <input
                type="checkbox"
                id={id}
                className={styles.custom_checkbox}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id} className={classNames(styles.custom_checkbox_label, reverse && styles.reverse)}>
                {label && (
                    <Typography content={label} color="primary" size="normal" />
                )}
                {supplementaryText && (
                    <Typography content={supplementaryText} color="secondary" size="normal" className={styles.supplementary_text} />
                )}
            </label>
        </>
    );
}
