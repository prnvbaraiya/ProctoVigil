import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import {
  AlertDialogBox,
  SnackbarDisplay,
  TextBox,
} from "../../../components/index";
import auth from "../../../auth/auth";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../../services/ServerRequest";
import { useFormInput } from "../../../hooks/useFormInput";

function Settings() {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [data, setData] = useState({});
  const username = useFormInput("");
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const email = useFormInput("");
  const [snackbarData, setSnackbarData] = React.useState({
    open: false,
    message: "",
    type: "success",
    vertical: "top",
    horizontal: "right",
  });

  useEffect(() => {
    const getData = async () => {
      const res = await UserService.find({ username: auth.username });
      const resData = res.data[0];
      setData(resData);
      username.onChange(resData.username);
      firstName.onChange(resData.firstName);
      lastName.onChange(resData.lastName);
      email.onChange(resData.email);
    };
    getData();
  }, []);

  const handleDeleteSuccess = async () => {
    const res = await UserService.delete({ username: auth.username });
    auth.logout();
    if (res.status === 202) {
      navigate("/");
    } else {
      alert("User Delte Err: ", JSON.stringify(res));
    }
  };

  const handleSaveSuccess = async () => {
    const dataTmp = {
      ...data,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    };
    const res = await UserService.update(dataTmp);
    if (res.status === 202) {
      setSnackbarData((prev) => {
        return {
          ...prev,
          open: true,
          message: "Profile Updated Successfully",
          type: "success",
        };
      });
      setSaveOpen(false);
    } else alert("There is Some Error!");
  };

  return (
    <>
      <Box>
        {" "}
        <SnackbarDisplay
          snackbarData={snackbarData}
          setSnackbarData={setSnackbarData}
        />
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box></Box>
          <Typography variant="h6">Edit Profile</Typography>
          <Box></Box>
        </Box>
        <Divider sx={{ margin: "10px" }} />
        {/* Body  */}
        <form>
          <Stack spacing={3}>
            <TextBox label="Username" {...username} />
            <Stack
              spacing={{ sm: 3 }}
              direction={{ lg: "row", sm: "column" }}
              sx={{ alignItems: "center" }}
            >
              <TextBox label="First Name" {...firstName} />
              <TextBox label="Last Name" {...lastName} />
            </Stack>
            <TextBox label="Email" {...email} />
            <Stack
              spacing={{ sm: 3 }}
              direction={{ lg: "row", sm: "column" }}
              sx={{ alignItems: "center" }}
            >
              <Button
                variant="contained"
                onClick={() => setDeleteOpen(true)}
                color="error"
              >
                Delete Account
              </Button>
              <Button
                variant="contained"
                onClick={() => setSaveOpen(true)}
                color="secondary"
              >
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
      <AlertDialogBox
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleSuccess={handleDeleteSuccess}
        title={"Are you sure you want to delte account"}
        data={
          "After You delete your account all the quiz you created will be delted permanatntly are you really sure about that?"
        }
      />
      <AlertDialogBox
        open={saveOpen}
        setOpen={setSaveOpen}
        handleSuccess={handleSaveSuccess}
        title={"Are you sure you want to save changes"}
        data={"Once You agree Changes will be done permanantly Are you Sure ?"}
      />
    </>
  );
}

export default Settings;
