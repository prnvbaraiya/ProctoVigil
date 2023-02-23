import { Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/user/home/Home";
import AttemptQuiz from "../pages/user/quiz/AttemptQuiz";
import Quiz from "../pages/user/quiz/Quiz";
import UserLayout from "../pages/user/UserLayout";

const UserRoutes = [
  <Route element={<UserLayout />} key="UserLayout">
    <Route path="/" element={<Home />} key="home"></Route>,
    <Route path="/login" element={<Login />} key="login"></Route>,
  </Route>,
  <Route path="/quiz" key="quiz">
    <Route element={<UserLayout />}>
      <Route index element={<Quiz />}></Route>
    </Route>
    <Route path="start" element={<AttemptQuiz />} />
  </Route>,
];

export default UserRoutes;
