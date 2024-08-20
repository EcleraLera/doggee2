export const validateContainUpperCase = (
  value: string,
  message = 'validations.containUpperCase'
): ValidationReturn => {
  if (!/[A-Z]/g.test(value)) return message;
  return null;
};
