import {
  Button,
  Checkbox,
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
import { questionTypes } from "../../common/Data";
import SelectBox from "./SelectBox";
import MultipleChoice from "../quiz/types/MultipleChoice";
import SingleChoice from "../quiz/types/SingleChoice";
import BooleanQuestion from "../quiz/types/BooleanQuestion";

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
      {
        type: questionTypes[0].value,
        question: "",
        options: [{ text: "", isCorrect: false }],
      },
    ]);
  };

  const handleRemoveQuestion = (event, qIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(qIndex, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionTypeChange = (event, qIndex) => {
    const { value, name } = event.target;
    const newQuestions = [...questions];
    newQuestions[qIndex].type = value;
    if (value === "boolean") {
      newQuestions[qIndex].options = [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ];
    } else {
      newQuestions[qIndex].options = [{ text: "", isCorrect: false }];
    }
    newQuestions[qIndex].question = "";
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

      {questions.map((question, qIndex) => (
        <Accordion
          expanded={expanded === `panel${qIndex + 1}`}
          onChange={handleChange(`panel${qIndex + 1}`)}
          key={qIndex}
        >
          <AccordionSummary
            aria-controls={`panel${qIndex + 1}d-content`}
            id={`panel${qIndex + 1}d-header`}
          >
            <Typography>Question {qIndex + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <SelectBox
                label="Question Type"
                value={question.type}
                onChange={(e) => handleQuestionTypeChange(e, qIndex)}
                menuItems={questionTypes}
              />
              {question.type === "singleChoice" && (
                <SingleChoice
                  question={question}
                  qIndex={qIndex}
                  setQuestions={setQuestions}
                  questions={questions}
                />
              )}
              {question.type === "multipleChoice" && (
                <MultipleChoice
                  question={question}
                  qIndex={qIndex}
                  setQuestions={setQuestions}
                  questions={questions}
                />
              )}
              {question.type === "boolean" && (
                <BooleanQuestion
                  question={question}
                  qIndex={qIndex}
                  setQuestions={setQuestions}
                  questions={questions}
                />
              )}
              <FormControl fullWidth>
                <Button
                  variant="contained"
                  color="error"
                  onClick={(e) => handleRemoveQuestion(e, qIndex)}
                >
                  Delete Question
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
