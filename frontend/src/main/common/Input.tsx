import styles from '@/main/common/Input.module.scss'
import classNames from "classnames"
import CloseButton from './CloseButton'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    padding?: string
    width?: string
    fwMedium?: boolean
    className?: string
    ref?: React.Ref<HTMLInputElement>
    onClear?: () => void;
}

export default function Input({width, padding, fwMedium = false, className, ref, onClear, ...props}: Props) {
    return (
        <div className={styles.inputWrapper} style={{ width }}>
            <input
                className={classNames(
                    className,
                    styles.input,
                    fwMedium ? styles['fw-medium'] : ''
                )}
                style={{ padding, width }}
                ref={ref}
                {...props}
            />
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
