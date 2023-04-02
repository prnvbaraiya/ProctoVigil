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
import { QuizResultService } from "../../../services/ServerRequest";
import {
  AlertDialogBox,
  SnackbarDisplay,
  LoadingSpinner,
  BasicTable,
} from "../../../components/index";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function ViewResult() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const selectedQuiz = useFormInput("");
  const [totalMarks, setTotalMarks] = useState("");
  const [deleteDialogBox, setDeleteDialogBox] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    type: "success",
    vertical: "top",
    horizontal: "right",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading((prev) => !prev);
    const getData = async () => {
      const res = await QuizResultService.get();
      if (res.data.length > 0) {
        const arr = res.data.map((item) => item.quiz_id);
        setQuizzes(arr);
        selectedQuiz.onChange(arr[0]._id);
      }
    };
    getData();
    setLoading((prev) => !prev);
  }, []);

  useEffect(() => {
    setLoading((prev) => !prev);
    handleGetStudent();
    setLoading((prev) => !prev);
  }, [snackbarData]);

  const handleGetStudent = async () => {
    if (selectedQuiz.value !== "") {
      const res = await QuizResultService.getById(selectedQuiz.value);
      setRows(res.data.students);
      setTotalMarks(res.data.totalMarks);
    }
  };

  const handleSendMail = async () => {
    setLoading((prev) => !prev);
    if (selectedQuiz.value !== "") {
      await QuizResultService.sendMail({
        quiz_id: selectedQuiz.value,
      });
    }
    setLoading((prev) => !prev);
  };

  const handleDelete = async (id) => {
    const res = await QuizResultService.deleteUserResponse({
      quiz_id: selectedQuiz.value,
      _id: id,
    });
    if (res.status === 202) {
      setDeleteDialogBox(false);
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: res.data,
      });
    } else {
      alert("There is some error try again after some time");
    }
  };

  const handleGrading = (id) => {
    const state = {
      quiz_id: selectedQuiz.value,
      student_id: id,
    };
    navigate("gradding", { state });
  };

  const columns = [
    {
      field: "_id",
      headerName: "Id",
      type: "string",
      width: 50,
    },
    {
      field: "username",
      headerName: "Username",
      type: "string",
      width: 150,
      renderCell: (params) => params.row.user.username,
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
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
      field: "warningCount",
      headerName: "Total Warnings",
      type: "number",
      width: 120,
    },
    {
      field: "obtainedMarks",
      headerName: "Obtained Marks",
      type: "number",
      width: 120,
    },
    {
      field: "totalMarks",
      headerName: "Total Marks",
      type: "number",
      width: 150,
      valueGetter: () => totalMarks,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          label="delete"
          key={params.row.user._id}
          icon={<DeleteIcon />}
          onClick={() => {
            setDeleteId(params.row.user._id);
            setDeleteDialogBox(true);
          }}
          color="error"
        />,
        <GridActionsCellItem
          label="Start Grading"
          key={params.row.user._id}
          onClick={() => {
            handleGrading(params.row.user._id);
          }}
          showInMenu
        />,
      ],
    },
  ];

  const hideColumns = ["_id"];

  return (
    <Box>
      <AlertDialogBox
        open={deleteDialogBox}
        setOpen={setDeleteDialogBox}
        handleSuccess={() => handleDelete(deleteId)}
        title="Are you sure you want to delete"
        data="Deleting User's Response It is ireversible ?"
      />
      <LoadingSpinner loading={loading} />
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
        {!loading && selectedQuiz.value !== "" && rows.length > 0 && (
          <BasicTable rows={rows} columns={columns} hideColumns={hideColumns} />
        )}
      </Box>
      <SnackbarDisplay
        snackbarData={snackbarData}
        setSnackbarData={setSnackbarData}
      />
    </Box>
  );
}

export default ViewResult;
