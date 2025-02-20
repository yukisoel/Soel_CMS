import { useState } from 'react';
import styles from './ToggleButton.module.scss';
import toggleOffImage from '@/main/assets/ToggleOff.svg';
import toggleOnImage from '@/main/assets/ToggleOn.svg';

type Props = {
    checked?: boolean;
    readOnly?: boolean;
    onChange?: () => void;
};

const ToggleButton = ({ checked, readOnly = false, onChange }: Props) => {
    const [isOn, setIsOn] = useState(checked);

    const handleToggle = () => {
        if (!readOnly) {
            setIsOn(!isOn);
            if (onChange) {
                onChange();
            }
        }
    };

    return (
        <button
            className={styles.toggle_button}
            onClick={handleToggle}
            aria-pressed={isOn}
            disabled={readOnly}
        >
            <img
                src={toggleOffImage}
                alt="Off"
                className={`${styles.toggle_image} ${!isOn ? styles.visible : styles.hidden}`}
            />
            <img
                src={toggleOnImage}
                alt="On"
                className={`${styles.toggle_image} ${isOn ? styles.visible : styles.hidden}`}
            />
        </button>
    );
};

export default ToggleButton;
