import React from "react";
import { Box, FormControl, Radio, Stack, TextField } from "@mui/material";

function BooleanQuestion({ question, qIndex, commonMethods }) {
  const { handleSingleOptionCheckChange, handleQuestionChange } = commonMethods;

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
              onChange={() => handleSingleOptionCheckChange(qIndex, 0)}
            />
            <label htmlFor="true">{question.options[0].text}</label>
          </Box>
        </FormControl>

        <FormControl fullWidth>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Radio
              checked={question.options[1].isCorrect}
              id="false"
              onChange={() => handleSingleOptionCheckChange(qIndex, 1)}
            />
            <label htmlFor="false">{question.options[1].text}</label>
          </Box>
        </FormControl>
      </Stack>
    </>
  );
}

export default BooleanQuestion;
