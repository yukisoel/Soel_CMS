import React from 'react'
import classNames from 'classnames'
import styles from './Textarea.module.scss'

type Props = {
    padding?: string;
    width?: string;
    height?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name?: string;
    className?: string;
    readOnly?: boolean;
    maxLength?: number;
    required?: boolean;
    customPattern?: RegExp;
    onValidation?: (isValid: boolean, message?: string) => void;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(({
  padding,
  width,
  height,
  placeholder,
  value,
  onChange,
  name,
  className,
  readOnly,
  maxLength,
  required,
  customPattern,
  onValidation,
  ...props
}, forwardedRef) => {
  const [error, setError] = React.useState<string>('')

  const validate = (value: string) => {
    if (required && !value) {
      setError('この項目は必須です')
      onValidation?.(false, 'この項目は必須です')
      return
    }
    if (maxLength && value.length > maxLength) {
      setError(`${maxLength}文字以内で入力してください`)
      onValidation?.(false, `${maxLength}文字以内で入力してください`)
      return
    }
    if (customPattern && !customPattern.test(value)) {
      setError('入力形式が正しくありません')
      onValidation?.(false, '入力形式が正しくありません')
      return
    }
    setError('')
    onValidation?.(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    validate(e.target.value)
    onChange?.(e)
  }

  return (
    <div className={styles.textarea_wrapper} style={{ width, height }}>
      <textarea
        ref={forwardedRef}
        className={classNames(
          className,
          styles.textarea,
          error ? styles.error : ''
        )}
        style={{ padding, width, height }}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
        readOnly={readOnly}
        maxLength={maxLength}
        required={required}
        {...props}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
