import React from 'react';

import styles from './DateCart.module.css';

interface DataCardProps {
  children: React.ReactNode;
  title: string;
  onEdit: () => void;
}

export const DataCard: React.FC<DataCardProps> = ({
  onEdit,
  title,
  children,
}) => (
  <div className={styles.data_container}>
    <div className={styles.data_header}>
      <div className={styles.data_header_title}>{title}</div>
      <div
        className={styles.data_header_edit_icon}
        aria-hidden
        onClick={onEdit}
      />
    </div>
    <div className={styles.data_body}>
      {React.Children.map(children, (child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {!!index && child && <div className={styles.line} />}
          {child}
        </React.Fragment>
      ))}
    </div>
  </div>
);
