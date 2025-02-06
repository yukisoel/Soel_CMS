import React, { useRef } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale/ja';
import 'react-datepicker/dist/react-datepicker.css';
import './TimePicker.scss';
import styles from './TimePicker.module.scss';
import ArrowIcon from '@/main/assets/ArrowIcon.svg';

registerLocale('ja', ja);

type Props = {
    defaultValue?: Date | null;
    onChange?: (date: Date | null) => void;
};

const TimePicker: React.FC<Props> = ({ defaultValue, onChange }) => {
    const datePickerRef = useRef<ReactDatePicker>(null);

    const handleChange = (time: Date | null) => {
        if (onChange) {
            onChange(time);
        }
    };

    const handleContainerClick = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setFocus();
        }
    };

    return (
        <div className={styles.time_picker_container} onClick={handleContainerClick}>
            <ReactDatePicker
                ref={datePickerRef}
                selected={defaultValue}
                onChange={handleChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="時間"
                dateFormat="HH:mm"
                locale="ja"
                placeholderText="00:00"
                className={styles.time_picker_input}
                popperClassName="time_picker"
            />
            <img src={ArrowIcon} alt="Arrow Icon" className={styles.arrow_icon} />
        </div>
    );
};

export default TimePicker;
