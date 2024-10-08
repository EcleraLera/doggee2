import React from 'react';

import { Button } from '@common/buttons';
import { Spacing } from '@/common';

import { RegistrationWizardContainerMobile } from '../../../RegistrationWizardContainer';
import { FillProfilePanelData } from '../components/FillProfilePanelData/FillProfilePanelData';

import styles from '../../../../RegisrationPage.module.css';
import { validateIsEmpty } from '@/utils/helpers';
import { useStore } from '@/utils/contexts';
import { IntlText, useIntl } from '@/features/intl';
import { useForm, useMutation } from '@/utils/hooks';
import { changeUser } from '@/utils/api';
import { DateInput, Input } from '@/common/fields';

const fillProfileDataStepValidateSchema = {
  name: (value: string) => validateIsEmpty(value),
  registrationAddress: (value: string) => validateIsEmpty(value),
};

interface FillProfileDataStepValues {
  name: string;
  registrationAddress: string;
  birthDate: Date;
}

interface FillProfileDataStepProps {
  initialData: FillProfileData;
  skipStep: () => void;
  nextStep: (fillProfileData: FillProfileData) => void;
}

export const FillProfileDataStep: React.FC<FillProfileDataStepProps> = ({
  initialData,
  nextStep,
  skipStep,
}) => {
  const { setStore } = useStore();
  const intl = useIntl();
  const [focusedField, setFocuseField] = React.useState<
    'name' | 'registrationAddress' | null
  >(null);

  const { mutationAsync: changeUserMutation, isLoading: changeUserLoading } =
    useMutation('changeUser', (params: UsersIdReqPatchParams) =>
      changeUser({ params })
    );

  const { values, errors, setFieldValue, handleSubmit } =
    useForm<FillProfileDataStepValues>({
      intialValues: {
        ...initialData,
        birthDate: new Date(initialData.birthDate),
      },
      validateSchema: fillProfileDataStepValidateSchema,
      validateOnChange: false,
      onSubmit: async (values) => {
        // if (!user?.id) return;

        const changeUserMutationParams: UsersIdReqPatchParams = {
          ...values,
          id: '1',
          birthDate: values.birthDate.getTime(),
        };
        const response = await changeUserMutation(changeUserMutationParams);

        if (!response.success) return;

        setStore({ user: response.data });
        nextStep({ ...values, birthDate: values.birthDate.getTime() });
      },
    });

  return (
    <RegistrationWizardContainerMobile
      activeStep={1}
      form={{
        title: <IntlText path='page.registration.step.fillProfileData.title' />,
        content: (
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <Input
              disabled={changeUserLoading}
              value={values.name}
              label={intl.translateMessage('field.input.name.label')}
              onFocus={() => setFocuseField('name')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFieldValue('name', username);
              }}
              {...(!!errors &&
                !!errors.name && {
                  isError: !!errors.name,
                  helperText: errors.name,
                })}
            />
            <Spacing spacing={15} />
            {focusedField && focusedField === 'name' && (
              <>
                <FillProfilePanelData focusedField={focusedField} />
                <Spacing spacing={15} />
              </>
            )}
            <Input
              disabled={changeUserLoading}
              value={values.registrationAddress}
              label={intl.translateMessage(
                'field.input.registrationAddress.label'
              )}
              onFocus={() => setFocuseField('registrationAddress')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFieldValue('registrationAddress', password);
              }}
              {...(!!errors &&
                !!errors.registrationAddress && {
                  isError: !!errors.registrationAddress,
                  helperText: errors.registrationAddress,
                })}
            />
            <Spacing spacing={15} />
            {focusedField && focusedField === 'registrationAddress' && (
              <>
                <FillProfilePanelData focusedField={focusedField} />
                <Spacing spacing={15} />
              </>
            )}
            <DateInput
              locale={intl.locale}
              disabled={changeUserLoading}
              value={values.birthDate}
              label={intl.translateMessage('field.input.birthDate.label')}
              onFocus={() => setFocuseField(null)}
              onChange={(date) => {
                setFieldValue('birthDate', date);
              }}
              {...(!!errors &&
                !!errors.birthDate && {
                  isError: !!errors.birthDate,
                  helperText: errors.birthDate,
                })}
            />
            <Spacing spacing={15} />

            <Button type='submit' isLoading={changeUserLoading}>
              <IntlText path='button.next' />
            </Button>
          </form>
        ),
        footer: (
          <div role='link' tabIndex={0} aria-hidden onClick={skipStep}>
            <IntlText path='page.registration.skipAndFillInLater' />
          </div>
        ),
      }}
    />
  );
};
