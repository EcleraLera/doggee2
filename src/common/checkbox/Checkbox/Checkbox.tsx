// import React from 'react';
// import styles from './Checkbox.module.css';

// interface CheckboxProps {
//   label: string;
//   checked: boolean;
//   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
// }

// export const Checkbox: React.FC<CheckboxProps> = ({
//   label,
//   checked,
//   onChange,
// }) => {
//   const [checked, setChecked] = React.useState(false);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked(event.target.checked);
//   };

//   return (
//     <div className={styles.checkbox_container}>
//       <label className={styles.checkbox}>
//         <input type='checkbox' checked={checked} onChange={handleChange} />
//         {label}
//       </label>
//     </div>
//   );
// };
import React from 'react';
import type { InputProps } from '../../fields/inputs/Input/Input';
import styles from './Checkbox.module.css';

type CheckboxProps = InputProps;

export const CheckBox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  ...props
}) => {
  return (
    <label htmlFor={props.id} className={styles.checkbox}>
      <input type='checkbox' checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};
