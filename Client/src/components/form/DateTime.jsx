import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";

function DateTime({
  label = "Date",
  inputFormat = "dd/MMM/yyyy hh:mm aa",
  value,
  setValue,
  minDate,
}) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label={label}
          inputFormat={inputFormat}
          disableMaskedInput
          disablePast
          value={value}
          minDateTime={minDate || new Date()}
          onChange={(e) => {
            setValue(e);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
}

export default DateTime;
