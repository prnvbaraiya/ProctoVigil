import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../pages/teacher/dashboard/Dashboard";
import ViewStream from "../pages/admin/stream/ViewStream";
import ViewQuiz from "../pages/teacher/quiz/ViewQuiz";
import Stream from "../pages/teacher/stream/Stream";
import AdminLayout from "../pages/admin/AdminLayout";
import ViewUser from "../pages/admin/user/ViewUser";
import AddQuiz from "../pages/teacher/quiz/AddQuiz";
import EditQuiz from "../pages/admin/quiz/EditQuiz";
import EditUser from "../pages/admin/user/EditUser";
import PageNotFound from "../pages/PageNotFound";
import RequireAuth from "../auth/RequireAuth";
import Settings from "../pages/admin/settings/Settings";
import ViewPhase from "../pages/teacher/phase/ViewPhase";
import EditPhase from "../pages/admin/phase/EditPhase";
import ViewResult from "../pages/admin/Result/ViewResult";
import AddUser from "../pages/admin/user/AddUser";
import ViewRecording from "../pages/admin/recording/ViewRecording";
import ViewInterview from "../pages/admin/interview/ViewInterview";
import AddInterview from "../pages/admin/interview/AddInterview";
import EditInterview from "../pages/admin/interview/EditInterview";
import Gradding from "../pages/admin/Result/Gradding";
import Payment from "../pages/teacher/payment/Payment";
import AIAnalyzer from "../pages/teacher/ai-analyzer/AIAnalyzer";
import RequireSubscription from "../auth/RequireSubscription";
import ViewPaymentHistory from "../pages/teacher/payment-history/ViewPaymentHistory";
import DetailPaymentHistory from "../pages/teacher/payment-history/DetailPaymentHistory";

const TeacherRoutes = (
  <Route
    path="/teacher"
    element={<RequireAuth allowedRoles={["teacher"]} />}
    key="Teacher"
  >
    <Route element={<PageNotFound />} index />
    <Route element={<AdminLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="user">
        <Route index element={<ViewUser />} />
        <Route path="add" element={<AddUser />} />
        <Route path="edit" element={<EditUser />} />
      </Route>
      <Route path="payment-history">
        <Route index element={<ViewPaymentHistory />} />
        <Route path="detail" element={<DetailPaymentHistory />} />
      </Route>
      <Route path="quiz">
        <Route index element={<ViewQuiz />} />
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
      <Route element={<RequireSubscription />}>
        <Route path="ai-analyzer">
          <Route index element={<AIAnalyzer />} />
        </Route>
      </Route>
      <Route path="payment">
        <Route index element={<Payment />} />
      </Route>
      <Route path="settings">
        <Route index element={<Settings />} />
      </Route>
    </Route>
  </Route>
);

export default TeacherRoutes;
