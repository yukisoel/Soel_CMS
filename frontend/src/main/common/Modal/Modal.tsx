import React, { MouseEvent, useEffect } from 'react';
import styles from './Modal.module.scss';
import Typography from '../Typography';
import CloseIcon from '@/main/assets/CloseIcon.svg';
import Separator from '../Separator';
import Wrapper from '../Wrapper';

type Props = {
    headerContent: string
    contentRender: () => React.ReactNode
    isOpen: boolean;
    onClose: () => void;
};

export default function Modal({ headerContent, isOpen, onClose, contentRender }: Props) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modal_overlay} onClick={handleOverlayClick}>
            <div className={styles.modal_content}>
                <Wrapper direction="col" gap="2rem">
                    <div className={styles.modal_header}>
                        <Typography content={headerContent} color="primary" size="normal" />
                        <button className={styles.close_button} onClick={onClose}>
                            <img src={CloseIcon} alt="close icon"  />
                        </button>
                    </div>
                    <Separator width="100%" />
                </Wrapper>
                {
                    contentRender()
                }
            </div>
        </div>
    );
}
