import React, { useRef } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import { ja } from 'date-fns/locale/ja'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.scss'
import styles from './DatePicker.module.scss'
import ArrowIcon from '@/main/assets/ArrowIcon.svg'

registerLocale('ja', ja)

type Props = {
    defaultValue?: Date | null;
    readOnly?: boolean;
    onChange?: (date: Date | null) => void;
};

const DatePicker: React.FC<Props> = ({ defaultValue, readOnly = false, onChange }) => {
  const datePickerRef = useRef<ReactDatePicker>(null)

  const handleChange = (date: Date | null) => {
    if (onChange) {
      onChange(date)
    }
  }

  const handleContainerClick = () => {
    if (datePickerRef.current && !readOnly) {
      datePickerRef.current.setFocus()
    }
  }

  return (
    <div className={styles.date_picker_container} onClick={handleContainerClick}>
      <ReactDatePicker
        ref={datePickerRef}
        selected={defaultValue}
        onChange={handleChange}
        locale="ja"
        dateFormat="yyyy年MM月dd日"
        placeholderText="日付を選択"
        className={styles.date_picker_input}
        popperClassName="date_picker"
        popperProps={{ strategy: 'fixed' }}
        portalId="root-portal"
        disabled={readOnly}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        yearDropdownItemNumber={100}
        scrollableYearDropdown
      />
      <img src={ArrowIcon} alt="Arrow Icon" className={styles.arrow_icon} />
    </div>
  )
}

export default DatePicker
