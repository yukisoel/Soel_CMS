import React from 'react';
import styles from './Scroll.module.scss';

type ScrollProps = {
    children: React.ReactNode;
    offset?: string;
    bgColor?: string;
    width?: string;
    height: string;
};

const Scroll: React.FC<ScrollProps> = ({ children, offset = '15px', height, width = '100%', bgColor = '#f0f0f0' }) => {
    return (
        <div className={styles.scroll} style={{ padding: `${offset}`, height, width, backgroundColor: bgColor } as React.CSSProperties}>
            <div className={styles.scrollContent} style={{ paddingRight: offset, height: `calc(${height} - 2 * ${offset})` }}>
                {children}
            </div>
        </div>
    );
};

export default Scroll;
