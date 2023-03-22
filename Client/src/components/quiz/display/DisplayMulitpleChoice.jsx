import { Typography } from "@mui/material";
import React from "react";

function DisplayMulitpleChoice({
  questions,
  selectedQuestion,
  selectedAnswers,
  handleMultipleAnswerChange,
}) {
  return (
    <>
      {questions[selectedQuestion - 1].options.map((option, index) => {
        return (
          <div key={index} style={{ marginTop: 5 }}>
            <label
              name={`question-${selectedQuestion}`}
              variant="contained"
              htmlFor={`option-${selectedQuestion}-${index}`}
              style={{ display: "flex" }}
            >
              <input
                type="checkbox"
                value={option.text}
                id={`option-${selectedQuestion}-${index}`}
                checked={selectedAnswers[
                  selectedQuestion - 1
                ].userAnswer.includes(option.text)}
                onChange={(e) => handleMultipleAnswerChange(e)}
              />
              <Typography
                dangerouslySetInnerHTML={{
                  __html: option.text,
                }}
              />
            </label>
          </div>
        );
      })}
    </>
  );
}

export default DisplayMulitpleChoice;
