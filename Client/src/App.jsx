import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/index";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import Test from "./pages/Test";

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
          <Route path="/test" element={<Test />} />
          {UserRoutes}
          {AdminRoutes}
          <Route path="*" element={<Navigate to="/page-not-found" replace />} />
        </Routes>
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
