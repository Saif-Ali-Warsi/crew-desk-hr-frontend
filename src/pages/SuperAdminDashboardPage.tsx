import { useEffect, useState } from "react";
import { getSuperAdminDashboard } from "../api/dashboard";

interface SuperAdminDashboardData {
  companies: number;
  activeCompanies: number;
  inactiveCompanies: number;
  users: number;
  activeUsers: number;
  inactiveUsers: number;
  employees: number;
  jobs: number;
  openJobs: number;
  closedJobs: number;
  candidates: number;
}

function SuperAdminDashboardPage() {
  const [data, setData] = useState<SuperAdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const response = await getSuperAdminDashboard()

        setData(response.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Failed to load Super Admin dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div>Loading Super Admin dashboard...</div>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
        {error}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Super Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of the entire Crew Desk HR platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Companies"
          value={data.companies}
        />

        <DashboardCard
          title="Active Companies"
          value={data.activeCompanies}
        />

        <DashboardCard
          title="Inactive Companies"
          value={data.inactiveCompanies}
        />

        <DashboardCard
          title="Total Users"
          value={data.users}
        />

        <DashboardCard
          title="Active Users"
          value={data.activeUsers}
        />

        <DashboardCard
          title="Inactive Users"
          value={data.inactiveUsers}
        />

        <DashboardCard
          title="Total Employees"
          value={data.employees}
        />

        <DashboardCard
          title="Total Jobs"
          value={data.jobs}
        />

        <DashboardCard
          title="Open Jobs"
          value={data.openJobs}
        />

        <DashboardCard
          title="Closed Jobs"
          value={data.closedJobs}
        />

        <DashboardCard
          title="Candidates"
          value={data.candidates}
        />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: number;
}

function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-3 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default SuperAdminDashboardPage;