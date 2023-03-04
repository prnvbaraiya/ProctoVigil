import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <center>
      <Typography variant="h3">
        Not Authorized Go back <Link to="/">Home</Link>
      </Typography>
    </center>
  );
}

export default Unauthorized;
