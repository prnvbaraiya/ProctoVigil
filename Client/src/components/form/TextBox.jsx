import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";

function TextBox({
  label = "label",
  type = "text",
  variant = "outlined",
  fullWidth = true,
  multiline = false,
  rows = 2,
  disabled = false,
  ...props
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <FormControl fullWidth={fullWidth}>
        <TextField
          type={showPassword ? "text" : type}
          label={label}
          variant={variant}
          multiline={multiline}
          rows={rows}
          disabled={disabled}
          autoComplete="on"
          {...props}
          InputProps={
            type === "password"
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : {}
          }
        />
      </FormControl>
    </>
  );
}

export default TextBox;
