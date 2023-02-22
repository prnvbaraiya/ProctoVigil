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
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
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
  // const gender = useFormInput("");
  const [gender, setGender] = useState("");
  const percentage = useFormInput("");
  const department = useFormInput("");
  const collegeName = useFormInput("");
  const qualification = useFormInput("");
  const yearOfPassing = useFormInput("");
  // const applicantType = useFormInput("");
  const [applicantType, setApplicantType] = useState("");
  const familiarTechnologies = useFormInput("");
  const yearOfExp = useFormInput("");
  const pastExp = useFormInput("");
  const [resume, setResume] = useState("");

  const handleSubmit = async () => {
    const data = {
      fname: fname.value,
      lname: lname.value,
    };
    console.log(data);
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
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
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
              <Stack
                spacing={{ sm: 3 }}
                direction={{ lg: "row", sm: "column" }}
                sx={{ justifyContent: "space-between" }}
              >
                <TextBox label="Percentage" {...percentage} fullWidth={false} />
              </Stack>
              <TextBox label="department" {...department} />
              <Stack
                spacing={{ sm: 3 }}
                direction={{ lg: "row", sm: "column" }}
                sx={{ justifyContent: "space-between" }}
              >
                <TextBox label="College Name" {...collegeName} />
                <TextBox label="Qualification" {...qualification} />
              </Stack>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  {...yearOfPassing}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <TextBox
                label="Familiar Technologies"
                multiline={true}
                rows={4}
                {...familiarTechnologies}
              />
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Applicant Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={applicantType}
                  onChange={(e) => setApplicantType(e.target.value)}
                >
                  <FormControlLabel
                    value="fresher"
                    control={<Radio />}
                    label="Fresher"
                  />
                  <FormControlLabel
                    value="experience"
                    control={<Radio />}
                    label="Experience"
                  />
                </RadioGroup>
              </FormControl>
              <Stack
                spacing={{ sm: 3 }}
                direction={{ lg: "row", sm: "column" }}
                sx={{ justifyContent: "space-between" }}
              >
                <TextBox label="Year Of Experince" {...yearOfExp} />
                <TextBox
                  label="Past Experince Technologies"
                  multiline={true}
                  rows={4}
                  {...pastExp}
                />
              </Stack>
              <Button variant="contained" component="label">
                Upload Resume
                <input
                  type="file"
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  hidden
                />
              </Button>
              <Typography>{resume}</Typography>
            </Stack>
          </form>
        </Box>
      </AdminLayout>
    </>
  );
}

export default EditUser;
