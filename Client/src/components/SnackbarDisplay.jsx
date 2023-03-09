import { Alert, Snackbar } from "@mui/material";
import React from "react";

function SnackbarDisplay({ snackbarData, setSnackbarData, ...others }) {
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarData({ ...snackbarData, open: false });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarData.vertical,
          horizontal: snackbarData.horizontal,
        }}
        open={snackbarData.open}
        autoHideDuration={5000}
        onClose={handleClose}
        {...others}
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
