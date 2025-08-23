import { useId } from 'react'
import styles from '@/main/common/ButtonCheckbox.module.scss'
import Typography from '@/main/common/Typography'

type Props = {
    label: string
    checked?: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ButtonCheckbox({ label, checked, onChange }: Props) {
  const id = useId()
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className={styles.custom_checkbox}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className={styles.custom_checkbox_label}>
        <Typography content={label} color="primary" size="normal" />
      </label>
    </>
  )
}
