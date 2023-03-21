import { Button, Typography } from "@mui/material";
import React from "react";

function DisplayQuestions({
  selectedQuestion,
  questions,
  selectedAnswers,
  handleAnswerChange,
}) {
  return (
    <>
      <div>
        {/* Display the current question */}
        <div
          dangerouslySetInnerHTML={{
            __html:
              selectedQuestion +
              ") " +
              questions[selectedQuestion - 1].question,
          }}
        />
        {/* Display the options for the current question */}
        {questions[selectedQuestion - 1].options.map((option, index) => {
          return (
            <div key={index} style={{ marginTop: 5 }}>
              <label
                name={`question-${selectedQuestion}`}
                variant="contained"
                htmlFor={index}
                style={{ display: "flex" }}
              >
                <input
                  type="radio"
                  value={option.text}
                  id={index}
                  checked={
                    option.text === selectedAnswers[selectedQuestion - 1]
                  }
                  onChange={(e) => handleAnswerChange(e)}
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
      </div>
    </>
  );
}

export default DisplayQuestions;
