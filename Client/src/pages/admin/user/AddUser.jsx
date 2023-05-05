import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import { LoadingSpinner, SelectBox } from "../../../components/index";
import { useFormInput } from "../../../hooks/useFormInput";
import { UserService } from "../../../services/ServerRequest";
import { SUCCESS_CODE, userRoles } from "../../../common/Data";
import ManualUserAdd from "./ManualUserAdd";
import CSVUserAdd from "./CSVUserAdd";
import ERPUserAdd from "./ERPUserAdd";
import axios from "axios";

function AddUser() {
  const [loading, setLoading] = useState(false);
  const inputMethods = useFormInput("");
  const roles = useFormInput("student");
  const username = useFormInput("");
  const fname = useFormInput("");
  const lname = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const cnfPassword = useFormInput("");
  const [csvFile, setCsvFile] = useState("");
  const erpLink = useFormInput("");
  const navigate = useNavigate();

  const inputMethodTypes = [
    { title: "Manual Add", value: "manual" },
    { title: "Using CSV", value: "csv" },
    { title: "ERP Integration", value: "erp" },
  ];

  const handleCsvUpload = async () => {
    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      const csvData = event.target.result;
      const parsedCsv = Papa.parse(csvData, { header: true }); // parse the CSV file
      const csvUsers = parsedCsv.data; // get the array of users from the parsed CSV
      const users = [];
      for (let i = 0; i < csvUsers.length; i++) {
        const user = csvUsers[i];
        if (
          !user.role ||
          !user.username ||
          !user.firstName ||
          !user.lastName ||
          !user.email ||
          !user.password
        ) {
          alert(`Invalid user data in row ${i + 1}`); // handle missing required fields in CSV
          return;
        }
        const data = {
          username: user.username,
          roles: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        };
        users.push(data);
      }
      try {
        const res = await UserService.setStudents(users);
        if (res.status === 202) {
          const state = {
            open: true,
            message: res.data,
            type: "success",
          };
          navigate("/admin/user", { state });
        } else {
          alert("Server Error While Creating Account! Try Again Later");
          console.log("ER:", res);
        }
      } catch (err) {
        console.log("ERRRR:", err);
        alert("Server Error While Creating Account! Try Again Later");
      }
    };
    fileReader.readAsText(csvFile); // read the selected CSV file
  };

  const handleManualUpload = async () => {
    const errors = [];
    if (username.value === "") {
      errors.push("Username is null");
    }
    if (fname.value === "") {
      errors.push("First Name is null");
    }
    if (lname.value === "") {
      errors.push("Last Name is null");
    }
    if (password.value === "") {
      errors.push("Password is null");
    }
    if (cnfPassword.value === "") {
      errors.push("Confirm Password is null");
    }
    if (cnfPassword.value !== password.value) {
      errors.push("Password and Confirm Password is not Same");
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

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
      if (res.status === SUCCESS_CODE) {
        const state = {
          open: true,
          message: res.data,
          type: "success",
        };
        navigate("/admin/user", { state });
      } else {
        alert("Server Error While Creating Account! Try Again Later");
      }
    } catch (err) {
      alert("Server Error While Creating Account! Try Again Later");
    }
  };

  const handleERPLink = async () => {
    try {
      const result = await axios.get(erpLink.value);
      try {
        const res = await UserService.setERPStudent(result.data);
        if (res.status === SUCCESS_CODE) {
          const state = {
            open: true,
            message: res.data,
            type: "success",
          };
          navigate("/admin/user", { state });
        } else {
          alert("Server Error While Creating Account! Try Again Later");
          return;
        }
      } catch (er) {
        console.log(er);
      }
    } catch (err) {
      alert("Please Enter Valid URL");
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    if (inputMethods.value == "csv") {
      handleCsvUpload();
    } else if (inputMethods.value == "manual") {
      handleManualUpload();
    } else if (inputMethods.value == "erp") {
      handleERPLink();
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
      <Stack
        spacing={{ sm: 3 }}
        direction={{ lg: "row", sm: "column" }}
        sx={{ justifyContent: "space-between", marginBottom: 3 }}
      >
        <SelectBox
          label="Input Methods"
          menuItems={inputMethodTypes}
          {...inputMethods}
        />
      </Stack>
      {inputMethods.value === "manual" && (
        <ManualUserAdd
          userRoles={userRoles}
          roles={roles}
          username={username}
          fname={fname}
          lname={lname}
          email={email}
          password={password}
          cnfPassword={cnfPassword}
        />
      )}
      {inputMethods.value === "csv" && (
        <CSVUserAdd setCsvFile={setCsvFile} csvFile={csvFile} />
      )}
      {inputMethods.value === "erp" && (
        <ERPUserAdd handleERPLink={handleERPLink} erpLink={erpLink} />
      )}
    </Box>
  );
}

export default AddUser;
