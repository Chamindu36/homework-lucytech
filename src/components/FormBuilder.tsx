import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addField, FieldType } from "../store/form";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import { InputField } from "./fields/InputField";
import { Dropdown } from "./fields/Dropdown";
import { RootState } from "../store/config";
import { validationRules } from "../utils/ValidationRules";

// Styled component for the entire FormBuilder container
const FormBuilderContainer = styled.div`
  width: 300px;
  margin: auto;
`;

// Styled component for the header
const FormBuilderHeader = styled(Typography)`
  margin-bottom: 1rem;
`;

// Styled component for the "Add Field" button
const AddFieldButton = styled(Button)`
  margin-top: 1rem;
`;

// Styled component for the checkbox container
const CheckboxContainer = styled.div`
  margin-top: 1rem;
`;

export const FormBuilder = () => {
  // State for field input values and settings
  const [currentType, setCurrentType] = useState("");
  const [currentKey, setCurrentKey] = useState("");
  const [currentLabel, setCurrentLabel] = useState("");
  const [enableDynamicValidation, setEnableDynamicValidation] = useState(false);
  const [selectedValidationRules, setSelectedValidationRules] = useState<
    string[]
  >([]);
  
  // Redux dispatcher and state selector
  const dispatch = useDispatch();
  const { fields } = useSelector((state: RootState) => state.form);

  // Handles the action of adding a new field
  const handleAddingField = () => {
    if (fields[currentKey] !== undefined) {
      alert("Key already exists");
      return;
    }

    if (currentType && currentKey && currentLabel) {
      const fieldType = currentType as FieldType;

      dispatch(
        addField({
          key: currentKey,
          type: fieldType,
          label: currentLabel,
          enabledValidationRules: selectedValidationRules,
        })
      );
    }
  };

  // Handles changes in dynamic validation rule selections
  const handleValidationRuleChange = (ruleName: string, enabled: boolean) => {
    if (enabled) {
      setSelectedValidationRules((prevRules) => [...prevRules, ruleName]);
    } else {
      setSelectedValidationRules((prevRules) =>
        prevRules.filter((rule) => rule !== ruleName)
      );
    }
  };

  return (
    <FormBuilderContainer>
      <FormBuilderHeader variant="h4" gutterBottom>
        Form Builder
      </FormBuilderHeader>
      <Grid container spacing={2}>
        {/* Field type dropdown */}
        <Grid item xs={12}>
          <Dropdown
            label="Choose a field type"
            value={currentType}
            onChange={(type) => setCurrentType(type)}
            options={{
              Number: FieldType.Number,
              String: FieldType.String,
              Date: FieldType.Date,
              Boolean: FieldType.Boolean,
            }}
          />
        </Grid>
        {/* Input field for key */}
        <Grid item xs={12}>
          <InputField
            onChange={(value) => setCurrentKey(value)}
            label="Key"
            value={currentKey}
            fieldType={FieldType[currentType as keyof typeof FieldType]}
          />
        </Grid>
        {/* Input field for label */}
        <Grid item xs={12}>
          <InputField
            onChange={(value) => setCurrentLabel(value)}
            label="Label"
            value={currentLabel}
            fieldType={FieldType[currentType as keyof typeof FieldType]}
          />
        </Grid>
        {/* Checkbox to enable dynamic validation */}
        <Grid item xs={12}>
          <CheckboxContainer>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableDynamicValidation}
                  onChange={(event) =>
                    setEnableDynamicValidation(event.target.checked)
                  }
                />
              }
              label="Enable Dynamic Validation"
            />
          </CheckboxContainer>
        </Grid>
        {/* Dynamic validation rule checkboxes */}
        {enableDynamicValidation && (
          <Grid item xs={12}>
            <FormGroup>
              {Object.keys(validationRules).map((ruleName) => (
                <FormControlLabel
                  key={ruleName}
                  control={
                    <Checkbox
                      checked={selectedValidationRules.includes(ruleName)}
                      onChange={(event) =>
                        handleValidationRuleChange(
                          ruleName,
                          event.target.checked
                        )
                      }
                    />
                  }
                  label={ruleName}
                />
              ))}
            </FormGroup>
          </Grid>
        )}
        {/* "Add Field" button */}
        <Grid item xs={12}>
          <AddFieldButton
            variant="contained"
            color="primary"
            onClick={handleAddingField}
            disabled={!currentType || !currentKey || !currentLabel}
          >
            Add Field
          </AddFieldButton>
        </Grid>
      </Grid>
    </FormBuilderContainer>
  );
};
