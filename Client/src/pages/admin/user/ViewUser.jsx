import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasicTable from "../../../components/form/BasicTable";
import { UserService } from "../../../services/ServerRequest";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SnackbarDisplay from "../../../components/SnackbarDisplay";
import AlertDialogBox from "../../../components/AlertDialogBox";

function ViewUser() {
  const [data, setData] = useState([]);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [deleteDialogBox, setDeleteDialogBox] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await UserService.get();
      setData(res.data);
    };
    getData();
  }, [snackbarData]);

  const handleDelete = async (id) => {
    const res = await UserService.delete({ _id: id });
    if (res.status === 202) {
      setDeleteDialogBox(false);
      setSnackbarData({
        open: true,
        message: res.data,
      });
    } else {
      alert("There is some error try again after some time");
    }
  };

  const columns = [
    { field: "_id", headerName: "Id", width: 50 },
    { field: "username", headerName: "Username", width: 150 },
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
        <AlertDialogBox
          open={deleteDialogBox}
          setOpen={setDeleteDialogBox}
          handleSuccess={() => handleDelete(deleteId)}
          title="Are Your You want to delete quiz ?"
          data="Ok Delete it"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box></Box>
          <Typography variant="h6">Student</Typography>
          <Box>
            <Link to="add">
              <Button variant="contained">Add Student</Button>
            </Link>
          </Box>
        </Box>
        <Divider sx={{ margin: "10px 0 20px" }} />
        <Box textAlign="center">
          {" "}
          <BasicTable rows={data} columns={columns} hideColumns={hideColumns} />
        </Box>
        <SnackbarDisplay
          snackbarData={snackbarData}
          setSnackbarData={setSnackbarData}
        />
      </Box>
    </>
  );
}

export default ViewUser;
