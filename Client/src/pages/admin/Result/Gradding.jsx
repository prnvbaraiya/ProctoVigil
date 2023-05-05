import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadingSpinner, QuestionCard } from "../../../components";
import {
  QuizResultService,
  QuizService,
} from "../../../services/ServerRequest";
import { groupByObject } from "../../../common/Methods";
import { SUCCESS_CODE } from "../../../common/Data";

function Gradding() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { quiz_id, student_id } = location.state;
  const [quizData, setQuizData] = useState([]);
  const [studentQuizResultData, setStudentQuizResultData] = useState({});
  const [totalObtainedMarks, setTotalObtainedMarks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const quiz = await QuizService.getById(quiz_id);
      let newQuiz = {
        ...quiz.data,
        sections: groupByObject(quiz.data.sections, "id"),
      };
      for (let item of quiz.data.sections) {
        newQuiz.sections[item.id].questions = groupByObject(
          item.questions,
          "id"
        );
      }
      setQuizData(newQuiz);
      const quizResult = await QuizResultService.getById(quiz_id);
      const studentData = quizResult.data.students.find(
        (data) => data.user._id === student_id
      );
      setStudentQuizResultData(studentData);

      setLoading(false);
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    console.log(studentQuizResultData.user._id);
    const res = await QuizResultService.update({
      quiz_id,
      user_id: studentQuizResultData.user._id,
      obtainedMarks: totalObtainedMarks,
    });
    if (res.status === SUCCESS_CODE) {
      const state = {
        open: true,
        message: res.data,
        type: "success",
      };
      navigate("..", { state });
    } else {
      console.log(res);
      alert("Server Error");
    }
  };

  return (
    <Box>
      {/* Header */}
      <LoadingSpinner loading={loading} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="..">
          <Button color="error" variant="contained">
            Cancel
          </Button>
        </Link>
        <Typography variant="h6">
          {studentQuizResultData.user?.username} Gradding for {quizData?.name}
        </Typography>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Update Grades
        </Button>
      </Box>

      <Divider sx={{ margin: "10px" }} />
      <Box>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>
            Student:{" "}
            {studentQuizResultData.user?.firstName +
              " " +
              studentQuizResultData.user?.lastName}
          </span>
          <span>
            Total Score: {totalObtainedMarks}/
            {studentQuizResultData?.studentAnswer?.length}
          </span>
        </div>
        {studentQuizResultData.studentAnswer?.map((item, qIndex) => {
          const tmp =
            quizData.sections[item.section_id].questions[item.question_id];
          const correctAnswer = [];
          tmp.options.map(
            (item) => item.isCorrect && correctAnswer.push(item.text)
          );
          return (
            <QuestionCard
              key={qIndex}
              questionType={tmp.type}
              question={tmp.question}
              options={tmp.options}
              userAnswer={item.userAnswer}
              correctAnswer={correctAnswer}
              setTotalObtainedMarks={setTotalObtainedMarks}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default Gradding;
