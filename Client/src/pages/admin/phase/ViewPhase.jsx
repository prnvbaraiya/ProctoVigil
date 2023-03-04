import { Box, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { quizPhase } from "../../../variables/Data";
import BasicTable from "../../../components/form/BasicTable";
import SnackbarDisplay from "../../../components/SnackbarDisplay";
import { QuizService } from "../../../services/ServerRequest";
import { Link } from "react-router-dom";

function ViewPhase() {
  const [data, setData] = useState([]);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleDelete = async (id) => {
    const res = await QuizService.delete({ id });
    if (res.status === 202) {
      setDeleteDialogBox(false);
      setSnackbarData({
        open: true,
        message: res.data.message,
      });
    } else {
      alert("There is some error try again after some time");
    }
  };

  const columns = [
    { field: "_id", headerName: "Id", width: 50 },
    { field: "name", headerName: "Name", width: 100 },
    {
      field: "phase",
      headerName: "Phase",
      width: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <Typography>
            {quizPhase.map((item) => item.value === row.phase && item.title)}
          </Typography>
        );
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
          </>
        );
      },
    },
  ];

  const hideColumns = ["_id"];

  const getData = async () => {
    const res = await QuizService.get();
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
          <Typography variant="h6">Change Phase</Typography>
          <Box></Box>
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

export default ViewPhase;
