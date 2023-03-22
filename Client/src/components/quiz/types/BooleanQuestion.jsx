import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function BooleanQuestion({ questions, setQuestions, question, qIndex }) {
  const handleQuestionChange = (event, qIndex) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[qIndex][name] = value;
    setQuestions(newQuestions);
  };

  const handleOptionCheckChange = (qIndex, oIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const selectedOption = updatedQuestions[qIndex].options[oIndex];
      selectedOption.isCorrect = true;
      updatedQuestions[qIndex].options.forEach((option) => {
        if (option !== selectedOption) {
          option.isCorrect = false;
        }
      });
      return updatedQuestions;
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

  return (
    <>
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
      <Stack
        spacing={{ sm: 3 }}
        direction={{ lg: "row", sm: "column" }}
        sx={{ justifyContent: "space-between" }}
      >
        <FormControl fullWidth>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Radio
              checked={question.options[0].isCorrect}
              id="true"
              onChange={() => handleOptionCheckChange(qIndex, 0)}
            />
            <label htmlFor="true">{question.options[0].text}</label>
          </Box>
        </FormControl>

        <FormControl fullWidth>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Radio
              checked={question.options[1].isCorrect}
              id="false"
              onChange={() => handleOptionCheckChange(qIndex, 1)}
            />
            <label htmlFor="false">{question.options[1].text}</label>
          </Box>
        </FormControl>
      </Stack>
    </>
  );
}

export default BooleanQuestion;
