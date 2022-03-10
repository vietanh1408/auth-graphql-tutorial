import { FormControl, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface CustomInputProps {
  name: string;
  label?: string;
  disabled?: boolean;
  children?: () => JSX.Element;
}

const CustomInput: React.FC<CustomInputProps> = (props: CustomInputProps) => {
  const { control, errors } = useFormContext();

  const { name, label, disabled, children } = props;

  const hasError = errors[name];

  return (
    <React.Fragment>
      <FormControl fullWidth margin="normal" variant="outlined">
        <Controller
          name={name}
          control={control}
          as={children ?? TextField}
          variant="outlined"
          margin="normal"
          fullWidth
          label={label}
          disabled={disabled}
          error={!!hasError}
          //   helperText={hasError?.message}
        />
        <div className="error-message">{hasError?.message}</div>
      </FormControl>
    </React.Fragment>
  );
};

export default CustomInput;
