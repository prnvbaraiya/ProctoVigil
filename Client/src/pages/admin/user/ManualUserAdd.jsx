import { Stack } from "@mui/material";
import React from "react";
import { RadioButton, TextBox } from "../../../components/index";

function ManualUserAdd({
  userRoles,
  roles,
  username,
  fname,
  lname,
  email,
  password,
  cnfPassword,
}) {
  return (
    <form>
      <Stack spacing={3}>
        <RadioButton
          row={true}
          title="Select Role"
          items={userRoles}
          {...roles}
        />
        <TextBox label="Username" {...username} />
        <Stack
          spacing={{ sm: 3 }}
          direction={{ lg: "row", sm: "column" }}
          sx={{ justifyContent: "space-between" }}
        >
          <TextBox label="First Name" {...fname}></TextBox>
          <TextBox label="Last Name" {...lname}></TextBox>
        </Stack>
        <TextBox label="E-mail" type="email" {...email}></TextBox>
        <TextBox label="Password" type="password" {...password}></TextBox>
        <TextBox
          label="Confirm Password"
          type="password"
          {...cnfPassword}
        ></TextBox>
      </Stack>
    </form>
  );
}

export default ManualUserAdd;
