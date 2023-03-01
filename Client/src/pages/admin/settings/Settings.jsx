import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import AlertDialogBox from "../../../components/AlertDialogBox";
import auth from "../../../auth/auth";
import { Link, useNavigate } from "react-router-dom";
import { UserService } from "../../../services/ServerRequest";
import TextBox from "../../../components/form/TextBox";
import { useFormInput } from "../../../hooks/useFormInput";

function Settings() {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [data, setData] = useState({});
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const email = useFormInput("");

  const getData = async () => {
    const res = await UserService.find({ email: auth.email });
    const resData = res.data[0];
    setData(resData);
    firstName.onChange(resData.firstName);
    lastName.onChange(resData.lastName);
    email.onChange(resData.email);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteSuccess = async () => {
    const res = await UserService.delete({ email: auth.email });
    auth.logout();
    if (res.status === 202) {
      navigate("/");
    } else {
      alert("User Delte Err: ", res.data);
    }
  };

  const handleSaveSuccess = async () => {
    const dataTmp = {
      ...data,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    };
    const res = await UserService.update(dataTmp);
    if (res.status === 202) setSaveOpen(false);
    else alert("There is Some Error!");
  };

  return (
    <>
      <Box>
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
