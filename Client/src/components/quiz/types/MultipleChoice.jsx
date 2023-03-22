import { Box, Button, Checkbox, FormControl, TextField } from "@mui/material";
import React from "react";

function MultipleChoice({ questions, setQuestions, question, qIndex }) {
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
    const option = { text: "", isCorrect: false };
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
              onChange={(e) => handleOptionCheckChange(e, qIndex, oIndex)}
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
        <Button variant="contained" onClick={(e) => handleAddOption(e, qIndex)}>
          Add Option
        </Button>
      </FormControl>
    </>
  );
}

export default MultipleChoice;
