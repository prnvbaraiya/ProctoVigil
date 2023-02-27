import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { UserService } from "../../../services/ServerRequest";

function ViewUser() {
  const getData = async () => {
    const res = await UserService.get();
    console.log(res.data);
  };

  useEffect(() => {
    getData();
  }, []);
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

export default ViewUser;
