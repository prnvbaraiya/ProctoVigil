import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextBox from "../../components/form/TextBox";
import { useFormInput } from "../../hooks/useFormInput";
import AdminLayout from "../AdminLayout";
import DateTime from "../../components/form/DateTime";
import SelectChip from "../../components/form/SelectChip";
import QuestionAdd from "../../components/form/QuestionAdd";
import axios from "axios";
import { SERVER_LINK } from "../../variables/constants";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function AddQuiz() {
  const [personName, setPersonName] = React.useState([]);

  const name = useFormInput("");
  const description = useFormInput("");
  const startDate = useFormInput(new Date());
  const endDate = useFormInput(new Date());
  const duration = useFormInput("");
  const [questions, setQuestions] = useState([
    { question: "", incorrect_answer: ["", "", ""], correct_answer: "" },
  ]);

  const handleSubmit = async () => {
    const data = {
      name: name.value,
      description: description.value,
      startDate: startDate.value,
      endDate: endDate.value,
      duration: duration.value,
      personName,
      questions,
    };
    const res = await axios.post(SERVER_LINK + "quiz/add", data);
    console.log(res);
  };

  return (
    <AdminLayout>
      {/*Container */}
      <Box>
        {/* Header */}
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
          <Typography variant="h6">Add Quiz</Typography>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Save Quiz
          </Button>
        </Box>

        <Divider sx={{ margin: "10px" }} />

        {/* Body  */}
        <form>
          <Stack spacing={3}>
            <TextBox label="Name" {...name} />
            <TextBox label="Description" {...description} />
            <Stack
              spacing={{ sm: 3 }}
              direction={{ lg: "row", sm: "column" }}
              sx={{ justifyContent: "space-between" }}
            >
              <DateTime label="Start Date" {...startDate} />
              <DateTime label="End Date" {...endDate} />
              <TextBox
                label="Duration (in minutes)"
                type="number"
                fullWidth={false}
                {...duration}
              />
            </Stack>
            <SelectChip
              label="Students"
              names={names}
              personName={personName}
              setPersonName={setPersonName}
            />

            <QuestionAdd questions={questions} setQuestions={setQuestions} />
          </Stack>
        </form>
      </Box>
    </AdminLayout>
  );
}

export default AddQuiz;
