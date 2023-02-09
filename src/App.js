import "./App.css";
import { Routes } from "react-router-dom";
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
      </ThemeProvider>
    </div>
  );
}

export default App;
