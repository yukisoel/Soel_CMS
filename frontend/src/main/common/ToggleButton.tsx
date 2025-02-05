import { useState } from 'react';
import styles from './ToggleButton.module.scss';
import toggleOffImage from '@/main/assets/ToggleOff.svg';
import toggleOnImage from '@/main/assets/ToggleOn.svg';

const ToggleButton = () => {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <button
            className={styles.toggle_button}
            onClick={handleToggle}
            aria-pressed={isOn}
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
