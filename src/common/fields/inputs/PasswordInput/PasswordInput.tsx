import React from 'react';
import type { InputProps } from '../Input/Input';
import { Input } from '../Input/Input';
import styles from './PasswordInput.module.css';
import eyesOpened from '../../../../static/images/eyesOpened.svg';
import eyesClosed from '../../../../static/images/eyesClosed.svg';

type PasswordInputProps = InputProps;

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const showPasswordToggle = !!value;

  const ToggleIcon = React.useCallback(
    () => (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        // aria-hidden='true'
        role='button'
        className={styles.password_toggle_container}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <img
            className={styles.password_toggle}
            src={eyesClosed}
            alt='EyesClosed'
          />
        ) : (
          <img
            className={styles.password_toggle}
            src={eyesOpened}
            alt='EyesOpened'
          />
        )}
      </div>
    ),
    [showPassword]
  );

  return (
    <Input
      {...(showPasswordToggle && {
        components: {
          indicator: ToggleIcon,
        },
      })}
      type={showPassword ? 'text' : 'password'}
      value={value}
      {...props}
    />
  );
};

// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (onChange) {
//     if (!e.target.value || /^[a-zA-Z0-9!;,.]+$/g.test(e.target.value)) {
//       onChange(e);
//     }
//   }
// };

// return (
//   <>
//     <div
//       aria-hidden='true'
//       aria-disabled={props.disabled}
//       className={`${inputStyles.container} ${
//         isError ? inputStyles.container : ''
//       }`}
//       onClick={() => {
//         inputRef.current?.focus();
//       }}
//     >
//       <input
//         type={showPasswordToggle && showPassword ? 'text' : 'password'}
//         ref={inputRef}
//         className={inputStyles.input}
//         onChange={handleChange}
//         {...props}
//       />{' '}
//       <label htmlFor={props.id} className={inputStyles.label}>
//         {label}
//       </label>
//       {showPasswordToggle && (
//         <div
//           aria-hidden='true'
//           role='button'
//           className={styles.password_toggle_container}
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? (
//             <img
//               className={styles.password_toggle}
//               src={eyesClosed}
//               alt='EyesClosed'
//             />
//           ) : (
//             <img
//               className={styles.password_toggle}
//               src={eyesOpened}
//               alt='EyesOpend'
//             />
//           )}
//         </div>
//       )}
//     </div>
//     {isError && helperText && (
//       <div className={inputStyles.helper_text}>{helperText}</div>
//     )}
//   </>
// );
// };

// import React, { useRef } from 'react';
// import inputStyles from '../input.module.css';
// import styles from './PasswordInput.module.css';
// import eyesOpened from '../../../../static/images/eyesOpened.svg';
// import eyesClosed from '../../../../static/images/eyesClosed.svg';

// interface InputProps
//   extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
//   label: string;
//   isError?: boolean;
//   helperText?: string;
// }

// export const PasswordInput: React.FC<InputProps> = ({
//   isError = false,
//   helperText,
//   label,
//   onChange,
//   type,
//   value,
//   ...props
// }) => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [showPassword, setShowPassword] = React.useState(false);
//   const showPasswordToggle = !!value;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (onChange) {
//       if (!e.target.value || /^[a-zA-Z0-9!;,.]+$/g.test(e.target.value)) {
//         onChange(e);
//       }
//     }
//   };

//   return (
//     <div className={inputStyles.container} aria-disabled={props.disabled}>
//       <input
//         type={showPasswordToggle && showPassword ? 'text' : 'password'}
//         ref={inputRef}
//         className={inputStyles.input}
//         onChange={handleChange}
//         value={value}
//         {...props}
//       />
//       <label htmlFor={props.id} className={inputStyles.label}>
//         {label}
//       </label>
//       {showPasswordToggle && (
//         <div
//           aria-hidden='true'
//           role='button'
//           className={styles.password_toggle_container}
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? (
//             <img
//               className={styles.password_toggle}
//               src={eyesClosed}
//               alt='EyesClosed'
//             />
//           ) : (
//             <img
//               className={styles.password_toggle}
//               src={eyesOpened}
//               alt='EyesOpened'
//             />
//           )}
//         </div>
//       )}
//       {isError && helperText && (
//         <div className={inputStyles.helper_text}>{helperText}</div>
//       )}
//     </div>
//   );
// };
