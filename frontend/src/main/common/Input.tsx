import styles from '@/main/common/Input.module.scss'
import classNames from "classnames"
import CloseButton from './CloseButton'
import { useState } from 'react'

interface ValidationProps {
    customPattern?: RegExp;
    onValidation?: (isValid: boolean, message?: string) => void;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement>, ValidationProps {
    padding?: string;
    width?: string;
    fwMedium?: boolean;
    className?: string;
    ref?: React.Ref<HTMLInputElement>;
    onClear?: () => void;
}

export default function Input({
    width,
    padding,
    fwMedium = false,
    className,
    ref,
    onClear,
    maxLength,
    required,
    customPattern,
    onValidation,
    ...props
}: Props) {
    const [error, setError] = useState<string>('');

    const validate = (value: string) => {
        if (required && !value) {
            setError('この項目は必須です');
            onValidation?.(false, 'この項目は必須です');
            return;
        }
        if (maxLength && value.length > maxLength) {
            setError(`${maxLength}文字以内で入力してください`);
            onValidation?.(false, `${maxLength}文字以内で入力してください`);
            return;
        }
        if (customPattern && !customPattern.test(value)) {
            setError('入力形式が正しくありません');
            onValidation?.(false, '入力形式が正しくありません');
            return;
        }
        setError('');
        onValidation?.(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validate(e.target.value);
        props.onChange?.(e);
    };

    return (
        <div className={styles.inputWrapper} style={{ width }}>
            <input
                className={classNames(
                    className,
                    styles.input,
                    fwMedium ? styles['fw-medium'] : '',
                    error ? styles.error : ''
                )}
                style={{ padding, width }}
                ref={ref}
                {...props}
                onChange={handleChange}
                maxLength={maxLength}
                required={required}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
            {onClear && (
                <CloseButton
                    className={styles.closeButton}
                    onClick={onClear}
                    color="secondary"
                />
            )}
        </div>
    )
}
