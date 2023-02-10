import { Route } from "react-router-dom";
import Home from "../user/home/Home";
import Login from "../user/login/Login";
import Quiz from "../user/quiz/Quiz";

const UserRoutes = [
  <Route path="/" element={<Home />} key="home"></Route>,
  <Route path="/login" element={<Login />} key="login"></Route>,
  <Route path="/quiz" element={<Quiz />} key="quiz"></Route>,
];

export default UserRoutes;
