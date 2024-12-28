import styles from '@/main/common/Typography.module.scss'
import classNames from "classnames"

type Props = {
    content: string
    size: 'small' | 'normal' | 'medium' | 'large' | 'xlarge'
    color: 'primary' | 'secondary' | 'black' | 'gray'
    weight?: 'normal'
    className?: string
}

export default function Typography({content, size, color, weight, className}: Props) {
    return (
        <span className={classNames(
            className,
            styles[color],
            styles[size],
            styles[`weight-${weight}`],
        )}>{content}</span>
    )
}
