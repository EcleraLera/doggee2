export const validateIsEmpty = (
  value: string,
  message = 'validations.required'
): ValidationReturn => {
  if (!value) return message;
  return null;
};
