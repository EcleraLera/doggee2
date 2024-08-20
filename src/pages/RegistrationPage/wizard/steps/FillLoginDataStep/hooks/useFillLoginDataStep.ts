import React from 'react';
import {
  validateContainLowerCase,
  validateContainNumbers,
  validateContainUpperCase,
  validateIsEmpty,
} from '@/utils/helpers';
import { useForm, useMutation } from '@/utils/hooks';
import { MIN_LENGHT, createRegistration, useStore } from '@/utils';

const fillLoginDataStepValidateSchema = {
  username: (value: string) => validateIsEmpty(value),
  password: (value: string) => validateIsEmpty(value),
  passwordAgain: (value: string) => validateIsEmpty(value),
};

export const getPasswordRules = (
  password: FillLoginDataStepValues['password'],
  passwordAgain: FillLoginDataStepValues['passwordAgain']
) => [
  {
    title:
      'page.registration.step.fillLoginDataStep.passwordRules.containNumbers',
    isCorrect: !validateContainNumbers(password),
  },
  {
    title:
      'page.registration.step.fillLoginDataStep.passwordRules.containUppercase',
    isCorrect: !validateContainUpperCase(password),
  },
  {
    title:
      'page.registration.step.fillLoginDataStep.passwordRules.containLowerCase',
    isCorrect: !validateContainLowerCase(password),
  },
  {
    title:
      'page.registration.step.fillLoginDataStep.passwordRules.contain8Characters',
    isCorrect: password.length >= MIN_LENGHT.PASSWORD,
  },
  {
    title: 'page.registration.step.fillLoginDataStep.passwordRules.mustMatch',
    isCorrect: !!password && !!passwordAgain && password === passwordAgain,
  },
];

type UseFillLoginDataStepParams = FillLoginDataStepProps;

export const useFillLoginDataStep = ({
  nextStep,
}: UseFillLoginDataStepParams) => {
  const { setStore } = useStore();

  const {
    mutationAsync: registrationMutation,
    isLoading: registrationLoading,
  } = useMutation('createRegistration', (params: RegistrationReqPostParams) =>
    createRegistration({ params })
  );

  const { values, errors, setFieldValue, handleSubmit, setIsSubmiting } =
    useForm<FillLoginDataStepValues>({
      intialValues: { username: '', password: '', passwordAgain: '' },
      validateSchema: fillLoginDataStepValidateSchema,
      validateOnChange: false,
      onSubmit: async (values) => {
        console.log('useForm onSubmit called with values:', values);

        // Проверка правил для пароля
        const passwordRules = getPasswordRules(
          values.password,
          values.passwordAgain
        );
        console.log('Password rules:', passwordRules);

        const isPasswordUnCorrect = passwordRules.some(
          (rule) => rule.isCorrect === false
        );

        if (isPasswordUnCorrect) {
          console.log('Password validation failed');
          return;
        }

        console.log('Password validation passed');

        const response = await registrationMutation({
          password: values.password,
          username: values.username,
        });

        console.log('API response:', response);

        if (response.data && response.success) {
          console.log('Registration succeeded:', response);
          setStore({ user: response.data });
          nextStep();
        } else {
          console.log('Registration failed:', response);
          setIsSubmiting(false);
        }
      },
    });

  const rules = React.useMemo(
    () => getPasswordRules(values.password, values.passwordAgain),
    [values.password, values.passwordAgain]
  );

  return {
    state: {
      loading: registrationLoading,
      values,
      errors,
      rules,
    },
    functions: {
      setFieldValue,
      handleSubmit,
    },
  };
};
