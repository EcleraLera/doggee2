import React from 'react';
import { Breed, Pet } from '@types';
import styles from '../../../../../RegisrationPage.module.css';

import {
  requestBreeds,
  useForm,
  useQuery,
  validateMaxLength,
  validateIsEmpty,
} from '@/utils';
import { IntlText, useIntl } from '@/features';
import { DateInput, Input, Select } from '@/common/fields';
import { Spacing } from '@/common';

const petFormValidateSchema = {
  dogName: (value: string) => validateIsEmpty(value),
  dogWeight: (value: string) => {
    const hasErrorisEmpty = validateIsEmpty(value);
    if (hasErrorisEmpty) return hasErrorisEmpty;
    const hasErrorMaxLength = validateMaxLength(value, 3);
    return hasErrorMaxLength;
  },
};

interface PetFromProps {
  pet: Pet;
  petErrors: {
    [id: string]: {
      [K in keyof typeof petFormValidateSchema]?: ValidationReturn;
    };
  };
  isLoading: boolean;
  onChange: (
    field: keyof PetFormValues,
    value: PetFormValues[keyof PetFormValues]
  ) => void;
}

export const PetForm: React.FC<PetFromProps> = ({
  pet,
  onChange,
  isLoading,
  petErrors,
}) => {
  const intl = useIntl();

  const { data: breedsData } = useQuery<Breed[]>(
    'breeds',
    () => requestBreeds({ params: null }),
    {
      cacheTime: 300000,
    }
  );

  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    resetForm,
    validateForm,
  } = useForm<PetFormValues>({
    intialValues: { ...pet, dogBirthday: new Date(pet.dogBirthday) },
    validateSchema: petFormValidateSchema,
    validateOnChange: true,
  });

  React.useEffect(() => {
    if (petErrors[pet.id]) validateForm();
  }, [petErrors, pet.id, values]);

  React.useEffect(() => {
    resetForm({ ...pet, dogBirthday: new Date(pet.dogBirthday) });
  }, [pet.id]);

  const WeightIcon = React.useCallback(
    () => <div className={styles.weight_postfix}>kg</div>,
    []
  );

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <Input
        disabled={isLoading}
        value={pet.dogName}
        label={intl.translateMessage('field.input.dogName.label')}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const dogName = event.target.value;
          setFieldValue('dogName', dogName);
          onChange('dogName', dogName);
        }}
        {...(!!errors &&
          !!errors.dogName && {
            isError: !!errors.dogName,
            helperText: errors.dogName,
          })}
      />
      <Spacing spacing={15} />
      <Select
        disabled={isLoading}
        options={
          breedsData?.map((breed: { name: any; id: any }) => ({
            label: breed.name,
            id: breed.id,
            value: breed,
          })) ?? []
        }
        onChange={(option) => {
          setFieldValue('breed', option.value);
          onChange('breed', option.value);
        }}
        value={
          values.breed
            ? {
                label: values.breed.name,
                id: values.breed.id,
                value: values.breed,
              }
            : null
        }
        components={{
          // eslint-disable-next-line react/no-unstable-nested-components
          NoOptionsMessage: () => <IntlText path='field.select.noOption' />,
        }}
        label={intl.translateMessage('field.input.breed.label')}
      />
      <Spacing spacing={15} />
      <DateInput
        locale={intl.locale}
        disabled={isLoading}
        value={values.dogBirthday}
        label={intl.translateMessage('field.input.dogBirthday.label')}
        onChange={(date) => {
          setFieldValue('dogBirthday', date);
          onChange('dogBirthday', date);
        }}
        {...(!!errors &&
          !!errors.dogBirthday && {
            isError: !!errors.dogBirthday,
            helperText: errors.dogBirthday,
          })}
      />
      <Spacing spacing={15} />
      <Input
        disabled={isLoading}
        availableChars={/^[0-9]+$/g}
        value={values.dogWeight}
        label={intl.translateMessage('field.input.dogWeight.label')}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const dogWeight = event.target.value;
          setFieldValue('dogWeight', dogWeight);
          onChange('dogWeight', dogWeight);
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        components={{ indicator: () => <WeightIcon /> }}
        {...(!!errors &&
          !!errors.dogWeight && {
            isError: !!errors.dogWeight,
            helperText: errors.dogWeight,
          })}
      />
      <Spacing spacing={15} />
    </form>
  );
};
