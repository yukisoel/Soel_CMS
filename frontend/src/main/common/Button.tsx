import classNames from 'classnames'
import styles from '@/main/common/Button.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    padding?: string
    bgColor: 'primary' | 'secondary' | 'tertiary' | 'black' | 'white' | 'input'
    className?: string
}

export default function Button({ children, padding, bgColor, className, disabled, ...props }: Props) {
  return (
    <button className={classNames(
      className,
      styles.button,
      styles[bgColor],
      { [styles.disabled]: disabled }
    )} style={{ padding: padding }} disabled={disabled} {...props}>{children}</button>
  )
}
