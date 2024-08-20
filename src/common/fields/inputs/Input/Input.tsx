import React, { useRef } from 'react';
import styles from '../input.module.css';

export interface FieldProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  loading?: boolean;
  isError?: boolean;
  helperText?: string;
  availableChars?: RegExp;
}

export interface InputProps extends FieldProps {
  components?: {
    indicator?: () => React.ReactElement;
  };
}

export const Input: React.FC<InputProps> = ({
  isError = false,
  helperText,
  onChange,
  label,
  availableChars,
  components,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line consistent-return
  const handleChange = (e: any) => {
    if (!!onChange && !e.target.value) return onChange(e);
    if (!onChange || (availableChars && !availableChars.test(e.target.value)))
      // @ts-ignore
      return onChange({ ...e, target: { ...e.target, value: props.value } });
    onChange(e);
  };

  return (
    <>
      <div
        // aria-hidden='true'
        aria-disabled={props.disabled}
        className={`${styles.container} ${
          isError ? styles.error_container : ''
        }`}
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <input
          ref={inputRef}
          className={styles.input}
          onChange={handleChange}
          {...props}
        />
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
        {components?.indicator && <div>{components.indicator()}</div>}
      </div>
      {isError && helperText && (
        <div className={styles.helper_text}>{helperText}</div>
      )}
    </>
  );
};
