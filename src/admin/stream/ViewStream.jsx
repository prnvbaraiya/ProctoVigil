import { Typography } from "@mui/material";
import React from "react";
import AdminLayout from "../AdminLayout";
import video from "../../assets/pexels-thirdman-5538262.mp4";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";

function ViewStream() {
  const location = useLocation();
  const data = location.state;

  return (
    <AdminLayout>
      <Box align="center">
        <Typography variant="h3">View {data.student}</Typography>
        <video width="400" height="400" loop autoPlay controls>
          <source src={video} type="video/mp4" />
        </video>
      </Box>
    </AdminLayout>
  );
}

export default ViewStream;
