import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import "./style/QuestionCard.css";
import { Icon } from "@mui/material";
import { questionTypes } from "../../common/Data";

const QuestionCard = ({
  questionType,
  question,
  options,
  userAnswer,
  correctAnswer,
  setTotalObtainedMarks,
}) => {
  const [isCorrect, setIsCorrect] = useState(false);
  useEffect(() => {
    if (correctAnswer.length !== userAnswer.length) {
      setIsCorrect(false);
      return;
    }
    for (let item of correctAnswer) {
      if (!userAnswer.includes(item)) {
        setIsCorrect(false);
        return;
      }
    }
    setIsCorrect(true);
    setTotalObtainedMarks((prev) => prev + 1);
    return;
  }, []);

  return (
    <div
      className={`report-question ${
        isCorrect ? "green" : userAnswer.length !== 0 && "red"
      } `}
    >
      <div className="report-question-header">
        <div className="q-type-tag">
          {questionTypes.find((item) => item.value === questionType).title}
        </div>
        <div className="q-type-tag">{isCorrect ? "1" : "0"}/1</div>
      </div>
      <div className="report-question-body">
        <div className="question">{question}</div>
        <div className="options">
          {options.map((option) => (
            <div
              key={option.text}
              className={`option ${
                option.isCorrect
                  ? "option-correct"
                  : userAnswer.includes(option.text) && "option-wrong"
              }`}
            >
              <span>{option.text}</span>
              {userAnswer.includes(option.text) && option.isCorrect ? (
                <Icon>
                  <CheckIcon color="success" />
                </Icon>
              ) : (
                userAnswer.includes(option.text) && (
                  <Icon>
                    <ClearIcon color="error" />
                  </Icon>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
