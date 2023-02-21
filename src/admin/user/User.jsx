import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../AdminLayout";

function User() {
  return (
    <AdminLayout>
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
    </AdminLayout>
  );
}

export default User;
