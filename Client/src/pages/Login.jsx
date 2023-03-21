import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { SERVER_LINK } from "../common/constants";
import auth from "../auth/auth";
import side from "../assets/side.jpg";
import SnackbarDisplay from "../components/SnackbarDisplay";
import LoadingSpinner from "../components/LoadingSpinner";

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const from = location.state?.from?.pathname;
  const [snackbarData, setSnackbarData] = React.useState({
    open: false,
    message: "",
    type: "success",
    vertical: "top",
    horizontal: "left",
  });

  //Handle Form Submit
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
      rememberMe: formData.get("rememberMe") !== null,
    };
    try {
      const res = await axios.post(SERVER_LINK + "login", data);
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: res.data,
        type: "success",
      });
      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      auth.authenticate(accessToken);
      const state = {
        open: true,
        message: "Login Successfull",
        type: "success",
      };
      if (roles === "admin") {
        navigate(from || "/admin/dashboard", { state }, { replace: true });
      } else if (roles === "student") {
        navigate(from || "/", { state }, { replace: true });
      } else if (roles === "teacher") {
        navigate(from || "/", { state }, { replace: true });
      }
    } catch (err) {
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: err.response.data,
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <LoadingSpinner loading={loading} />
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={0}
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
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username or RollNo"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      name="rememberMe"
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <SnackbarDisplay
        snackbarData={snackbarData}
        setSnackbarData={setSnackbarData}
      />
    </>
  );
}
