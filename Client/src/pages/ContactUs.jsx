import React, { useState } from "react";
import { LoadingSpinner, CustomTextBox } from "../components";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useFormInput } from "../hooks/useFormInput";
import { FeedbackService } from "../services/ServerRequest";
import { SUCCESS_CODE } from "../common/Data";

function ContactUs() {
  const [loading, setLoading] = useState(false);
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const email = useFormInput("");
  const subject = useFormInput("");
  const message = useFormInput("");

  const handleSubmit = () => {
    const getData = async () => {
      setLoading(true);
      const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
      };
      console.log(data);
      try {
        const res = await FeedbackService.set(data);
        if (res.status === SUCCESS_CODE) {
          alert("resonse Added");
          firstName.onChange("");
          lastName.onChange("");
          email.onChange("");
          subject.onChange("");
          message.onChange("");
        } else {
          alert("SErver error");
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getData();
  };
  return (
    <>
      <LoadingSpinner loading={loading} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Contact Us</Typography>
      </Box>
      <Divider sx={{ margin: "10px" }} />
      <Box>
        <Stack mt={5} spacing={3}>
          <Stack spacing={{ sm: 3 }} direction={{ lg: "row", sm: "column" }}>
            <CustomTextBox label="First Name" {...firstName} />
            <CustomTextBox label="Last Name" {...lastName} />
          </Stack>
          <CustomTextBox label="E-mail" {...email} />
          <CustomTextBox label="Subject" {...subject} />
          <CustomTextBox label="Message" multiline rows={5} {...message} />
          <div>
            <Button
              color="secondary"
              onClick={handleSubmit}
              variant="contained"
            >
              Send
            </Button>
          </div>
        </Stack>
      </Box>
    </>
  );
}

export default ContactUs;
