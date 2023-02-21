import {
  Box,
  Stack,
  Button,
  Divider,
  Typography,
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import TextBox from "../../components/form/TextBox";
import { useFormInput } from "../../hooks/useFormInput";
import AdminLayout from "../AdminLayout";

function EditUser() {
  const fname = useFormInput("");
  const lname = useFormInput("");
  const email = useFormInput("");
  const mobileNo = useFormInput("");
  const age = useFormInput("");
  const address = useFormInput("");
  const gender = useFormInput("");
  const percentage = useFormInput("");
  const department = useFormInput("");
  const collegeName = useFormInput("");
  const qualification = useFormInput("");
  const yearOfPassing = useFormInput("");
  const applicantType = useFormInput("");
  const familiarTechnologies = useFormInput("");
  const yearOfExp = useFormInput("");
  const pastExp = useFormInput("");
  const resume = useFormInput("");

  const handleSubmit = async () => {
    const data = {
      fname: fname.value,
      lname: lname.value,
    };
  };

  return (
    <>
      <AdminLayout>
        {" "}
        {/*Container */}
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
            <Typography variant="h6">Update User</Typography>
            <Button
              color="secondary"
              onClick={handleSubmit}
              variant="contained"
            >
              Update
            </Button>
          </Box>

          <Divider sx={{ margin: "10px" }} />

          {/* Body  */}
          <form>
            <Stack spacing={3}>
              <Stack
                spacing={{ sm: 3 }}
                direction={{ lg: "row", sm: "column" }}
                sx={{ justifyContent: "space-between" }}
              >
                <TextBox label="First Name" {...fname} />
                <TextBox label="Last Name" {...lname} />
              </Stack>
              <TextBox label="Email" {...email} />
              <Stack
                spacing={{ sm: 3 }}
                direction={{ lg: "row", sm: "column" }}
                sx={{ justifyContent: "space-between" }}
              >
                <TextBox label="Mobile" {...mobileNo} />
                <TextBox label="Age" {...age} />
              </Stack>
              <TextBox label="Address" multiline={true} rows={4} {...address} />
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </form>
        </Box>
      </AdminLayout>
    </>
  );
}

export default EditUser;
