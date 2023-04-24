import React, { useEffect, useState } from "react";
import { FeedbackService } from "../../../services/ServerRequest";
import { Box, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AlertDialogBox,
  BasicTable,
  LoadingSpinner,
  SnackbarDisplay,
} from "../../../components";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { SUCCESS_CODE } from "../../../common/Data";

function ViewFeedback() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    type: "success",
    vertical: "top",
    horizontal: "right",
  });
  const [deleteDialogBox, setDeleteDialogBox] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await FeedbackService.get();
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, [snackbarData]);

  const handleViewDetail = (id) => {
    const state = {
      feedback_id: id,
    };
    navigate("detail", { state });
  };

  const deleteFeedback = async (id) => {
    const data = {
      _id: id,
    };
    const res = await FeedbackService.delete(data);
    if (res.status === SUCCESS_CODE) {
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
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        const row = params.row;
        return <Typography>{row.firstName + " " + row.lastName}</Typography>;
      },
    },
    { field: "email", headerName: "E-mail", width: 200 },
    { field: "subject", headerName: "Subject", width: 100 },
    { field: "message", headerName: "Feedback", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          label="view"
          key={params.row._id}
          icon={<VisibilityIcon />}
          onClick={() => {
            handleViewDetail(params.row._id);
          }}
          color="primary"
        />,
        <GridActionsCellItem
          label="delete"
          key={params.row._id}
          icon={<DeleteIcon />}
          onClick={() => {
            setDeleteId(params.row._id);
            setDeleteDialogBox(true);
          }}
          color="error"
        />,
      ],
    },
  ];

  const hideColumns = ["_id"];

  return (
    <>
      <Box>
        <AlertDialogBox
          open={deleteDialogBox}
          setOpen={setDeleteDialogBox}
          handleSuccess={() => deleteFeedback(deleteId)}
          title="Are Your You want to delete this feedback ?"
          data="This action is remove data permanently its inreversible action"
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
      <SnackbarDisplay
        snackbarData={snackbarData}
        setSnackbarData={setSnackbarData}
      />
    </>
  );
}

export default ViewFeedback;
