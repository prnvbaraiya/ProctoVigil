import React from "react";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import TeacherRoutes from "./routes/TeacherRoutes";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./pages/Test";
import RequireAuth from "./auth/RequireAuth";

function App() {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="App"
      onContextMenu={handleContextMenu}
      onCopy={handleContextMenu}
      onCut={handleContextMenu}
      onPaste={handleContextMenu}
    >
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            element={<RequireAuth allowedRoles={["admin"]} />}
            key="Student"
          >
            <Route path="/test" element={<Test />} />
          </Route>
          {UserRoutes}
          {AdminRoutes}
          {TeacherRoutes}
          <Route path="*" element={<Navigate to="/page-not-found" replace />} />
        </Routes>
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
