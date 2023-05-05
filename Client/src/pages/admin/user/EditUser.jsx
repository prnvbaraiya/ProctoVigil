import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  TextBox,
  RadioButton,
} from "../../../components/index";
import { useFormInput } from "../../../hooks/useFormInput";
import { UserService } from "../../../services/ServerRequest";
import { userRoles } from "../../../common/Data";

function EditUser() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { id } = location.state;
  const roles = useFormInput("student");
  const username = useFormInput("");
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const email = useFormInput("");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await UserService.find({ _id: id });
      const resData = res.data[0];
      roles.onChange(resData.roles);
      username.onChange(resData.username);
      firstName.onChange(resData.firstName);
      lastName.onChange(resData.lastName);
      email.onChange(resData.email);
      setLoading(false);
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const dataTmp = {
      _id: id,
      roles: roles.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    };
    const res = await UserService.update(dataTmp);
    if (res.status === 202) {
      const state = {
        open: true,
        message: res.data,
        type: "success",
      };
      navigate("/admin/user", { state });
    } else {
      alert("There is Some error ", JSON.stringify(res));
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
        <Typography variant="h6">Update User</Typography>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Update
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
            <TextBox label="First Name" {...firstName}></TextBox>
            <TextBox label="Last Name" {...lastName}></TextBox>
          </Stack>
          <TextBox label="E-mail" type="email" {...email}></TextBox>
        </Stack>
      </form>
    </Box>
  );
}

export default EditUser;
