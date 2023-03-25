import { Typography } from "@mui/material";
import React from "react";

function DisplayMulitpleChoice({
  selectedAnswers,
  handleMultipleAnswerChange,
  selectedQuestion,
}) {
  const answers = selectedAnswers.find(
    (answer) => answer.question_id === selectedQuestion.id
  ).userAnswer;
  return (
    <>
      {selectedQuestion.options.map((option, index) => {
        const isChecked = answers.includes(option.text);
        return (
          <div key={index} style={{ marginTop: 5 }}>
            <label
              htmlFor={`option-${selectedQuestion.id}-${index}`}
              style={{ display: "flex" }}
            >
              <input
                type="checkbox"
                value={option.text}
                id={`option-${selectedQuestion.id}-${index}`}
                checked={isChecked}
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
