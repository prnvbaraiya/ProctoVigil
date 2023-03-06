import { Route } from "react-router-dom";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import ViewStream from "../pages/admin/stream/ViewStream";
import Quiz from "../pages/admin/quiz/Quiz";
import Stream from "../pages/admin/stream/Stream";
import AdminLayout from "../pages/admin/AdminLayout";
import ViewUser from "../pages/admin/user/ViewUser";
import AddQuiz from "../pages/admin/quiz/AddQuiz";
import EditQuiz from "../pages/admin/quiz/EditQuiz";
import EditUser from "../pages/admin/user/EditUser";
import PageNotFound from "../pages/PageNotFound";
import RequireAuth from "../pages/RequireAuth";
import Settings from "../pages/admin/settings/Settings";
import ViewPhase from "../pages/admin/phase/ViewPhase";
import EditPhase from "../pages/admin/phase/EditPhase";
import ViewResult from "../pages/admin/Result/ViewResult";

const AdminRoutes = (
  <Route
    path="/admin"
    element={<RequireAuth allowedRoles={["admin"]} />}
    key="Admin"
  >
    <Route element={<PageNotFound />} index />
    <Route element={<AdminLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="user">
        <Route index element={<ViewUser />} />
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
      <Route path="phase">
        <Route index element={<ViewPhase />} />
        <Route path="edit" element={<EditPhase />} />
      </Route>
      <Route path="result">
        <Route index element={<ViewResult />} />
      </Route>
      <Route path="settings">
        <Route index element={<Settings />} />
      </Route>
    </Route>
  </Route>
);

export default AdminRoutes;
