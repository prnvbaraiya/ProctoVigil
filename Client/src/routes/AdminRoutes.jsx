import React from "react";
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
import RequireAuth from "../auth/RequireAuth";
import Settings from "../pages/admin/settings/Settings";
import ViewPhase from "../pages/admin/phase/ViewPhase";
import EditPhase from "../pages/admin/phase/EditPhase";
import ViewResult from "../pages/admin/Result/ViewResult";
import AddUser from "../pages/admin/user/AddUser";
import ViewRecording from "../pages/admin/recording/ViewRecording";
import ViewInterview from "../pages/admin/interview/ViewInterview";
import AddInterview from "../pages/admin/interview/AddInterview";
import EditInterview from "../pages/admin/interview/EditInterview";
import Gradding from "../pages/admin/Result/Gradding";
import AIAnalyzer from "../pages/admin/ai-analyzer/AIAnalyzer";
import ViewFeedback from "../pages/admin/feedback/ViewFeedback";
import DetailFeedback from "../pages/admin/feedback/DetailFeedback";
import ViewPaymentRecords from "../pages/admin/payment-records/ViewPaymentRecords";
import DetailPaymentRecord from "../pages/admin/payment-records/DetailPaymentRecord";

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
        <Route path="add" element={<AddUser />} />
        <Route path="edit" element={<EditUser />} />
      </Route>
      <Route path="payment-records">
        <Route index element={<ViewPaymentRecords />} />
        <Route path="detail" element={<DetailPaymentRecord />} />
      </Route>
      <Route path="quiz">
        <Route index element={<Quiz />} />
        <Route path="add" element={<AddQuiz />} />
        <Route path="edit" element={<EditQuiz />} />
      </Route>
      <Route path="interview">
        <Route index element={<ViewInterview />} />
        <Route path="add" element={<AddInterview />} />
        <Route path="edit" element={<EditInterview />} />
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
        <Route path="gradding" element={<Gradding />} />
      </Route>
      <Route path="recording">
        <Route index element={<ViewRecording />} />
      </Route>
      <Route path="ai-analyzer">
        <Route index element={<AIAnalyzer />} />
      </Route>
      <Route path="feedback">
        <Route index element={<ViewFeedback />} />
        <Route path="detail" element={<DetailFeedback />} />
      </Route>
      <Route path="settings">
        <Route index element={<Settings />} />
      </Route>
    </Route>
  </Route>
);

export default AdminRoutes;
