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
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";
import CandidateDetailsPage from "./pages/CandidateDetailsPage";
import CreateCandidatePage from "./pages/CreateCandidatePage";
import EditCandidatePage from "./pages/EditCandidatePage";
import CreateJobPage from "./pages/CreateJobPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import EditJobPage from "./pages/EditJobPage";

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

            <Route path="/attendance" element={<AttendancePage />} />

            <Route path="/leaves" element={<LeavesPage />} />

            <Route path="/employees/:id" element={<EmployeeDetailsPage />} />

            <Route path="/employee/new" element={<CreateEmployeePage />} />

            <Route path="/employees/:id/edit" element={<EditEmployeePage />} />

            <Route path="/candidates/:id" element={<CandidateDetailsPage />} />

            <Route path="/candidates/new" element={<CreateCandidatePage />} />

            <Route
              path="/candidates/:id/edit"
              element={<EditCandidatePage />}
            />

            <Route path="/jobs" element={<JobsPage />} />

            <Route path="/jobs/new" element={<CreateJobPage />} />

            <Route path="/jobs/:id" element={<JobDetailsPage />} />

            <Route path="/jobs/:id/edit" element={<EditJobPage />} />
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
