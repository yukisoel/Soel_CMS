import classNames from 'classnames'
import styles from './Separator.module.scss'

type Props = {
  width?: string;
  height?: string;
  orientation?: 'horizontal' | 'vertical';
  borderWidth?: string;
  className?: string;
}

export default function Separator({ width, height, orientation = 'horizontal', borderWidth = '1px', className }: Props) {
  return (
    <hr
      className={classNames(className, styles.separator, {
        [styles.vertical]: orientation === 'vertical',
        [styles.horizontal]: orientation === 'horizontal'
      })}
      style={{ width, height, borderWidth }}
    />
  )
}
