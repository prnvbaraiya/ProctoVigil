import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
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

function Register() {
  const roles = useFormInput("");
  const fname = useFormInput("");
  const lname = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const cnfPassword = useFormInput("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
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
    console.log(res);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          xs=8
        </Grid>
        <Grid item xs={6}>
          <Typography textAlign="center" m={3}>
            Register
          </Typography>
          <form>
            <Stack spacing={3} m={1}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Who are you ?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  {...roles}
                >
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="teacher"
                    control={<Radio />}
                    label="Teacher"
                  />
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                </RadioGroup>
              </FormControl>
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
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default Register;
