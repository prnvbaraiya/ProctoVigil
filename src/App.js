import "./App.css";
import { Outlet, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/index";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          {UserRoutes}
          {AdminRoutes}
        </Routes>
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
