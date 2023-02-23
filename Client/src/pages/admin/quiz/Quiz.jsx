import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasicTable from "../../../components/form/BasicTable";
import { SERVER_LINK } from "../../../variables/constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SnackbarDisplay from "../../../components/SnackbarDisplay";

function Quiz() {
  const [data, setData] = useState([]);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleDelete = async (id) => {
    const res = await axios.post(SERVER_LINK + "quiz/delete/" + id);
    console.log(res);
    if (res.status === 202) {
      setSnackbarData({
        open: true,
        message: res.data.message,
        type: res.data.type,
      });
    } else {
      alert("There is some error try again after some time");
    }
  };

  const columns = [
    { field: "_id", headerName: "Id", width: 50 },
    { field: "name", headerName: "Name", width: 220 },
    { field: "description", headerName: "Description", width: 220 },
    { field: "personName", headerName: "Students", width: 220 },
    {
      field: "numberOfQuestions",
      headerName: "No. of Questions",
      renderCell: (params) => {
        const row = params.row;
        return <Typography>{row.questions.length}</Typography>;
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
              component={Link}
              to={"edit"}
              state={{ id: row._id }}
              color="primary"
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(row._id)} color="error">
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const hideColumns = ["_id"];

  const getData = async () => {
    const res = await axios.get(SERVER_LINK + "/quizzes");
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, [snackbarData]);

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box></Box>
          <Typography variant="h6">Quiz</Typography>
          <Box>
            <Link to="add">
              <Button variant="contained">Add Quiz</Button>
            </Link>
          </Box>
        </Box>
        <Divider sx={{ margin: "10px 0 20px" }} />
        <Box textAlign="center">
          <BasicTable rows={data} columns={columns} hideColumns={hideColumns} />
        </Box>
      </Box>
      <SnackbarDisplay
        snackbarData={snackbarData}
        setSnackbarData={setSnackbarData}
      />
    </>
  );
}

export default Quiz;
