import { Route } from "react-router-dom";
import Home from "../user/home/Home";
import Login from "../user/login/Login";
import AttemptQuiz from "../user/quiz/AttemptQuiz";
import Quiz from "../user/quiz/Quiz";

const UserRoutes = [
  <Route path="/" element={<Home />} key="home"></Route>,
  <Route path="/login" element={<Login />} key="login"></Route>,
  <Route path="/quiz" key="quiz">
    <Route index element={<Quiz />}></Route>
    <Route path="start" element={<AttemptQuiz />} />
  </Route>,
];

export default UserRoutes;
