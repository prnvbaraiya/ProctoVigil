import { FormControl, TextField } from "@mui/material";
import React from "react";

function TextBox({
  label = "lebel",
  type = "text",
  variant = "outlined",
  fullWidth = true,
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
          {...props}
        />
      </FormControl>
    </>
  );
}

export default TextBox;
