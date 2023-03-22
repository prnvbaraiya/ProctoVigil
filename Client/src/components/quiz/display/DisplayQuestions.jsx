import { Typography } from "@mui/material";
import React from "react";
import DisplayMulitpleChoice from "./DisplayMulitpleChoice";
import DisplaySignleChoice from "./DisplaySignleChoice";

function DisplayQuestions({
  selectedQuestion,
  questions,
  selectedAnswers,
  handleSingleAnswerChange,
  handleMultipleAnswerChange,
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
        {(questions[selectedQuestion - 1].type === "singleChoice" ||
          questions[selectedQuestion - 1].type === "boolean") && (
          <DisplaySignleChoice
            questions={questions}
            selectedQuestion={selectedQuestion}
            selectedAnswers={selectedAnswers}
            handleSingleAnswerChange={handleSingleAnswerChange}
          />
        )}
        {questions[selectedQuestion - 1].type === "multipleChoice" && (
          <DisplayMulitpleChoice
            questions={questions}
            selectedQuestion={selectedQuestion}
            selectedAnswers={selectedAnswers}
            handleMultipleAnswerChange={handleMultipleAnswerChange}
          />
        )}
      </div>
    </>
  );
}

export default DisplayQuestions;
