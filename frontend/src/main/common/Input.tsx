import React from 'react';
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
    onClear?: () => void;
    placeholder?: string;
    value?: string;
    type?: string;
    name?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(({
    width,
    padding,
    fwMedium = false,
    className,
    onClear,
    maxLength,
    required,
    customPattern,
    onValidation,
    placeholder,
    value,
    type = 'text',
    name,
    ...props
}, forwardedRef) => {
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
                ref={forwardedRef}
                className={classNames(
                    className,
                    styles.input,
                    fwMedium ? styles['fw-medium'] : '',
                    error ? styles.error : ''
                )}
                style={{ padding, width }}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                type={type}
                name={name}
                {...props}
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
})

Input.displayName = 'Input';

export default Input;
