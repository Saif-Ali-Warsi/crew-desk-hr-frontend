import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route
            path="/dashboard"
            element={
              <>
                <Header companyName="CrewDesk HR."></Header>
                <DashboardPage></DashboardPage>
              </>
            }
          ></Route>
        </Route>
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace></Navigate>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
