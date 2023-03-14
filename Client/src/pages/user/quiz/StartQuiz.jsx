import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import auth from "../../../auth/auth";
import { zegoInstance } from "../../../config/ZegoConfig";
import AttemptQuiz from "./AttemptQuiz";
import QuizInstructions from "./QuizInstructions";

function StartQuiz() {
  const location = useLocation();
  const [localS, setLocalS] = useState(null);
  const id = location.state?.id;
  const zConfig = {
    roomId: id,
    userId: auth.username,
    token: "",
    userName: auth.username,
  };
  const [sections, setSections] = useState([
    { title: "Instructions", completed: false },
  ]);
  const ref = useRef(null);
  const instance = zegoInstance();
  const [attemptQuizData, setAttemptQuizData] = useState({
    id: id,
    InputDeviceIds: {
      camera: "",
      audio: "",
    },
  });

  return (
    <>
      {!sections[0].completed ? (
        <QuizInstructions
          setAttemptQuizData={setAttemptQuizData}
          setSections={setSections}
          ref={ref}
          setLocalS={setLocalS}
          instance={instance}
        />
      ) : (
        <AttemptQuiz
          attemptQuizData={attemptQuizData}
          zConfig={zConfig}
          localS={localS}
          instance={instance}
        />
      )}
    </>
  );
}

export default StartQuiz;
