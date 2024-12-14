import styles from '@/main/common/Wrapper.module.scss'
import classNames from "classnames"

type Props = {
    children?: React.ReactNode
    direction?: 'col' | 'row'
    align?: 'align-center' | 'align-start' | 'align-end' | 'align-stretch'
    justify?: 'justify-center' | 'justify-start' | 'justify-end'
    gap?: string
    padding?: string
    className?: string
}

export default function Wrapper({children, direction = 'row', align = 'align-stretch', justify = 'justify-start', gap, padding, className}: Props) {
    return (
        <div className={classNames(
            className,
            styles.flex,
            styles[direction],
            styles[align],
            styles[justify],
        )} style={{gap: gap, padding: padding}}>{children}</div>
    )
}
