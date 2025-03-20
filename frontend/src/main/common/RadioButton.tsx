import React from 'react';
import styles from './RadioButton.module.scss';
import Typography from './Typography';

type Props = {
    label: string
    value: string
    name: string
    checked?: boolean
    onChange: (value: string) => void
};

const RadioButton: React.FC<Props> = ({ label, value, name, checked, onChange }) => {
    return (
        <label className={styles.radio_button}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
                className={styles.radio_input}
            />
            <Typography content={label} size="normal" color="primary" weight="normal" />
        </label>
    );
};

export default RadioButton;
