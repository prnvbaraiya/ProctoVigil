import React from "react";
import DraggableLocalStream from "./DraggableLocalStream";
import { Grid } from "@mui/material";
import SectionAccordion from "./SectionAccordion";

export default function QuestionNavigation(props) {
  const {
    zConfig,
    selectedAnswers,
    instance,
    visitedQuestions,
    setVisitedQuestions,
    InputDeviceIds,
    entireScreenStream,
    downloadVideo,
    sections,
    selectedQuestion,
    getQuestion,
  } = props;

  const getQueNav = (questions) =>
    questions.map((question, i) => {
      const isSelected = selectedQuestion.id === question.id;
      const isVisited = visitedQuestions.includes(question.id);
      return (
        <Grid
          item
          className={`queNavBtn ${
            isSelected
              ? "selected"
              : selectedAnswers.find((a) => a.question_id === question.id)
                  .userAnswer.length > 0
              ? "answered"
              : isVisited
              ? "visited"
              : ""
          }`}
          textAlign="center"
          onClick={() => {
            getQuestion(question.id);
            if (!isVisited) {
              setVisitedQuestions((prev) => [...prev, question.id]);
            }
          }}
          key={i}
          id={i + 1}
          xs={2}
        >
          {`${i + 1}`.padStart(2, "0")}
        </Grid>
      );
    });

  const showLegend = (bgColor, title) => (
    <>
      <Grid
        item
        xs={2}
        textAlign="center"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `${bgColor}`,
          height: 20,
          margin: 1,
          borderRadius: "25%/50%",
        }}
      />
      <Grid
        item
        xs={7}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 25,
          margin: 1,
        }}
      >
        {title}
      </Grid>
    </>
  );

  return (
    <div>
      <DraggableLocalStream
        instance={instance}
        InputDeviceIds={InputDeviceIds}
        zConfig={zConfig}
        entireScreenStream={entireScreenStream}
        downloadVideo={downloadVideo}
      />

      {sections.map((item) => {
        return (
          <SectionAccordion
            key={item.id}
            title={item.title}
            data={getQueNav(item.questions)}
          />
        );
      })}
      <hr />
      <Grid container textAlign="center">
        {showLegend(null, "Unanswered")}
        {showLegend("lightblue", "Selected")}
        {showLegend("rgb(230, 130, 130)", "Visited")}
        {showLegend("#0b815a", "Answered")}
      </Grid>
    </div>
  );
}
