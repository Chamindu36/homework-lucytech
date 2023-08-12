import styled from "styled-components";
import { RootState } from "../store/config";
import { useDispatch, useSelector } from "react-redux";
import { FieldType, setValue } from "../store/form";
import { InputField } from "./fields/InputField";
import { CheckboxField } from "./fields/CheckboxField";
import { DateField } from "./fields/DateField";
import { Grid, Typography } from "@mui/material";

const FormViewContainer = styled.div`
  width: 300px;
  margin: auto;
`;

const FormViewHeader = styled(Typography)`
  margin-bottom: 1rem;
`;

// Component responsible for rendering the form preview
export const FormView = () => {
  const { fields } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  // Function to render different types of fields
  const renderFields = () => {
    const renderedFields = [];
    for (const key in fields) {
      const field = fields[key];
      const label = field.label;
      const onChange = (value: string) => dispatch(setValue({ key, value }));
      const value = field.value;
      const val = field.enabledValidationRules;

      switch (field.type) {
        case FieldType.Number:
        case FieldType.String:
          renderedFields.push(
            <Grid item xs={12} key={key}>
              <InputField
                label={label}
                onChange={onChange}
                value={value}
                fieldType={field.type}
                selectedValidationRules={val}
              />
            </Grid>
          );
          break;
        case FieldType.Boolean:
          renderedFields.push(
            <Grid item xs={12} key={key}>
              <CheckboxField label={label} onChange={onChange} value={value} />
            </Grid>
          );
          break;
        case FieldType.Date:
          renderedFields.push(
            <Grid item xs={12} key={key}>
              <DateField label={label} onChange={onChange} value={value} />
            </Grid>
          );
      }
    }

    return renderedFields;
  };

  return (
    <FormViewContainer>
      <FormViewHeader variant="h4" gutterBottom>
        Form Preview
      </FormViewHeader>
      <Grid container spacing={2}>
        {renderFields()}
      </Grid>
    </FormViewContainer>
  );
};
