import { Stack } from "@mui/material";
import React from "react";
import { TextBox } from "../../../components";

function ERPUserAdd({ erpLink }) {
  return (
    <div>
      <Stack
        spacing={{ sm: 3 }}
        direction={{ lg: "row", sm: "column" }}
        sx={{ justifyContent: "space-between" }}
      >
        <TextBox label="ERP Link" {...erpLink}></TextBox>
      </Stack>
    </div>
  );
}

export default ERPUserAdd;
