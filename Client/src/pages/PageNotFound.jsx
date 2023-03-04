import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <center>
      <Typography variant="h3">
        Page Not Found Go back <Link to="/">Home</Link>
      </Typography>
    </center>
  );
}

export default PageNotFound;
