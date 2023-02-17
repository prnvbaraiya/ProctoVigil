import { Route } from "react-router-dom";
import Dashboard from "../admin/dashboard/Dashboard";
import Login from "../admin/login/Login";
import User from "../admin/user/User";
import ViewStream from "../admin/stream/ViewStream";
import Quiz from "../admin/quiz/Quiz";
import Stream from "../admin/stream/Stream";
import AddQuiz from "../admin/quiz/AddQuiz";
import EditQuiz from "../admin/quiz/EditQuiz";

const AdminRoutes = [
  <Route path="/admin" key="Admin">
    <Route index element={<Login />}></Route>
    <Route path="dashboard" element={<Dashboard />}></Route>
    <Route path="user" element={<User />}></Route>
    <Route path="quiz">
      <Route index element={<Quiz />}></Route>
      <Route path="add" element={<AddQuiz />}></Route>
      <Route path="edit" element={<EditQuiz />}></Route>
    </Route>
    <Route path="stream">
      <Route index element={<Stream />}></Route>
      <Route path="view" element={<ViewStream />}></Route>
    </Route>
  </Route>,
];

export default AdminRoutes;
