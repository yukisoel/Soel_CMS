import styles from '@/main/common/Button.module.scss'
import classNames from "classnames"

type Props = {
    children: React.ReactNode
    padding?: string
    bgColor: 'primary' | 'secondary' | 'tertiary' | 'black'
    className?: string
}

export default function Button({children, padding, bgColor, className}: Props) {
    return (
        <span className={classNames(
            className,
            styles.button,
            styles[bgColor]
        )} style={{padding: padding}}>{children}</span>
    )
}
