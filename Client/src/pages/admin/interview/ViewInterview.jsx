import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { InterviewService } from "../../../services/ServerRequest";
import {
  AlertDialogBox,
  SnackbarDisplay,
  LoadingSpinner,
  BasicTable,
} from "../../../components/index";

function ViewInterview() {
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
  const [deleteId, setDeleteId] = useState("");

  const getData = async () => {
    setLoading(true);
    const res = await InterviewService.get();
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [snackbarData]);

  const columns = [
    { field: "_id", headerName: "Id", width: 50 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "studentNames",
      headerName: "Students",
      width: 250,
      renderCell: (params) => {
        const row = params.row;
        return row.studentNames.map((item, index) => (
          <Typography key={index}>
            {index !== 0 ? ", " + item.user_id.username : item.user_id.username}
          </Typography>
        ));
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

  const handleDelete = async (id) => {
    const res = await InterviewService.delete({ id });
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

  return (
    <>
      <Box>
        <LoadingSpinner loading={loading} />
        <AlertDialogBox
          open={deleteDialogBox}
          setOpen={setDeleteDialogBox}
          handleSuccess={() => handleDelete(deleteId)}
          title="Are Your You want to delete interview ?"
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
          <Typography variant="h6">Interview</Typography>
          <Box>
            <Link to="add">
              <Button variant="contained">Add Interview</Button>
            </Link>
          </Box>
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
      <SnackbarDisplay
        snackbarData={snackbarData}
        setSnackbarData={setSnackbarData}
      />
    </>
  );
}

export default ViewInterview;
