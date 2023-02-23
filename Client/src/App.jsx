import "./App.css";
import { Outlet, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/index";

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
          {UserRoutes}
          {AdminRoutes}
        </Routes>
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
