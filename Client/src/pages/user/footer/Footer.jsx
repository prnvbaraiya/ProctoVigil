import { Grid, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Grid
      container
      spacing={2}
      marginTop="10px"
      paddingBottom="30px"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Typography>
          All rights reserved. Copyright © 2023 by Procto Vigil Team.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;
