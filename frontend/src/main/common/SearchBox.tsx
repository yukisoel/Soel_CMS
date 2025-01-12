import styles from "@/main/common/SearchBox.module.scss";

type Props = {
  placeholder?: string
  width?: string
  value?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchBox({placeholder, width, value = "", onChange}: Props) {
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
