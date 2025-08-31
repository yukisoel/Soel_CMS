import React from 'react';
import Wrapper from './Wrapper';
import Typography from './Typography';
import styles from './Loading.module.scss';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  minHeight?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  message = '読み込み中...', 
  size = 'medium',
  fullScreen = false,
  minHeight = '400px'
}) => {
  const containerStyles = fullScreen 
    ? { position: 'fixed' as const, top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }
    : { minHeight };

  return (
    <Wrapper 
      direction="col" 
      justify="justify-center" 
      align="align-center" 
      style={containerStyles}
      className={styles.loading}
    >
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.spinnerRing}></div>
      </div>
      <Typography 
        content={message} 
        size={size === 'small' ? 'xsmall' : size === 'large' ? 'large' : 'medium'} 
        color="secondary" 
        className={styles.message}
      />
    </Wrapper>
  );
};

export default Loading;