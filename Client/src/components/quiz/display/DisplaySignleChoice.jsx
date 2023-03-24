import { Typography } from "@mui/material";
import React from "react";

function DisplaySignleChoice({
  questions,
  selectedQuestion,
  selectedAnswers,
  handleSingleAnswerChange,
}) {
  return (
    <>
      {questions[selectedQuestion - 1].options.map((option, index) => {
        return (
          <div key={index} style={{ marginTop: 5 }}>
            <label
              name={`choice-${index + 1}`}
              variant="contained"
              htmlFor={index}
              style={{ display: "flex" }}
            >
              <input
                type="radio"
                value={option.text}
                id={index}
                checked={
                  option.text ===
                  selectedAnswers[selectedQuestion - 1].userAnswer[0]
                }
                onChange={(e) => handleSingleAnswerChange(e)}
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

export default DisplaySignleChoice;
