import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@common/buttons';
import { Input, PasswordInput } from '@common/fields';
import { Spacing } from '@/common';
import { RegistrationWizardContainerDesktop } from '../../../RegistrationWizardContainer';
import { PasswordRules } from '../components/PasswordRules/PasswordRules';
import { useFillLoginDataStep } from '../hooks/useFillLoginDataStep';

import styles from '../../../../RegisrationPage.module.css';
import { IntlText, useIntl } from '@/features';
import { ROUTES } from '@/utils';

export const FillLoginDataStep: React.FC<FillLoginDataStepProps> = ({
  nextStep,
}) => {
  console.log('FillLoginDataStep loaded');
  const intl = useIntl();
  const navigate = useNavigate();

  const { state, functions } = useFillLoginDataStep({
    nextStep,
  });

  // Добавление логирования
  console.log('Component Rendered with state:', state);

  return (
    <RegistrationWizardContainerDesktop
      panel={{
        data: (
          <PasswordRules
            rules={state.rules}
            hasPasswordErrors={!!state.errors?.password}
          />
        ),
        footer: (
          <div
            role='link'
            tabIndex={0}
            aria-hidden
            onClick={() => navigate(ROUTES.AUTH)}
          >
            <IntlText path='page.registration.step.fillLoginDataStep.iAlreadyHaveAnAccount' />
          </div>
        ),
      }}
      form={{
        title: (
          <IntlText path='page.registration.step.fillLoginDataStep.title' />
        ),
        content: (
          <form
            className={styles.form_container}
            onSubmit={(event) => {
              event.preventDefault(); // Предотвращает перезагрузку страницы
              console.log('Form submitted');
              functions.handleSubmit(event);
            }}
          >
            <Input
              disabled={state.loading}
              value={state.values.username}
              label={intl.translateMessage('field.input.username.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                console.log('Username changed:', username);
                functions.setFieldValue('username', username);
              }}
              {...(!!state.errors &&
                !!state.errors.username && {
                  isError: !!state.errors.username,
                  helperText: state.errors.username,
                })}
            />
            <Spacing spacing={15} />

            <PasswordInput
              disabled={state.loading}
              value={state.values.password}
              label={intl.translateMessage('field.input.password.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                console.log('Password changed:', password);
                functions.setFieldValue('password', password);
              }}
              {...(!!state.errors &&
                !!state.errors.password && {
                  isError: !!state.errors.password,
                  helperText: state.errors.password,
                })}
            />
            <Spacing spacing={15} />

            <PasswordInput
              disabled={state.loading}
              value={state.values.passwordAgain}
              label={intl.translateMessage('field.input.passwordAgain.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const passwordAgain = event.target.value;
                console.log('PasswordAgain changed:', passwordAgain);
                functions.setFieldValue('passwordAgain', passwordAgain);
              }}
              {...(!!state.errors &&
                !!state.errors.password && {
                  isError: !!state.errors.password,
                  helperText: state.errors.password,
                })}
            />
            <Spacing spacing={15} />

            <Button type='submit' isLoading={state.loading}>
              <IntlText path='button.done' />
            </Button>
          </form>
        ),
      }}
    />
  );
};
