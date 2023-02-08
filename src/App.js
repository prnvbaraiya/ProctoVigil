import "./App.css";
import { Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        {UserRoutes}
        {AdminRoutes}
      </Routes>
    </div>
  );
}

export default App;
