import ValidatedTextField from "./ValidatedTextField";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React from "react";

export default function ValidatedPasswordField({ field, form, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false)
  const handlePasswordIconButtonClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ValidatedTextField
      field={field}
      form={form}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handlePasswordIconButtonClick}>
              {showPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  )
};
