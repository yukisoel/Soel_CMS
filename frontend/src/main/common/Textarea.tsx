import React, { useState } from 'react';
import styles from '@/main/common/Textarea.module.scss';
import classNames from 'classnames';

interface ValidationProps {
    maxLength?: number;
    required?: boolean;
    onValidation?: (isValid: boolean, message?: string) => void;
}

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, ValidationProps {
    padding?: string;
    width?: string;
    height?: string;
    fwMedium?: boolean;
    className?: string;
    readOnly?: boolean;
    ref?: React.Ref<HTMLTextAreaElement>;
}

const Textarea: React.FC<Props> = ({
    width,
    height,
    padding,
    fwMedium = false,
    className,
    readOnly = false,
    ref,
    maxLength,
    required,
    onValidation,
    ...props
}) => {
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
        setError('');
        onValidation?.(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        validate(e.target.value);
        props.onChange?.(e);
    };

    return (
        <div className={styles.textarea_wrapper} style={{width: width, height: height}}>
            <textarea
                className={classNames(
                    className,
                    styles.textarea,
                    fwMedium ? styles['fw_medium'] : '',
                    error ? styles.error : ''
                )}
                style={{ padding: padding, width: width, height: height }}
                ref={ref}
                readOnly={readOnly}
                {...props}
                onChange={handleChange}
                maxLength={maxLength}
                required={required}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export default Textarea;
