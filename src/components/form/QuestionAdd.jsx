import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import React from "react";
import { Box } from "@mui/system";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function QuestionAdd({ questions, setQuestions }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", incorrect_answer: ["", "", ""], correct_answer: "" },
    ]);
  };

  const handleRemoveQuestion = (event, index) => {
    event.preventDefault();
    event.stopPropagation(); // stop the event from propagating
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (event, index) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (event, qIndex, oIndex) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[qIndex].incorrect_answer[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (event, index) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index].correct_answer = value;
    setQuestions(newQuestions);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box></Box>
        <Typography textAlign="center" variant="h6">
          Add Questions
        </Typography>
        <Button
          color="secondary"
          onClick={handleAddQuestion}
          variant="contained"
        >
          +
        </Button>
      </Box>

      {questions.map((question, index) => (
        <Accordion
          expanded={expanded === `panel${index + 1}`}
          onChange={handleChange(`panel${index + 1}`)}
          key={index}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Question {index + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  name="question"
                  onChange={(e) => handleQuestionChange(e, index)}
                  value={question.question}
                  label="Question"
                  variant="outlined"
                />
              </FormControl>
              {question.incorrect_answer.map((option, oIndex) => (
                <FormControl key={oIndex} fullWidth>
                  <TextField
                    id="outlined-basic"
                    name={`option${oIndex + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(e, index, oIndex)}
                    label={`Incorrect option ${oIndex + 1}`}
                    variant="outlined"
                  />
                </FormControl>
              ))}
              <FormControl>
                <TextField
                  id="outlined-basic"
                  name="correct_answer"
                  value={question.correct_answer}
                  onChange={(e) => handleCorrectAnswerChange(e, index)}
                  label={`Correct option`}
                  variant="outlined"
                />
              </FormControl>

              <FormControl fullWidth>
                <Button
                  variant="contained"
                  color="error"
                  onClick={(e) => handleRemoveQuestion(e, index)}
                >
                  -
                </Button>
              </FormControl>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default QuestionAdd;
