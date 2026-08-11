import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./layouts/AppLayout";
import EmployeesPage from "./pages/EmployeesPage";
import CandidatesPage from "./pages/CandidatesPage";
import JobsPage from "./pages/JobsPage";
import AttendancePage from "./pages/AttendancePage";
import LeavesPage from "./pages/LeavesPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/employees" element={<EmployeesPage />} />

            <Route path="/candidates" element={<CandidatesPage />} />

            <Route path="/jobs" element={<JobsPage />} />

            <Route path="/attendance" element={<AttendancePage />} />

            <Route path="/leaves" element={<LeavesPage />} />
          </Route>
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
