import React, { useEffect, useRef } from "react";
import DraggableLocalStream from "./DraggableLocalStream";
import { Grid } from "@mui/material";
import SectionAccordion from "./SectionAccordion";

export default function QuestionNavigation(props) {
  const {
    selectedQuestion,
    zConfig,
    numQuestions,
    selectedAnswers,
    setSelectedQuestion,
    instance,
    visitedQuestions,
    setVisitedQuestions,
    InputDeviceIds,
    entireScreenStream,
  } = props;
  const screenRef = useRef(null);

  useEffect(() => {
    screenRef.current.srcObject = entireScreenStream;

    return () => {
      console.log(
        entireScreenStream.getTracks().forEach((item) => {
          item.stop();
        })
      );
    };
  }, []);

  const getQueNav = () =>
    [...Array(numQuestions)].map((_, i) => {
      const isSelected = selectedQuestion === i + 1;
      const isVisited = visitedQuestions.includes(i + 1);
      return (
        <Grid
          item
          className={`queNavBtn ${
            isSelected
              ? "selected"
              : selectedAnswers[i] !== null
              ? "answered"
              : isVisited
              ? "visited"
              : ""
          }`}
          textAlign="center"
          onClick={() => {
            setSelectedQuestion(i + 1);
            if (!isVisited) {
              setVisitedQuestions((prev) => [...prev, i + 1]);
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
      />
      <video
        ref={screenRef}
        style={{
          width: "300px",
          height: "225px",
          borderRadius: "10px",
          border: "1px solid black",
        }}
        autoPlay
        muted
      />
      <SectionAccordion title="Section 01" data={getQueNav()} />
      <SectionAccordion title="Section 02" data={"LOL"} disabled={true} />

      <Grid container textAlign="center">
        {showLegend(null, "Unanswered")}
        {showLegend("lightblue", "Selected")}
        {showLegend("rgb(230, 130, 130)", "Visited")}
        {showLegend("#0b815a", "Answered")}
      </Grid>
    </div>
  );
}
