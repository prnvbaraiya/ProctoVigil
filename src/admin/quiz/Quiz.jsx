import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../AdminLayout";

function Quiz() {
  return (
    <AdminLayout>
      {/*Container */}
      <Box>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box></Box>
          <Typography variant="h6">Quiz</Typography>
          <Box>
            <Link to="add">
              <Button variant="contained">Add Quiz</Button>
            </Link>
          </Box>
        </Box>
        <Divider sx={{ margin: "10px 0 20px" }} />
        {/* Body  */}
        <Box textAlign="center">Its Content of Quiz Page</Box>
      </Box>
    </AdminLayout>
  );
}

export default Quiz;
