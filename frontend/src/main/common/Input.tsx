import styles from '@/main/common/Input.module.scss'
import classNames from "classnames"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    padding?: string
    width?: string
    fwMedium?: boolean
    className?: string
    ref?: React.Ref<HTMLInputElement>
}

export default function Input({width, padding, fwMedium = false, className, ref, ...props}: Props) {
    return (
        <input className={classNames(
            className,
            styles.input,
            fwMedium ? styles['fw-midium']  : ''
        )} style={{padding: padding, width: width}} ref={ref} {...props} />
    )
}
