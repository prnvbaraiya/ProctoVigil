import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useFormInput } from "../../../hooks/useFormInput";
import auth from "../../../auth/auth";
import { UserService, InterviewService } from "../../../services/ServerRequest";
import {
  LoadingSpinner,
  SelectChip,
  DateTime,
  TextBox,
} from "../../../components/index";

function AddInterview() {
  const [loading, setLoading] = React.useState(false);
  const [studentNames, setStudentNames] = useState([]);
  const author = useFormInput(auth.username);
  const name = useFormInput("");
  const description = useFormInput("");
  const [startDate, setStartDate] = useState(new Date());
  const totalDuration = useFormInput(0);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentsData, setStudentsData] = useState([
    {
      user_id: "",
      interviewTime: "",
    },
  ]);
  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    const res = await UserService.getStudents();
    setStudentNames(
      res.data.map((item) => {
        return { title: item.username, value: item._id };
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      author: auth.username,
      name: name.value,
      description: description.value,
      totalDuration: totalDuration.value,
      startDate: startDate,
      studentNames: studentsData.map((selectedValue) => ({
        user_id: studentNames.find(
          (name) => name.title === selectedValue.username
        ).value,
        interviewTime: selectedValue.interviewTime,
      })),
    };

    const res = await InterviewService.set(data);
    if (res.status === 202) {
      const state = {
        open: true,
        message: res.data,
        type: "success",
      };
      navigate("/admin/interview", { state });
    } else {
      alert("There is Some error ", JSON.stringify(res));
    }
    setLoading(false);
  };

  const handleStudentInterview = (e, index) => {
    setStudentsData((prev) => {
      return prev.map((student, sIndex) =>
        sIndex === index
          ? {
              ...student,
              interviewTime: e,
            }
          : student
      );
    });
  };

  useEffect(() => {
    setStudentsData(
      selectedStudents.map((student) => ({
        user_id: "",
        username: student,
        interviewTime: new Date(),
      }))
    );
  }, [selectedStudents]);

  return (
    <>
      {/*Container */}
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
          <Typography variant="h6">Add Interview</Typography>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Save Interview
          </Button>
        </Box>

        <Divider sx={{ margin: "10px" }} />

        {/* Body  */}
        <form>
          <Stack spacing={3}>
            <TextBox label="Author" disabled={true} {...author} />
            <TextBox label="Name" {...name} />
            <TextBox label="Description" {...description} />
            <Stack
              spacing={{ sm: 3 }}
              direction={{ lg: "row", sm: "column" }}
              sx={{ justifyContent: "space-between" }}
            >
              <DateTime
                label="Start Date"
                value={startDate}
                setValue={setStartDate}
              />
              <TextBox
                label="Total Duration"
                fullWidth={false}
                {...totalDuration}
              />
            </Stack>
            <SelectChip
              label="Students"
              names={studentNames}
              studentNames={selectedStudents}
              setstudentNames={setSelectedStudents}
            />
            {studentsData.map((student, index) => (
              <Accordion
                key={index}
                sx={{ backgroundColor: "rgba(100, 116, 139, 0.12)" }}
              >
                <AccordionSummary expandIcon={<KeyboardArrowUpIcon />}>
                  <Typography variant="h6">{`${student.username}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack>
                    <Stack direction="row" spacing={3}>
                      <TextBox
                        label={`Student ${index + 1} Name`}
                        value={student.username}
                        disabled
                        fullWidth={false}
                      />
                      <DateTime
                        label="Start Date"
                        value={student.interviewTime}
                        setValue={(r) => handleStudentInterview(r, index)}
                        minDate={startDate}
                      />
                    </Stack>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default AddInterview;
