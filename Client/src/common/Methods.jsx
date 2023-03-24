import axios from "axios";

export const blueEvent = (setWarningCount) => {
  alert("You are trying to change window please stay on this window");
  setWarningCount((prev) => prev + 1);
};

export const offlineEvent = () => {
  alert("There is Problem with your internet");
};

export const suffeledArray = (oldArr) => {
  for (let i = oldArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [oldArr[i], oldArr[j]] = [oldArr[j], oldArr[i]];
  }
  return oldArr;
};

export const getRandomQuestions = async (length) => {
  const res = await axios.get(`https://opentdb.com/api.php?amount=${length}`);
  const tmpQuestions = res.data.results.map((item) => {
    return {
      type:
        item.type === "multiple"
          ? "singleChoice"
          : item.type === "boolean"
          ? "boolean"
          : "multipleChoice",
      question: item.question,
      options: [
        ...item.incorrect_answers.map((incoption) => {
          return { text: incoption, isCorrect: false };
        }),
        { text: item.correct_answer, isCorrect: true },
      ],
    };
  });
  return tmpQuestions;
};
