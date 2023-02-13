import { Box, Grid } from "@mui/material";
import React from "react";

import ExamHeader from "../components/ExamHeader";
import QuestionNavigation from "../components/QuestionNavigation";

function ExamLayout(props) {
  const { children } = props;

  return (
    <>
      <Box>
        <Box>
          <ExamHeader />
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={9}>
              {children}
            </Grid>
            <Grid item xs={3}>
              <Box
                component="main"
                sx={{
                  borderLeft: "2px solid black",
                  overflowY: "scroll",
                  height: "calc(100vh - 65px)",
                }}
              >
                <QuestionNavigation />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default ExamLayout;
