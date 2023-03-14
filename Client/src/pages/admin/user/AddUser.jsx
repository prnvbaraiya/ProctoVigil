import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RadioButton from "../../../components/form/RadioButton";
import TextBox from "../../../components/form/TextBox";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useFormInput } from "../../../hooks/useFormInput";
import { UserService } from "../../../services/ServerRequest";
import { userRoles } from "../../../variables/Data";

function AddUser() {
  const [loading, setLoading] = useState(false);
  const roles = useFormInput("student");
  const username = useFormInput("");
  const fname = useFormInput("");
  const lname = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const cnfPassword = useFormInput("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      username: username.value,
      roles: roles.value,
      firstName: fname.value,
      lastName: lname.value,
      email: email.value,
      password: password.value,
    };
    try {
      const res = await UserService.set(data);
      if (res.status === 202) {
        const state = {
          open: true,
          message: res.data,
          type: "success",
        };
        navigate("/admin/user", { state });
      } else {
        alert("Server Error While Creating Account! Tey Again Later");
      }
    } catch (err) {
      alert("Server Error While Creating Account! Tey Again Later");
    }
    setLoading(false);
  };

  return (
    <Box>
      {/* Header */}
      <LoadingSpinner loading={loading} />
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
