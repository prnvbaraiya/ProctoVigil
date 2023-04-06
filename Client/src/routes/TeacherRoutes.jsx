import { Route } from "react-router-dom";
import React from "react";
import Dashboard from "../pages/teacher/dashboard/Dashboard";
import ViewStream from "../pages/teacher/stream/ViewStream";
import Quiz from "../pages/teacher/quiz/Quiz";
import Stream from "../pages/teacher/stream/Stream";
import TeacherLayout from "../pages/teacher/TeacherLayout";
import ViewUser from "../pages/teacher/user/ViewUser";
import AddQuiz from "../pages/teacher/quiz/AddQuiz";
import EditQuiz from "../pages/teacher/quiz/EditQuiz";
import EditUser from "../pages/teacher/user/EditUser";
import PageNotFound from "../pages/PageNotFound";
import RequireAuth from "../pages/RequireAuth";
import Settings from "../pages/teacher/settings/Settings";
import ViewPhase from "../pages/teacher/phase/ViewPhase";
import EditPhase from "../pages/teacher/phase/EditPhase";
import ViewResult from "../pages/teacher/Result/ViewResult";
import AddUser from "../pages/teacher/user/AddUser";
import ViewRecording from "../pages/teacher/recording/ViewRecording";
import AIAnalyzer from "../pages/teacher/ai-analyzer/AIAnalyzer";

const TeacherRoutes = (
  <Route
    path="/teacher"
    element={<RequireAuth allowedRoles={["teacher","admin"]} />}
    key="Teacher"
  >
    <Route element={<PageNotFound />} index />
    <Route element={<TeacherLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="user">
        <Route index element={<ViewUser />} />
        <Route path="add" element={<AddUser />} />
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
      <Route path="ai-analyzer">
        <Route index element={<AIAnalyzer />} />
      </Route>
      <Route path="result">
        <Route index element={<ViewResult />} />
      </Route>
      <Route path="recording">
        <Route index element={<ViewRecording />} />
      </Route>
      <Route path="settings">
        <Route index element={<Settings />} />
      </Route>
    </Route>
  </Route>
);

export default TeacherRoutes;
