import React from "react";
import { Route } from "react-router-dom";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import PageNotFound from "../pages/PageNotFound";
import RequireAuth from "../auth/RequireAuth";
import Unauthorized from "../pages/Unauthorized";
import Home from "../pages/user/home/Home";
import StartInterview from "../pages/user/interview/StartInterview";
import UserInterview from "../pages/user/interview/UserInterview";
import Quiz from "../pages/user/quiz/Quiz";
import StartQuiz from "../pages/user/quiz/StartQuiz";
import UserLayout from "../pages/user/UserLayout";

const UserRoutes = [
  <Route element={<UserLayout />} key="UserLayout">
    <Route path="/" element={<Home />} key="home"></Route>,
    <Route path="/about-us" element={<AboutUs />} key="about"></Route>,
    <Route path="/contact-us" element={<ContactUs />} key="contact"></Route>,
    <Route path="/unauthorized" element={<Unauthorized />} />,
    <Route path="/page-not-found" element={<PageNotFound />} />,
    <Route
      element={<RequireAuth allowedRoles={["student", "admin"]} />}
      key="Student"
    >
      <Route path="/quiz" element={<Quiz />} key="quiz"></Route>
      <Route path="/interview" element={<UserInterview />} />
      <Route path="/interview" key="interview">
        <Route path="start" element={<StartInterview />} />
      </Route>
    </Route>
  </Route>,
  <Route element={<RequireAuth allowedRoles={["student"]} />} key="Student">
    <Route path="/quiz" key="quiz">
      <Route path="start" element={<StartQuiz />} />
    </Route>
  </Route>,
];

export default UserRoutes;
