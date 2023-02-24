import React, { useState } from "react";
import { Button } from "@mui/material";
import AlertDialogBox from "../../../components/AlertDialogBox";
import axios from "axios";
import { SERVER_LINK } from "../../../variables/constants";
import auth from "../../../auth/auth";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = async () => {
    const res = await axios.post(SERVER_LINK + "delete", {
      email: auth.email,
    });
    auth.logout();
    if (res.status === 202) {
      navigate("/");
    } else {
      alert("User Delte Err: ", res.data);
    }
  };

  return (
    <div>
      <AlertDialogBox
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleSuccess={handleSuccess}
        title={"Are you sure you want to delte account"}
        data={
          "After You delete your account all the quiz you created will be delted permanatntly are you really sure about that?"
        }
      />
      <Button
        variant="contained"
        onClick={() => setDeleteOpen(true)}
        color="error"
      >
        Delete Account
      </Button>
    </div>
  );
}

export default Settings;
