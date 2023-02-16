import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";

function DateTime({
  label = "Date",
  inputFormat = "dd/MMM/yyyy hh:mm aa",
  ...props
}) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label={label}
          inputFormat={inputFormat}
          disableMaskedInput
          disablePast
          {...props}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
}

export default DateTime;
