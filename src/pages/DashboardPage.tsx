import { useAuth } from "../context/AuthContext";
import SuperAdminDashboard from "./SuperAdminDashboardPage";
import CompanyDashboardPage from "./CompanyDashboardPage";

function DashboardPage() {
  const { user } = useAuth();

  if (user?.role === "SUPER_ADMIN") {
    return <SuperAdminDashboard />;
  }

  return <CompanyDashboardPage />;
}

export default DashboardPage;
