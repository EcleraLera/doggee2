import React from 'react';

import { IntlText } from '@/features';

import styles from './DontWorry.module.css';

export const DontWorry = () => (
  <div className={styles.text}>
    <IntlText path='page.registration.step.checkDataStep.hint.dontWorry' />
  </div>
);
