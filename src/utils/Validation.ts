import { FieldType } from "../store/form.ts";
import { validationRules } from "./ValidationRules.ts";
import { RootState } from "../store/config.ts";

/**
 * Validates a field value based on its type and enabled validation rules.
 * @param {FieldType} fieldType - The type of the field.
 * @param {string} value - The value to be validated.
 * @param {string[]} enabledValidationRules - The list of enabled validation rule names.
 * @returns {string[]} An array containing validation error messages, if any.
 */
export const validateFieldValue = (
  fieldType: FieldType,
  value: string,
  enabledValidationRules: string[],
  storeState: RootState
): string[] => {
  const errors: string[] = [];

  // Validate based on field type
  switch (fieldType) {
    case FieldType.Number:
      if (!/^\d+$/.test(value)) {
        errors.push("Value must be a valid number");
      }
      break;
    case FieldType.String:
      // Apply additional validation rules
      for (const ruleName of enabledValidationRules) {
        const ruleFn = validationRules[ruleName];
        if (ruleFn) {
          const validationError = ruleFn(value);

          if (validationError) {
            errors.push(validationError);
          }
        }
      }
      break;
    case FieldType.Date:
      // Apply rule to check whether the value is a valid date and valid date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        errors.push("Value must be a valid date in the format YYYY-MM-DD");
      }
      break;
    case FieldType.Boolean:
      // Rule for checking whether the value is true or false
      if (value !== "true" && value !== "false") {
        errors.push("Value must be 'true' or 'false'");
      }
      break;
    default:
      throw new Error(`Unsupported field type: ${fieldType}`);
  }

  // Return validation error messages, if any
  return errors; 
};
