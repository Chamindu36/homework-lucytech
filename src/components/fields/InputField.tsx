import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { TextField, TextFieldProps } from "@mui/material";
import { FieldType } from "../../store/form";
import { validateFieldValue } from "../../utils/Validation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/config";

// Styled component for the container of the input field and error messages
const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1rem; /* Add margin at the bottom for spacing */
`;

// Styled component for displaying error messages
const ErrorContainer = styled.div`
  color: red;
  font-size: 12px;
  position: absolute;
  top: 100%;
  left: 10px;
`;


// Define the component for InputFieldProps 
type InputFieldProps = Omit<TextFieldProps, "onChange"> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
  fieldType: FieldType; // Add the fieldType prop
  selectedValidationRules?: any;
};

/**
 * Represents an input field that handles text input with dynamic validation errors.
 * It displays the input field, validates input based on selected rules, and shows errors.
 */
export const InputField = ({
  label,
  value,
  onChange,
  fieldType,
  selectedValidationRules,
  ...rest
}: InputFieldProps) => {
  // State to store validation errors
  const [errors, setErrors] = useState<string[]>([]);
  
  // Get the Redux store state if needed
  const storeState = useSelector((state: RootState) => state);

  // Handler for input value change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
      setErrors([]); // Clear the error when the user starts typing
    }
  };

  // Handler for input onBlur event (when input loses focus)
  const handleBlur = () => {
    // Validate the input value based on selected validation rules
    const validationErrors = validateFieldValue(
      fieldType,
      value,
      selectedValidationRules,
      storeState
    );

    setErrors(validationErrors); // Update the errors state with validation results
  };

  return (
    <InputFieldContainer>
      {/* Input field */}
      <TextField
        label={label}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        fullWidth
        margin="normal"
        {...rest}
      />
      {/* Display error messages */}
      {errors.length > 0 && (
        <ErrorContainer>
          <ul style={{ listStyleType: "disc", paddingLeft: "15px" }}>
            {errors.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </ErrorContainer>
      )}
    </InputFieldContainer>
  );
};
