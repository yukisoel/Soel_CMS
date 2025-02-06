import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale/ja';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';
import styles from './DatePicker.module.scss';
import ArrowIcon from '@/main/assets/ArrowIcon.svg';

registerLocale('ja', ja);

type Props = {
    defaultValue?: Date | null;
    onChange?: (date: Date | null) => void;
};

const DatePicker: React.FC<Props> = ({ defaultValue, onChange }) => {
    const handleChange = (date: Date | null) => {
        if (onChange) {
            onChange(date);
        }
    };

    return (
        <div className={styles.date_picker_container}>
            <ReactDatePicker
                selected={defaultValue}
                onChange={handleChange}
                locale="ja"
                dateFormat="yyyy年MM月dd日"
                placeholderText="日付を選択"
                className={styles.date_picker_input}
                popperClassName="date_picker"
            />
            <img src={ArrowIcon} alt="Arrow Icon" className={styles.arrow_icon} />
        </div>
    );
};

export default DatePicker;
