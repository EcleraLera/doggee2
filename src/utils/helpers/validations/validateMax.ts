export const validateMax = (
  value: number,
  maxLength: number,
  message = 'validations.max'
): ValidationReturn => {
  if (maxLength <= value) return message;
  return null;
};
