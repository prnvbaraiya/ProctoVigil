import { Route } from "react-router-dom";
import Login from "../admin/login/Login";

const AdminRoutes = [
  <Route path="/admin" key="Admin">
    <Route path="login" element={<Login />}></Route>
  </Route>,
];

export default AdminRoutes;
