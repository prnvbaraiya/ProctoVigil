import { Box, Button, FormControl, Radio, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

function SingleChoice({ question, qIndex, commonMethods }) {
  const {
    handleQuestionChange,
    handleSingleOptionCheckChange,
    handleOptionTextChange,
    handleAddOption,
    handleRemoveOption,
  } = commonMethods;

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
            <Radio
              checked={option.isCorrect}
              onChange={() => handleSingleOptionCheckChange(qIndex, oIndex)}
            />
            <FormControl fullWidth>
              <TextField
                id={`option${oIndex + 1}q${qIndex}`}
                name={`option${oIndex + 1}`}
                value={option.text}
                onChange={(e) => handleOptionTextChange(e, qIndex, oIndex)}
                label={`Option ${oIndex + 1}`}
                variant="outlined"
              />
            </FormControl>
            <Button
              variant="contained"
              color="error"
              sx={{ margin: "0 10px" }}
              onClick={() => handleRemoveOption(qIndex, oIndex)}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </FormControl>
      ))}
      <FormControl fullWidth>
        <Button variant="contained" onClick={() => handleAddOption(qIndex)}>
          Add Option
        </Button>
      </FormControl>
    </>
  );
}

export default SingleChoice;
