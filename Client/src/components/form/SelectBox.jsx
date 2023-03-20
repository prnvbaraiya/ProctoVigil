import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function SelectBox({ label = "label", menuItems = [], ...others }) {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select label={label} {...others}>
          {menuItems.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectBox;
