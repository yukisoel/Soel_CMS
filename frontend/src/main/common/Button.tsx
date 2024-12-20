import styles from '@/main/common/Button.module.scss'
import classNames from "classnames"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    padding?: string
    bgColor: 'primary' | 'secondary' | 'tertiary' | 'black' | 'white'
    className?: string
}

export default function Button({children, padding, bgColor, className, ...props}: Props) {
    return (
        <button className={classNames(
            className,
            styles.button,
            styles[bgColor]
        )} style={{padding: padding}} {...props}>{children}</button>
    )
}
