import { Box, Divider, Typography } from "@mui/material";
import React from "react";

function User() {
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box></Box>
          <Typography variant="h6">Student</Typography>
          <Box></Box>
        </Box>
        <Divider sx={{ margin: "10px 0 20px" }} />
        <Box textAlign="center">Table</Box>
      </Box>
    </>
  );
}

export default User;
