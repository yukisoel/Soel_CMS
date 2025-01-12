import classNames from 'classnames';
import styles from './Separator.module.scss';

type Props = {
  width: string;
  className?: string;
}

export default function Separator({ width, className }: Props) {
  return (
    <hr className={classNames(className, styles.separator)} style={{ width }} />
  );
}
