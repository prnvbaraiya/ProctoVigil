import { Box, Button, Divider, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasicTable from "../../components/form/BasicTable";
import { SERVER_LINK } from "../../variables/constants";
import AdminLayout from "../AdminLayout";

function Quiz() {
  const [data, setData] = useState([]);

  const columns = [
    { field: "_id", headerName: "Id", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    { field: "description", headerName: "Description", width: 220 },
  ];

  const hideColumns = ["_id"];

  const getData = async () => {
    const res = await axios.get(SERVER_LINK + "/quizzes");
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AdminLayout>
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
    </AdminLayout>
  );
}

export default Quiz;
