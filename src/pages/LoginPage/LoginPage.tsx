import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@common/buttons';
import styles from './LoginPage.module.css';
import {
  COOKIE_NAMES,
  ROUTES,
  createAuth,
  setCookie,
  useForm,
  useMutation,
  useStore,
  validateIsEmpty,
} from '@/utils';
import { IntlText, useIntl } from '@/features';
import { Input, PasswordInput } from '@/common/fields';
import { CheckBox } from '@/common/checkbox';

const loginFormValidateSchema = {
  username: (value: string) => validateIsEmpty(value),
  password: (value: string) => validateIsEmpty(value),
};

interface LoginFormValues {
  username: string;
  password: string;
  isNotMyDevice: boolean;
}

export const LoginPage = () => {
  const { setStore } = useStore();
  const navigate = useNavigate();
  const intl = useIntl();

  const { mutationAsync: authMutation, isLoading: authLoading } = useMutation(
    'auth',
    (params: AuthReqPostParams) => createAuth({ params })
  );

  const { values, errors, setFieldValue, handleSubmit, setIsSubmiting } =
    useForm<LoginFormValues>({
      intialValues: { username: '', password: '', isNotMyDevice: false },
      validateSchema: loginFormValidateSchema,
      validateOnChange: false,
      onSubmit: async (values) => {
        console.log('UUUUU');
        const response = await authMutation(values);
        if (!response.success) return;

        if (values.isNotMyDevice) {
          setCookie(
            COOKIE_NAMES.IS_NOT_MY_DEVICE,
            new Date().getTime() + 30 * 60000
          );
        }
        console.log('RESPONSE', response);
        setStore({ user: response.data, service: { isLogined: true } });
        navigate(ROUTES.MAIN);
        setIsSubmiting(false);
      },
    });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header_container}>DOGGEE</div>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <Input
              disabled={authLoading}
              value={values.username}
              label={intl.translateMessage('field.input.username.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFieldValue('username', username);
              }}
              {...(!!errors &&
                !!errors.username && {
                  isError: !!errors.username,
                  helperText: errors.username,
                })}
            />
          </div>
          <div className={styles.input_container}>
            <PasswordInput
              disabled={authLoading}
              value={values.password}
              label={intl.translateMessage('field.input.password.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFieldValue('password', password);
              }}
              {...(!!errors &&
                !!errors.password && {
                  isError: !!errors.password,
                  helperText: errors.password,
                })}
            />
          </div>
          <div className={styles.input_container}>
            <CheckBox
              disabled={authLoading}
              checked={values.isNotMyDevice}
              label={intl.translateMessage(
                'field.checkbox.isNotMyDevice.label'
              )}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const isNotMyDevice = event.target.checked;
                setFieldValue('isNotMyDevice', isNotMyDevice);
              }}
            />
          </div>
          <div className={styles.button_container}>
            <Button type='submit' isLoading={authLoading}>
              <IntlText path='button.signIn' />
            </Button>
          </div>
        </form>

        <div
          role='link'
          tabIndex={0}
          aria-hidden
          className={styles.sing_up_container}
          onClick={() => navigate(ROUTES.REGISTRATION)}
        >
          <IntlText path='page.login.createAccount' />
        </div>
      </div>
    </div>
  );
};
