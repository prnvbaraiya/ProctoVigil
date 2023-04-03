import { FormControl, TextField, styled } from "@mui/material";
import React from "react";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "blue",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "blue",
    },
  },
});

function CustomTextBox({
  fullWidth = true,
  multiline = false,
  rows = 2,
  label = "label",
  ...others
}) {
  return (
    <FormControl fullWidth={fullWidth}>
      <CssTextField
        label={label}
        multiline={multiline}
        rows={rows}
        {...others}
      />
    </FormControl>
  );
}

export default CustomTextBox;
