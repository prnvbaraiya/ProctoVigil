import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizPointPaymentService } from "../../../services/ServerRequest";
import { Box, Divider, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { BasicTable, LoadingSpinner } from "../../../components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import auth from "../../../auth/auth";

function ViewPaymentHistory() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await QuizPointPaymentService.getByUserId(auth.id);
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, []);

  const handleViewDetail = (id) => {
    const state = {
      payment_id: id,
    };
    navigate("detail", { state });
  };

  const columns = [
    { field: "_id", headerName: "Id", width: 50 },
    {
      field: "username",
      headerName: "Username",
      width: 100,
      renderCell: (params) => params.row.user_id.username,
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 200,
      renderCell: (params) => params.row.user_id.email,
    },
    {
      field: "paymentType",
      headerName: "Method",
      width: 100,
      renderCell: (params) =>
        params.row.paymentMethodData.paymentMethodData.type,
    },
    {
      field: "course",
      headerName: "Course",
      width: 200,
      renderCell: (params) => params.row.courses[0].title,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 100,
      renderCell: (params) => params.row.courses[0].price,
    },
    {
      field: "paymentTime",
      headerName: "Time",
      width: 250,
      renderCell: (params) => new Date(params.row.createdAt).toUTCString(),
    },
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
      ],
    },
  ];

  const hideColumns = ["_id", "email"];

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
          <Typography variant="h6">Payment History</Typography>
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

export default ViewPaymentHistory;
