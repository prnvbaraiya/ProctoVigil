import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

function RadioButton({ title, items, row = false, ...others }) {
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <RadioGroup row={row} {...others}>
        {items &&
          items.map((item) => {
            return (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio />}
                label={item.title}
              />
            );
          })}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButton;
