import React from 'react';
import styles from '@/main/common/Textarea.module.scss';
import classNames from 'classnames';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    padding?: string;
    width?: string;
    height?: string;
    fwMedium?: boolean;
    className?: string;
    readOnly?: boolean;
    ref?: React.Ref<HTMLTextAreaElement>;
}

const Textarea: React.FC<Props> = ({ width, height, padding, fwMedium = false, className, readOnly = false, ref, ...props }) => {
    return (
        <div className={styles.textarea_wrapper} style={{width: width, height: height}}>
            <textarea
                className={classNames(
                    className,
                    styles.textarea,
                    fwMedium ? styles['fw_medium'] : ''
                )}
                style={{ padding: padding, width: width, height: height }}
                ref={ref}
                readOnly={readOnly}
                {...props}
            />
        </div>
    );
};

export default Textarea;
