import React from "react";
import DraggableLocalStream from "../components/DraggableLocalStream";
import { Grid } from "@mui/material";
import SectionAccordion from "./SectionAccordion";

export default function QuestionNavigation(props) {
  const { que, setQue } = props;

  const showLegends = (bgColor, title) => {
    console.log(bgColor);
    return (
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
        ></Grid>
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
  };

  const getQueNav = () => {
    const rows = [];
    for (let i = 1; i <= 30; i++) {
      rows.push(
        <Grid
          item
          className={i === que ? "selected" : "queNavBtn"}
          textAlign="center"
          onClick={(e) => handleQuestion(e)}
          key={i}
          id={i}
          xs={2}
        >
          {i < 10 ? "0" + i : i}
        </Grid>
      );
    }
    return rows;
  };

  const handleQuestion = (e) => {
    console.log(e.target.id);
    setQue(e.target.id);
    e.target.classList.remove("queNavBtn");
    e.target.classList.add("selected");
  };

  return (
    <div>
      {/* <DraggableLocalStream /> */}
      <SectionAccordion title="Section 01" data={getQueNav()} />
      <SectionAccordion title="Section 02" data={getQueNav()} disabled={true} />

      <Grid container textAlign="center">
        {showLegends("black", "Unanswered")}
        {showLegends("#0b815a", "Answered")}
      </Grid>
    </div>
  );
}
