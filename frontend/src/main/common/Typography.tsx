import styles from '@/main/common/Typography.module.scss'
import classNames from "classnames"

type Props = {
    content: string
    size: 'small' | 'medium' | 'large' | 'xlarge'
    color: 'primary' | 'secondary' | 'black'
}

export default function Typography({content, size, color}: Props) {
    return (
        <span className={classNames(
            styles[color],
            styles[size]
        )}>{content}</span>
    )
}
