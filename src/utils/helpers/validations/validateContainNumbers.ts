export const validateContainNumbers = (
  value: string,
  message = 'validations.containNumbers'
): ValidationReturn => {
  if (!/\d/g.test(value)) return message;
  return null;
};
