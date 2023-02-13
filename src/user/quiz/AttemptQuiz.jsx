import React, { useEffect } from "react";
import ExamLayout from "../ExamLayout";

function AttemptQuiz() {
  useEffect(() => {
    // if (!document.fullscreenElement) {
    //   document.documentElement.requestFullscreen();
    // }
    // window.addEventListener("offline", (event) => {
    //   alert("There is Problem with your internet");
    // });
    // window.addEventListener("blur", () => {
    //   alert("You are trying to change window please stay on this window");
    // });
    // return () => {
    //   window.removeEventListener("blur");
    //   window.removeEventListener("offline");
    // };
  }, []);

  return (
    <>
      <ExamLayout>
        <div>Here User will Give Quiz</div>
      </ExamLayout>
    </>
  );
}

export default AttemptQuiz;
