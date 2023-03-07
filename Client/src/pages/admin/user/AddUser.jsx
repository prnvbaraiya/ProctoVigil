import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RadioButton from "../../../components/form/RadioButton";
import TextBox from "../../../components/form/TextBox";
import { useFormInput } from "../../../hooks/useFormInput";
import { UserService } from "../../../services/ServerRequest";
import { userRoles } from "../../../variables/Data";

function AddUser() {
  const roles = useFormInput("student");
  const username = useFormInput("");
  const fname = useFormInput("");
  const lname = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const cnfPassword = useFormInput("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      username: username.value,
      roles: roles.value,
      firstName: fname.value,
      lastName: lname.value,
      email: email.value,
      password: password.value,
    };
    const res = await UserService.set(data);
    if (res.status === 202) {
      navigate("..");
    } else {
      alert("Server Error While Creating Account! Tey Again Later");
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="..">
          <Button color="error" variant="contained">
            Cancel
          </Button>
        </Link>
        <Typography variant="h6">Add User</Typography>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </Box>
      <Divider sx={{ margin: "10px" }} />
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
    </Box>
  );
}

export default AddUser;
