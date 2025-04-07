import styles from "@/main/common/SearchBox.module.scss";

type Props = {
  placeholder?: string
  width?: string
  value?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function SearchBox({placeholder, width, value = undefined, onChange}: Props) {
  return (
    <input
        type="text"
        placeholder={placeholder}
        className={styles.search_box}
        style={{ width }}
        value={value}
        onChange={onChange}
    />
  )
}
