import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function SelectBox({
  label = "label",
  menuItems = [],
  fullWidth = true,
  ...others
}) {
  return (
    <>
      <FormControl fullWidth={fullWidth} sx={{ minWidth: "150px" }}>
        <InputLabel>{label}</InputLabel>
        <Select label={label} {...others}>
          {menuItems &&
            menuItems.map((item) => {
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
