import { Box, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { quizPhase } from "../../../common/Data";
import BasicTable from "../../../components/form/BasicTable";
import { QuizService,UserService } from "../../../services/ServerRequest";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner";
import auth from "../../../auth/auth";


function ViewPhase() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
    const userData = await UserService.find({ username: auth.username });
    const filteredTests = [];
    res.data.map((test) => {
      if (test.author._id == userData.data[0]._id) filteredTests.push(test);
    });
    setData(filteredTests);
  };

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  return (
    <>
      <Box>
        <LoadingSpinner loading={loading} />
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
          {!loading && (
            <BasicTable
              rows={data}
              columns={columns}
              hideColumns={hideColumns}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

export default ViewPhase;
