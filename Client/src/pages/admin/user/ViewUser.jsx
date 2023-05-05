import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../../services/ServerRequest";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AlertDialogBox,
  SnackbarDisplay,
  LoadingSpinner,
  BasicTable,
} from "../../../components/index";

function ViewUser() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    type: "success",
    vertical: "top",
    horizontal: "right",
  });
  const [deleteDialogBox, setDeleteDialogBox] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [rowsDeletesDialogBox, setrowsDeleteDialogBox] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await UserService.get();
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, [snackbarData]);

  const handleDelete = async (id) => {
    const res = await UserService.delete({ _id: id });
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
    { field: "username", headerName: "Username", width: 150 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        const row = params.row;
        const lName = row.lastName ? row.lastName : "";
        return <Typography>{row.firstName + " " + lName}</Typography>;
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

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  const handleRowsDelete = async () => {
    const res = await UserService.deleteUsers(selectedRowIds);
    if (res.status === 202) {
      setrowsDeleteDialogBox(false);
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: res.data,
      });
    } else {
      alert("There is some error try again after some time");
    }
  };

  return (
    <>
      <Box>
        <LoadingSpinner loading={loading} />
        <AlertDialogBox
          open={deleteDialogBox}
          setOpen={setDeleteDialogBox}
          handleSuccess={() => handleDelete(deleteId)}
          title="Are you sure you want to delete User ?"
          data="Ok Delete it"
        />
        <AlertDialogBox
          open={rowsDeletesDialogBox}
          setOpen={setrowsDeleteDialogBox}
          handleSuccess={() => handleRowsDelete()}
          title="Are you sure you want to delete selected Users ?"
          data="This action is irrversible"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box></Box>
          <Typography variant="h6">User</Typography>
          <Box>
            <Link to="add">
              <Button variant="contained">Add User</Button>
            </Link>
          </Box>
        </Box>
        <Divider sx={{ margin: "10px 0 20px" }} />
        <Box textAlign="center">
          {!loading && (
            <BasicTable
              selectedRowIds={selectedRowIds}
              setSelectedRowIds={setSelectedRowIds}
              handleSelectionModelChange={handleSelectionModelChange}
              handleDeleteRows={() => setrowsDeleteDialogBox(true)}
              rows={data}
              columns={columns}
              hideColumns={hideColumns}
              checkboxSelection={true}
            />
          )}
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
