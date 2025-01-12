import styles from './Separator.module.scss';

type Props = {
  width: string;
}

export default function Separator({ width }: Props) {
  return (
    <hr className={styles.separator} style={{ width }} />
  );
}
