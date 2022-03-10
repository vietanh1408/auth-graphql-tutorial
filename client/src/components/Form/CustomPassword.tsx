import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface CustomPasswordProps {
  name: string;
  label?: string;
  disabled?: boolean;
  children?: () => JSX.Element;
}

const CustomPassword: React.FC<CustomPasswordProps> = (
  props: CustomPasswordProps
) => {
  const { control, errors } = useFormContext();

  const { name, label, disabled } = props;

  const hasError = errors[name];

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          label={label}
          as={OutlinedInput}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          disabled={disabled}
          error={!!hasError}
        />
        <div className="error-message">{hasError?.message}</div>
      </FormControl>
    </React.Fragment>
  );
};

export default CustomPassword;
