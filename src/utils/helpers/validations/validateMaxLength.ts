export const validateMaxLength = (
  value: string,
  maxLength: number,
  message = 'validations.maxLength'
): ValidationReturn => {
  if (maxLength <= value.length) return message;
  return null;
};
