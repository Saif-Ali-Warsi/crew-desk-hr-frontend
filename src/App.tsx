import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./layouts/AppLayout";
AppLayout;

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
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
