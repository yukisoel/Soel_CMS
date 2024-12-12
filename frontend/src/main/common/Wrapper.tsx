import styles from '@/main/common/Wrapper.module.scss'
import classNames from "classnames"

type Props = {
    children?: React.ReactNode
    direction?: 'col' | 'row'
    align?: 'align-center' | 'align-start' | 'align-end' | 'align-stretch'
    justify?: 'justify-center' | 'justify-start' | 'justify-end'
    className?: string
}

export default function Wrapper({children, direction = 'row', align = 'align-stretch', justify = 'justify-start', className}: Props) {
    return (
        <div className={classNames(
            styles.flex,
            styles[direction],
            styles[align],
            styles[justify],
            className
        )}>{children}</div>
    )
}
