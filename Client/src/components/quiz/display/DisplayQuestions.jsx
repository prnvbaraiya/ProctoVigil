import React from "react";
import DisplayMulitpleChoice from "./DisplayMulitpleChoice";
import DisplaySignleChoice from "./DisplaySignleChoice";

function DisplayQuestions({
  selectedAnswers,
  handleSingleAnswerChange,
  handleMultipleAnswerChange,
  selectedQuestion,
}) {
  return (
    <>
      <div>
        {/* Display the current question */}
        <div
          dangerouslySetInnerHTML={{
            __html:
              selectedQuestion.questionIndex +
              1 +
              ") " +
              selectedQuestion.question,
          }}
        />
        {/* Display the options for the current question */}
        {(selectedQuestion.type === "singleChoice" ||
          selectedQuestion.type === "boolean") && (
          <DisplaySignleChoice
            selectedAnswers={selectedAnswers}
            handleSingleAnswerChange={handleSingleAnswerChange}
            selectedQuestion={selectedQuestion}
          />
        )}
        {selectedQuestion.type === "multipleChoice" && (
          <DisplayMulitpleChoice
            selectedAnswers={selectedAnswers}
            handleMultipleAnswerChange={handleMultipleAnswerChange}
            selectedQuestion={selectedQuestion}
          />
        )}
      </div>
    </>
  );
}

export default DisplayQuestions;
