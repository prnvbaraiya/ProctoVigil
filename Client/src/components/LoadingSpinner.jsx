import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

function LoadingSpinner({ loading }) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={loading}>
      <div>
        <CircularProgress color="inherit" />
      </div>
    </Backdrop>
  );
}

export default LoadingSpinner;
