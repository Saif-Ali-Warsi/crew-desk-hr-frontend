import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard";
import type { DashboardData } from "../types/dashboard";

function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getDashboard();

        if (result.success) {
          setDashboard(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-40 rounded-lg bg-gray-200" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-32 rounded-xl bg-gray-200" />
          <div className="h-32 rounded-xl bg-gray-200" />
          <div className="h-32 rounded-xl bg-gray-200" />
          <div className="h-32 rounded-xl bg-gray-200" />
          <div className="h-32 rounded-xl bg-gray-200 sm:col-span-2 lg:col-span-2" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!dashboard) {
    return (
      <div className="flex min-h-[380px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>

        <h3 className="mt-4 text-base font-semibold text-gray-900">
          No dashboard data available
        </h3>

        <p className="mt-1 max-w-sm text-sm text-gray-500">
          There is currently no metric data to display. Please refresh or try
          again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Employees Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Employees</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {dashboard.employees}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-3">
            <span>
              Active:{" "}
              <strong className="text-green-600 font-medium">
                {dashboard.activeEmployees}
              </strong>
            </span>
            <span>
              Inactive:{" "}
              <strong className="text-gray-400 font-medium">
                {dashboard.inactiveEmployees}
              </strong>
            </span>
          </div>
        </div>

        {/* Jobs Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Jobs</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {dashboard.jobs}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-3">
            <span>
              Open:{" "}
              <strong className="text-blue-600 font-medium">
                {dashboard.openJobs}
              </strong>
            </span>
            <span>
              Closed:{" "}
              <strong className="text-gray-400 font-medium">
                {dashboard.closedJobs}
              </strong>
            </span>
          </div>
        </div>

        {/* Candidates Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Candidates</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {dashboard.candidates}
          </p>
          <div className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
            Total active applicants
          </div>
        </div>

        {/* Attendance Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Today's Attendance
          </p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {dashboard.todayAttendance}
          </p>
          <div className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
            Present today
          </div>
        </div>

        {/* Leaves Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-2">
          <p className="text-sm font-medium text-gray-500">Leaves Overview</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-amber-50 p-3">
              <p className="text-xs text-amber-700 font-medium">
                Pending Requests
              </p>
              <p className="mt-1 text-2xl font-semibold text-amber-900">
                {dashboard.pendingLeaves}
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-3">
              <p className="text-xs text-emerald-700 font-medium">
                Approved Requests
              </p>
              <p className="mt-1 text-2xl font-semibold text-emerald-900">
                {dashboard.approvedLeaves}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
