import React from "react";
import { IconButton, Stack, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
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
    expandIcon={<KeyboardArrowUpIcon sx={{ fontSize: "1.8rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    justifyContent: "space-between",
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
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[qIndex].type = value;
    if (value === "boolean") {
      newQuestions[qIndex].options = [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ];
    } else {
      newQuestions[qIndex].options = newQuestions[qIndex].options.map(
        (item) => {
          return { ...item, isCorrect: false };
        }
      );
    }
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (event, qIndex) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[qIndex][name] = value;
    setQuestions(newQuestions);
  };

  const handleSingleOptionCheckChange = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    const selectedOption = updatedQuestions[qIndex].options[oIndex];
    selectedOption.isCorrect = true;
    updatedQuestions[qIndex].options.forEach((option) => {
      if (option !== selectedOption) {
        option.isCorrect = false;
      }
    });
    setQuestions(updatedQuestions);
  };

  const handleMultipleOptionCheckChange = (event, qIndex, oIndex) => {
    const newQuestions = [...questions];
    const newOptions = [...newQuestions[qIndex].options];
    newOptions[oIndex] = {
      ...newOptions[oIndex],
      isCorrect: event.target.checked,
    };
    newQuestions[qIndex] = { ...newQuestions[qIndex], options: newOptions };
    setQuestions(newQuestions);
  };

  const handleOptionTextChange = (event, qIndex, oIndex) => {
    const newQuestions = [...questions];
    const newOptions = [...newQuestions[qIndex].options];
    newOptions[oIndex] = { ...newOptions[oIndex], text: event.target.value };
    newQuestions[qIndex] = { ...newQuestions[qIndex], options: newOptions };
    setQuestions(newQuestions);
  };

  const handleAddOption = (qIndex) => {
    const newQuestions = [...questions];
    const option = { text: "", isCorrect: false };
    newQuestions[qIndex].options.push(option);
    setQuestions(newQuestions);
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };

  return (
    <>
      <Box>
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
          <IconButton color="secondary" onClick={handleAddQuestion}>
            <AddBoxIcon fontSize="large" />
          </IconButton>
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
              sx={{ justifyContent: "space-between" }}
            >
              <Typography display="flex" alignItems="center">
                {`Question ${qIndex + 1}`}
              </Typography>
              <IconButton
                color="error"
                onClick={(e) => handleRemoveQuestion(e, qIndex)}
                sx={{ margin: "0 10px" }}
              >
                <DeleteIcon />
              </IconButton>
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
                    commonMethods={{
                      handleQuestionChange,
                      handleSingleOptionCheckChange,
                      handleOptionTextChange,
                      handleAddOption,
                      handleRemoveOption,
                    }}
                  />
                )}
                {question.type === "multipleChoice" && (
                  <MultipleChoice
                    question={question}
                    qIndex={qIndex}
                    setQuestions={setQuestions}
                    questions={questions}
                    commonMethods={{
                      handleQuestionChange,
                      handleMultipleOptionCheckChange,
                      handleOptionTextChange,
                      handleAddOption,
                      handleRemoveOption,
                    }}
                  />
                )}
                {question.type === "boolean" && (
                  <BooleanQuestion
                    question={question}
                    qIndex={qIndex}
                    setQuestions={setQuestions}
                    questions={questions}
                    commonMethods={{
                      handleSingleOptionCheckChange,
                      handleQuestionChange,
                    }}
                  />
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
}

export default QuestionAdd;
