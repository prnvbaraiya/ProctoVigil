import { Route } from "react-router-dom";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import RequireAuth from "../pages/RequireAuth";
import Home from "../pages/user/home/Home";
import AttemptQuiz from "../pages/user/quiz/AttemptQuiz";
import Quiz from "../pages/user/quiz/Quiz";
import UserLayout from "../pages/user/UserLayout";

const UserRoutes = [
  <Route element={<UserLayout />} key="UserLayout">
    <Route path="/" element={<Home />} key="home"></Route>,
    <Route path="/about-us" element={<AboutUs />} key="about"></Route>,
    <Route path="/contact-us" element={<ContactUs />} key="contact"></Route>,
    <Route
      element={<RequireAuth allowedRoles={["student", "admin"]} />}
      key="Student"
    >
      <Route path="/quiz" element={<Quiz />} key="quiz"></Route>
    </Route>
  </Route>,
  <Route element={<RequireAuth allowedRoles={["student"]} />} key="Student">
    <Route path="/quiz" key="quiz">
      <Route path="start" element={<AttemptQuiz />} />
    </Route>
  </Route>,
];

export default UserRoutes;
