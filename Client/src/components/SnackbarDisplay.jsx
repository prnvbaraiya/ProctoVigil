import { Alert, Snackbar } from "@mui/material";
import React from "react";

function SnackbarDisplay({ snackbarData, setSnackbarData }) {
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarData({ open: false, message: "", type: "success" });
  };
  return (
    <>
      <Snackbar
        open={snackbarData.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarData.type}
          sx={{ width: "100%" }}
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SnackbarDisplay;
