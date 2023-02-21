import { FormControl, TextField } from "@mui/material";
import React from "react";

function TextBox({
  label = "lebel",
  type = "text",
  variant = "outlined",
  fullWidth = true,
  multiline = false,
  rows = 2,
  ...props
}) {
  return (
    <>
      <FormControl fullWidth={fullWidth}>
        <TextField
          id="outlined-basic"
          type={type}
          label={label}
          variant={variant}
          multiline={multiline}
          rows={rows}
          {...props}
        />
      </FormControl>
    </>
  );
}

export default TextBox;
