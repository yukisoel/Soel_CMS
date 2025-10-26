import { forwardRef } from 'react'
import classNames from 'classnames'
import styles from '@/main/common/Typography.module.scss'

type Props = {
    content: string;
    size: 'xxsmall' | 'xsmall' | 'small' | 'normal' | 'medium' | 'large' | 'xlarge';
    color: 'primary' | 'secondary' | 'black' | 'gray' | 'white' | 'yellow' | 'error';
    weight?: 'normal';
    className?: string;
};

const Typography = forwardRef<HTMLSpanElement, Props>(({ content, size, color, weight, className }, ref) => {
  return (
    <span
      ref={ref}
      className={classNames(
        className,
        styles[color],
        styles[size],
        styles[`weight-${weight}`]
      )}
    >
      {content}
    </span>
  )
})

Typography.displayName = 'Typography'

export default Typography
