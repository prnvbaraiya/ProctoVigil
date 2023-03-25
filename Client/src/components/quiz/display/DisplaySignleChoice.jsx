import { Typography } from "@mui/material";
import React from "react";

function DisplaySignleChoice({
  selectedAnswers,
  handleSingleAnswerChange,
  selectedQuestion,
}) {
  return (
    <>
      {selectedQuestion.options.map((option, index) => {
        return (
          <div key={index} style={{ marginTop: 5 }}>
            <label
              name={`choice-${index + 1}`}
              htmlFor={index}
              style={{ display: "flex" }}
            >
              <input
                type="radio"
                value={option.text}
                id={index}
                checked={
                  option.text ===
                  selectedAnswers.find(
                    (answer) => answer.question_id === selectedQuestion.id
                  ).userAnswer[0]
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
