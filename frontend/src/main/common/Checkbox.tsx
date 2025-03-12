import styles from "@/main/common/Checkbox.module.scss";
import Typography from "@/main/common/Typography";
import classNames from "classnames";
import { useId, useEffect, useRef } from "react";

type Props = {
    label?: string;
    supplementaryText?: string;
    checked?: boolean;
    indeterminate?: boolean;
    reverse?: boolean;
    readOnly?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({ label, supplementaryText, checked, indeterminate = false, reverse = false, readOnly = false, onChange }: Props) {
    const id = useId();
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    return (
        <>
            <input
                type="checkbox"
                id={id}
                className={styles.custom_checkbox}
                checked={checked}
                ref={checkboxRef}
                onChange={readOnly ? undefined : onChange}
                disabled={readOnly}
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
