import { Box, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasicTable from "../../../components/form/BasicTable";
import { UserService } from "../../../services/ServerRequest";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ViewUser() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await UserService.get();
    setData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { field: "_id", headerName: "Id", width: 50 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        const row = params.row;
        return <Typography>{row.firstName + " " + row.lastName}</Typography>;
      },
    },
    { field: "email", headerName: "E-mail", width: 250 },
    { field: "roles", headerName: "Roles" },

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
            <IconButton
              onClick={() => {
                setDeleteId(row._id);
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
          <Typography variant="h6">Student</Typography>
          <Box></Box>
        </Box>
        <Divider sx={{ margin: "10px 0 20px" }} />
        <Box textAlign="center">
          {" "}
          <BasicTable rows={data} columns={columns} hideColumns={hideColumns} />
        </Box>
      </Box>
    </>
  );
}

export default ViewUser;
