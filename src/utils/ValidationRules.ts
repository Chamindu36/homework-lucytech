/**
 * Validation rules configuration.
 * Maps rule names to corresponding validation functions.
 */

// Validator function to check if the value has a minimum length of 5 characters.
const minLengthValidator = (value: string) =>
  value.length >= 5 ? null : `The value must have a minimum length of 5 characters.`;

// Validator function to check if the value starts with a capital letter.
const startsWithCapitalValidator = (value: string) =>
  /^[A-Z]/.test(value) ? null : "The value must start with a capital letter.";

// Validator function to check if the value is in a valid email format.
const emailFormatValidator = (value: string) =>
  /\S+@\S+\.\S+/.test(value)
    ? null
    : "The value must be in a valid email format.";

// Validator function to check if the value contains no special characters.
const noSpecialCharactersValidator = (value: string) =>
  /^[a-zA-Z0-9]*$/.test(value)
    ? null
    : "The value cannot contain special characters.";

// Validation rules configuration
export const validationRules: Record<string, (value: string, ...args: any[]) => string | null> = {
  minLength: minLengthValidator,
  startsWithCapital: startsWithCapitalValidator,
  emailFormat: emailFormatValidator,
  noSpecialCharacters: noSpecialCharactersValidator,
};
