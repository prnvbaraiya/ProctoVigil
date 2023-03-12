import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useFormInput } from "../../../hooks/useFormInput";
import BasicTable from "../../../components/form/BasicTable";
import { QuizResultService } from "../../../services/ServerRequest";

function ViewResult() {
  const [rows, setRows] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const selectedQuiz = useFormInput("");
  const [totalMarks, setTotalMarks] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await QuizResultService.get();
      const arr = res.data.map((item) => item.QuizId);
      setQuizzes(arr);
      selectedQuiz.onChange(arr[0]._id);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log("LOl");
    handleGetStudent();
  }, [selectedQuiz.value]);

  const handleGetStudent = async () => {
    if (selectedQuiz.value !== "") {
      const res = await QuizResultService.getById(selectedQuiz.value);
      setRows(res.data.students);
      setTotalMarks(res.data.totalMarks);
    }
  };

  const handleSendMail = async () => {
    if (selectedQuiz.value !== "") {
      const res = await QuizResultService.sendMail({
        QuizId: selectedQuiz.value,
      });
      console.log(res);
    }
  };

  const columns = [
    { field: "_id", headerName: "Id", width: 50 },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      renderCell: (params) => params.row.user.username,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        const row = params.row;
        return (
          <Typography>
            {row.user.firstName + " " + row.user.lastName}
          </Typography>
        );
      },
    },
    {
      field: "obtainedMarks",
      headerName: "Obtained Marks",
      width: 200,
    },
    {
      field: "totalMarks",
      headerName: "Total Marks",
      width: 150,
      renderCell: (params) => {
        return params.row.answerKey.length;
      },
    },
  ];

  const hideColumns = ["_id"];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box></Box>
        <Typography variant="h6">Results</Typography>
        <Box></Box>
      </Box>
      <Divider sx={{ margin: "10px 0 20px" }} />
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quiz</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Quiz"
              {...selectedQuiz}
            >
              {quizzes.map((item) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={handleGetStudent}>
            Get Student
          </Button>
          {selectedQuiz.value && (
            <Button
              sx={{ marginLeft: 3 }}
              variant="contained"
              color="success"
              onClick={handleSendMail}
            >
              Send Result Mail
            </Button>
          )}
        </Grid>
      </Grid>
      <Box textAlign="center">
        {selectedQuiz.value !== "" && (
          <BasicTable rows={rows} columns={columns} hideColumns={hideColumns} />
        )}
      </Box>
    </Box>
  );
}

export default ViewResult;
