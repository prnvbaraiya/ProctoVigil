import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FeedbackService } from "../../../services/ServerRequest";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { LoadingSpinner, TextBox } from "../../../components";
import { useFormInput } from "../../../hooks/useFormInput";

function DetailFeedback() {
  const location = useLocation();
  const { feedback_id } = location.state;
  const [loading, setLoading] = useState(false);
  const email = useFormInput("");
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const subject = useFormInput("");
  const time = useFormInput("");
  const message = useFormInput("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await FeedbackService.getById(feedback_id);
      email.onChange(res.data.email);
      firstName.onChange(res.data.firstName);
      lastName.onChange(res.data.lastName);
      subject.onChange(res.data.subject);
      const createdTime = new Date(res.data.createdAt);
      time.onChange(createdTime.toUTCString());
      message.onChange(res.data.message);
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
              Cancel
            </Button>
          </Link>
          <Typography variant="h6">Detail Feedback</Typography>
          <Box></Box>
        </Box>
        <Divider sx={{ margin: "10px" }} />
        <form>
          <Stack mt={3} spacing={3}>
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
              <TextBox label="Subject" readOnly {...subject}></TextBox>
              <TextBox label="Time" readOnly {...time}></TextBox>
            </Stack>
            <TextBox label="Feedback" multiline readOnly {...message}></TextBox>
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default DetailFeedback;
