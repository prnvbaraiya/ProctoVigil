import React from "react";
import {
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import TextBox from "../components/form/TextBox";
import { useFormInput } from "../hooks/useFormInput";
import axios from "axios";
import { SERVER_LINK } from "../variables/constants";
import { useNavigate } from "react-router-dom";
import side from "../assets/side.jpg";
import { Box } from "@mui/system";
import { userRoles } from "../variables/Data";
import RadioButton from "../components/form/RadioButton";

function Register() {
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
    const res = await axios.post(SERVER_LINK + "register", data);
    if (res.status === 202) {
      navigate("/login");
    } else {
      alert("Server Error While Creating Account! Tey Again Later");
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }} spacing={2}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${side})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography textAlign="center" m={3}>
              Register
            </Typography>
            <form>
              <Stack spacing={3} m={1}>
                <RadioButton
                  row={true}
                  title="Who are You ?"
                  items={userRoles}
                  {...roles}
                />
                <TextBox
                  label={roles.value === "student" ? "Id Number" : "User Name"}
                  {...username}
                />
                <Stack
                  spacing={{ sm: 3 }}
                  direction={{ lg: "row", sm: "column" }}
                  sx={{ justifyContent: "space-between" }}
                >
                  <TextBox label="First Name" {...fname}></TextBox>
                  <TextBox label="Last Name" {...lname}></TextBox>
                </Stack>
                <TextBox label="E-mail" type="email" {...email}></TextBox>
                <TextBox
                  label="Password"
                  type="password"
                  {...password}
                ></TextBox>
                <TextBox
                  label="Confirm Password"
                  type="password"
                  {...cnfPassword}
                ></TextBox>
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Register;
