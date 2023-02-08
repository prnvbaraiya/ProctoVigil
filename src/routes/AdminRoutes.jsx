import { Route } from "react-router-dom";
import Dashboard from "../admin/dashboard/Dashboard";
import Login from "../admin/login/Login";

const AdminRoutes = [
  <Route path="/admin" key="Admin">
    <Route index element={<Login />}></Route>
    <Route path="dashboard" element={<Dashboard />}></Route>
  </Route>,
];

export default AdminRoutes;
