import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFormInput } from "../../../hooks/useFormInput";
import { QuizPointPaymentService } from "../../../services/ServerRequest";
import { LoadingSpinner, TextBox } from "../../../components";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

function DetailPaymentHistory() {
  const location = useLocation();
  const { payment_id } = location.state;
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const email = useFormInput("");
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const paymentMethod = useFormInput("");
  const time = useFormInput("");
  const planId = useFormInput("");
  const planTitle = useFormInput("");
  const price = useFormInput("");
  const cardNetwork = useFormInput("");
  const cardLastDigit = useFormInput("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      console.log(payment_id);
      const res = await QuizPointPaymentService.getById(payment_id);
      console.log(res.data);
      username.onChange(res.data.user_id.username);
      email.onChange(res.data.user_id.email);
      firstName.onChange(res.data.user_id.firstName);
      lastName.onChange(res.data.user_id.lastName);
      paymentMethod.onChange(res.data.paymentMethodData.paymentMethodData.type);
      const createdTime = new Date(res.data.createdAt);
      time.onChange(createdTime.toUTCString());
      planId.onChange(res.data.courses[0].id);
      planTitle.onChange(res.data.courses[0].title);
      price.onChange(res.data.courses[0].price);
      cardNetwork.onChange(
        res.data.paymentMethodData.paymentMethodData.info.cardNetwork
      );
      cardLastDigit.onChange(
        res.data.paymentMethodData.paymentMethodData.info.cardDetails
      );
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      <Box>
        {/* Header */}
        <LoadingSpinner loading={loading} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="..">
            <Button color="error" variant="contained">
              Back
            </Button>
          </Link>
          <Typography variant="h6">Detail of Payment</Typography>
          <Box></Box>
        </Box>
        <Divider sx={{ margin: "10px" }} />
        <form>
          <Stack mt={3} spacing={3}>
            <TextBox label="Username" readOnly {...username}></TextBox>
            <Stack
              spacing={{ sm: 3 }}
              direction={{ lg: "row", sm: "column" }}
              sx={{ justifyContent: "space-between" }}
            >
              <TextBox label="First Name" readOnly {...firstName}></TextBox>
              <TextBox label="Last Name" readOnly {...lastName}></TextBox>
            </Stack>
            <TextBox label="E-mail" readOnly {...email}></TextBox>
            <Stack
              spacing={{ sm: 3 }}
              direction={{ lg: "row", sm: "column" }}
              sx={{ justifyContent: "space-between" }}
            >
              <TextBox
                label="Payment Method"
                readOnly
                {...paymentMethod}
              ></TextBox>
              <TextBox label="Time" readOnly {...time}></TextBox>
            </Stack>
            <TextBox label="Plan Id" readOnly {...planId}></TextBox>
            <Stack
              spacing={{ sm: 3 }}
              direction={{ lg: "row", sm: "column" }}
              sx={{ justifyContent: "space-between" }}
            >
              <TextBox label="Plan Title" readOnly {...planTitle}></TextBox>
              <TextBox label="Price" readOnly {...price}></TextBox>
            </Stack>
            <Stack
              spacing={{ sm: 3 }}
              direction={{ lg: "row", sm: "column" }}
              sx={{ justifyContent: "space-between" }}
            >
              <TextBox label="Card Type" readOnly {...cardNetwork}></TextBox>
              <TextBox
                label="Card Last 4 Digit"
                readOnly
                {...cardLastDigit}
              ></TextBox>
            </Stack>
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default DetailPaymentHistory;
