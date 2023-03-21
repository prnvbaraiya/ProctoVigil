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
        question: "",
        options: [{ type: "multiple", text: "", isCorrect: false }],
      },
    ]);
  };

  const handleRemoveQuestion = (event, qIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(qIndex, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (event, qIndex) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[qIndex][name] = value;
    setQuestions(newQuestions);
  };

  const handleOptionCheckChange = (event, qIndex, oIndex) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      const newOptions = [...newQuestions[qIndex].options];
      newOptions[oIndex] = {
        ...newOptions[oIndex],
        isCorrect: event.target.checked,
      };
      newQuestions[qIndex] = { ...newQuestions[qIndex], options: newOptions };
      return newQuestions;
    });
  };

  const handleOptionChange = (event, qIndex, oIndex) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      const newOptions = [...newQuestions[qIndex].options];
      newOptions[oIndex] = { ...newOptions[oIndex], text: event.target.value };
      newQuestions[qIndex] = { ...newQuestions[qIndex], options: newOptions };
      return newQuestions;
    });
  };

  const handleAddOption = (event, qIndex) => {
    const newQuestions = [...questions];
    const option = { text: "", is_correct: false };
    newQuestions[qIndex].options.push(option);
    setQuestions(newQuestions);
  };

  const handleRemoveOption = (event, qIndex, oIndex) => {
    const newQuestions = [...questions];
    console.log(newQuestions);
    newQuestions[qIndex].options.splice(oIndex, 1);
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
            <Stack spacing={1}>
              <FormControl fullWidth>
                <TextField
                  id={`question${qIndex}`}
                  name="question"
                  onChange={(e) => handleQuestionChange(e, qIndex)}
                  value={question.question}
                  label="Question"
                  variant="outlined"
                />
              </FormControl>
              {question.options.map((option, oIndex) => (
                <FormControl key={oIndex} fullWidth>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={option.isCorrect}
                      onChange={(e) =>
                        handleOptionCheckChange(e, qIndex, oIndex)
                      }
                    />
                    <FormControl fullWidth>
                      <TextField
                        id={`option${oIndex + 1}q${qIndex}`}
                        name={`option${oIndex + 1}`}
                        value={option.text}
                        onChange={(e) => handleOptionChange(e, qIndex, oIndex)}
                        label={`Option ${oIndex + 1}`}
                        variant="outlined"
                      />
                    </FormControl>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ margin: "0 10px" }}
                      onClick={(e) => handleRemoveOption(e, qIndex, oIndex)}
                    >
                      -
                    </Button>
                  </Box>
                </FormControl>
              ))}
              <FormControl fullWidth>
                <Button
                  variant="contained"
                  onClick={(e) => handleAddOption(e, qIndex)}
                >
                  Add Option
                </Button>
              </FormControl>
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
