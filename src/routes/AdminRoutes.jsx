import { Route } from "react-router-dom";
import Dashboard from "../admin/dashboard/Dashboard";
import Login from "../admin/login/Login";
import User from "../admin/user/User";
import ViewStream from "../admin/stream/ViewStream";
import Quiz from "../admin/quiz/Quiz";
import Stream from "../admin/stream/Stream";
import AddQuiz from "../admin/quiz/AddQuiz";
import EditQuiz from "../admin/quiz/EditQuiz";
import EditUser from "../admin/user/EditUser";
import AdminLayout from "../admin/AdminLayout";

const AdminRoutes = (
  <Route path="/admin" key="Admin">
    <Route index element={<Login />} />
    <Route element={<AdminLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="user">
        <Route index element={<User />} />
        <Route path="edit" element={<EditUser />} />
      </Route>
      <Route path="quiz">
        <Route index element={<Quiz />} />
        <Route path="add" element={<AddQuiz />} />
        <Route path="edit" element={<EditQuiz />} />
      </Route>
      <Route path="stream">
        <Route index element={<Stream />} />
        <Route path="view" element={<ViewStream />} />
      </Route>
    </Route>
  </Route>
);

export default AdminRoutes;
