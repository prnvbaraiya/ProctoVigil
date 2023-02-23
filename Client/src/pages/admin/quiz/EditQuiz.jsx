import { Box, Stack, Button, Divider, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DateTime from "../../../components/form/DateTime";
import QuestionAdd from "../../../components/form/QuestionAdd";
import SelectChip from "../../../components/form/SelectChip";
import TextBox from "../../../components/form/TextBox";
import { useFormInput } from "../../../hooks/useFormInput";
import { SERVER_LINK } from "../../../variables/constants";

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

function EditQuiz() {
  const location = useLocation();
  const { id } = location.state;
  const name = useFormInput("");
  const description = useFormInput("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const duration = useFormInput("");
  const [personName, setPersonName] = useState([]);
  const [questions, setQuestions] = useState([
    { question: "", incorrect_answer: ["", "", ""], correct_answer: "" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(SERVER_LINK + "quiz/" + id);
      name.onChange(res.data.name);
      description.onChange(res.data.description);
      setStartDate(res.data.startDate);
      setEndDate(res.data.endDate);
      duration.onChange(res.data.duration);
      setPersonName(res.data.personName);
      setQuestions(res.data.questions);
    };
    getData();

    // eslint-disable-next-line
  }, [id]);

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
    const res = await axios.post(SERVER_LINK + "quiz/update/" + id, data);
    if (res.status === 202) {
      navigate("/admin/quiz");
    } else {
      alert("There is Some error ", res);
    }
  };

  return (
    <>
      <>
        {" "}
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
            <Typography variant="h6">Update Quiz</Typography>
            <Button
              color="secondary"
              onClick={handleSubmit}
              variant="contained"
            >
              Update
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
                <DateTime
                  label="Start Date"
                  value={startDate}
                  setValue={setStartDate}
                />
                <DateTime
                  label="End Date"
                  value={endDate}
                  setValue={setEndDate}
                />
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
      </>
    </>
  );
}

export default EditQuiz;
