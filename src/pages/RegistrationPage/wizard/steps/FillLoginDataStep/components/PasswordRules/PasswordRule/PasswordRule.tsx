/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import styles from './PasswordRule.module.css';
import { IntlText } from '@/features';

interface PasswordRuleProps {
  title: string;
  isCorrect: boolean;
  showIcon: boolean;
}

export const PasswordRule: React.FC<PasswordRuleProps> = ({
  title,
  isCorrect,
  showIcon,
}) => {
  const ruleClassName = isCorrect
    ? styles.password_rule_correct
    : styles.password_rule_uncorrect;
  const iconClassName = isCorrect
    ? styles.password_rule_correct_icon
    : styles.password_rule_uncorrect_icon;

  return (
    <div className={styles.password_rule_container}>
      {showIcon && (
        <div className={styles.password_rule_icon_container}>
          <div className={iconClassName} />
        </div>
      )}

      <IntlText
        path={title}
        values={{
          rule: (text) => (
            <div className={`${styles.password_rule} ${ruleClassName}`}>
              {text}
            </div>
          ),
        }}
      />
    </div>
  );
};
