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
  readOnly = false,
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
          InputProps={{
            readOnly,
            endAdornment:
              type === "password" ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : (
                <></>
              ),
          }}
        />
      </FormControl>
    </>
  );
}

export default TextBox;
