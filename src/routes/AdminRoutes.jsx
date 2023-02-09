import { Route } from "react-router-dom";
import Dashboard from "../admin/dashboard/Dashboard";
import Login from "../admin/login/Login";
import User from "../admin/user/User";
import ViewStream from "../admin/stream/ViewStream";

const AdminRoutes = [
  <Route path="/admin" key="Admin">
    <Route index element={<Login />}></Route>
    <Route path="dashboard" element={<Dashboard />}></Route>
    <Route path="user" element={<User />}></Route>
    <Route path="stream" element={<ViewStream />}></Route>
  </Route>,
];

export default AdminRoutes;
