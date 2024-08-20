import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
}) => (
  // eslint-disable-next-line react/button-has-type
  <button className={styles.button} disabled={isLoading}>
    {!isLoading && children}
    {isLoading && <div className={styles.button_loading} />}
  </button>
);
