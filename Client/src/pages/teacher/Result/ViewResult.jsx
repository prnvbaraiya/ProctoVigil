import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useFormInput } from "../../../hooks/useFormInput";
import BasicTable from "../../../components/form/BasicTable";
import { QuizResultService } from "../../../services/ServerRequest";
import LoadingSpinner from "../../../components/LoadingSpinner";
import AlertDialogBox from "../../../components/AlertDialogBox";
import DeleteIcon from "@mui/icons-material/Delete";
import SnackbarDisplay from "../../../components/SnackbarDisplay";

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

  useEffect(() => {
    setLoading((prev) => !prev);
    const getData = async () => {
      const res = await QuizResultService.get();
      // const arr = res.data.map((item) => item.QuizId);
      const arr = res.data;
      setQuizzes(arr);
      console.log(quizzes);
      selectedQuiz.onChange(arr[0]._id);
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
      const res = await QuizResultService.sendMail({
        QuizId: selectedQuiz.value,
      });
      console.log(res);
    }
    setLoading((prev) => !prev);
  };

  const handleDelete = async (id) => {
    const res = await QuizResultService.deleteUserResponse({
      quizId: selectedQuiz.value,
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
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <IconButton
              onClick={() => {
                setDeleteId(row.user._id);
                setDeleteDialogBox(true);
              }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
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
        {!loading && selectedQuiz.value !== "" && (
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
