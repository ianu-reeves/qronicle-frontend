import React from "react";
import {TextField} from "@mui/material";

export default function ValidatedTextField({ field, form, ...props }) {
  const { name } = field;
  const { errors, touched } = form;
  const replacement = name.replace(/[A-Z]/g, " $&");
  const camelCase = replacement.charAt(0).toUpperCase() + replacement.slice(1);
  const error = Boolean(errors[name]) && Boolean(touched[name]);


  if (form.status === 'duplicate-username') {
    errors.username = 'Username is already in use. Please try another.'
  }

  return (
    <TextField
      label={camelCase}
      id={name}
      error={error}
      helperText={error ? errors[name] : null}
      {...props}
      {...field}
    />
  );
};
