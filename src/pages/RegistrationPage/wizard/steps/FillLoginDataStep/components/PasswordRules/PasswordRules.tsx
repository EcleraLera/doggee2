import React from 'react';

import { PasswordRule } from './PasswordRule/PasswordRule';

import styles from './PasswordRules.module.css';
import { IntlText } from '@/features';

interface PasswordRulesProps {
  rules: {
    title: string;
    isCorrect: boolean;
  }[];
  hasPasswordErrors: boolean;
}

export const PasswordRules: React.FC<PasswordRulesProps> = ({
  rules,
  hasPasswordErrors,
}) => (
  <div className={styles.password_rules_container}>
    <IntlText path='page.registration.step.fillLoginDataStep.passwordRules.must' />

    {rules.slice(0, -1).map(({ title, isCorrect }, index) => {
      const showIcon = isCorrect || hasPasswordErrors;

      // // Логирование значения showIcon
      // console.log(
      //   `Rule: ${title}, isCorrect: ${isCorrect}, showIcon: ${showIcon}`
      // );

      return (
        <PasswordRule
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          title={title}
          isCorrect={isCorrect}
          showIcon={showIcon}
        />
      );
    })}

    {(() => {
      const lastRule = rules[rules.length - 1];
      const showIcon = lastRule.isCorrect || hasPasswordErrors;

      // // Логирование значения showIcon для последнего правила
      // console.log(
      //   `Last Rule: ${lastRule.title}, isCorrect: ${lastRule.isCorrect}, showIcon: ${showIcon}`
      // );

      return (
        <PasswordRule
          showIcon={showIcon}
          title='page.registration.step.fillLoginDataStep.passwordRules.mustMatch'
          isCorrect={lastRule.isCorrect}
        />
      );
    })()}
  </div>
);
