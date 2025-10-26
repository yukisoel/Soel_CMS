import React, { forwardRef } from 'react'
import classNames from 'classnames'
import styles from '@/main/common/Wrapper.module.scss'

type Props = {
    children?: React.ReactNode;
    direction?: 'col' | 'row';
    align?: 'align-center' | 'align-start' | 'align-end' | 'align-stretch';
    justify?: 'justify-center' | 'justify-start' | 'justify-end' | 'justify-between';
    gap?: string;
    padding?: string;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Wrapper = forwardRef<HTMLDivElement, Props>(
  ({ children, direction = 'row', align = 'align-stretch', justify = 'justify-start', gap, padding, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          className,
          styles.flex,
          styles[direction],
          styles[align],
          styles[justify]
        )}
        style={{ gap: gap, padding: padding }}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

export default Wrapper
