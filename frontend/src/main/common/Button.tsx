import styles from '@/main/common/Button.module.scss'
import classNames from "classnames"

type Props = {
    children: React.ReactNode
    px?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
    py?: 'small' | 'medium' | 'large' | 'xlarge'
    bgColor: 'primary' | 'secondary' | 'tertiary' | 'black'
    className?: string
}

export default function Button({children, px, py, bgColor, className}: Props) {
    return (
        <span className={classNames(
            className,
            styles.radius,
            px ? styles[`px-${px}`] : '',
            py ? styles[`py-${py}`] : '',
            styles[bgColor]
        )}>{children}</span>
    )
}
