import styles from '@/main/common/Typography.module.scss'
import classNames from "classnames"

type Props = {
    content: string
    size: 'small' | 'medium' | 'large' | 'xlarge'
    color: 'primary' | 'secondary' | 'black'
    className?: string
}

export default function Typography({content, size, color, className}: Props) {
    return (
        <span className={classNames(
            styles[color],
            styles[size],
            className
        )}>{content}</span>
    )
}
