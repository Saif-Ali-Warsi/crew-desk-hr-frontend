import { useEffect, useState } from "react";
import { getSuperAdminDashboard } from "../api/dashboard";
import { Link } from "react-router-dom";

const CARD_ICONS = {
  employees:
    "https://www.image2url.com/r2/default/images/1787332452279-acfe9ae4-6832-49e7-9845-043b93cec4aa.png",
  jobs: "https://www.image2url.com/r2/default/images/1787332448809-37f1002f-615f-4674-b238-c26379a1a884.png",
  candidates:
    "https://www.image2url.com/r2/default/images/1787332437873-0945da7f-9e78-41fa-9802-857f19a024cc.png",
  attendance:
    "https://www.image2url.com/r2/default/images/1787332440196-9fbce7f5-b7ad-42c3-b8ee-a94bc9349dab.png",
  leaves:
    "https://www.image2url.com/r2/default/images/1787332448189-70eeacea-16c6-49ee-80b5-86de63b8ed2a.png",
};

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
        const response = await getSuperAdminDashboard();
        setData(response.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Failed to load Super Admin dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-64 rounded-lg bg-slate-200" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-40 rounded-2xl bg-slate-200 ${
                i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 shadow-xs">
        <p className="font-semibold">Failed to load Dashboard</p>
        <p className="mt-1 text-xs opacity-90">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[380px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-8 text-center shadow-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
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
        <h3 className="mt-4 text-base font-semibold text-slate-900">
          No dashboard data available
        </h3>
        <p className="mt-1 max-w-sm text-xs text-slate-500">
          There is currently no platform metric data to display.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Super Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Platform-wide metrics, multi-tenant system statistics, and overall platform usage.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#009689]/10 px-3 py-1 text-xs font-semibold text-[#009689] sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-[#009689] animate-pulse"></span>
          {data.activeCompanies} Active Tenants
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        
        <Link to="/companies" className="sm:col-span-2 lg:col-span-2">
          <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:bg-teal-50 hover:shadow-md hover:border-slate-100">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50/80 ring-1 ring-teal-600/10 p-2">
                    <img
                      src={CARD_ICONS.employees}
                      alt="Companies"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Companies Overview
                  </p>
                </div>
                <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-[#009689] ring-1 ring-inset ring-teal-600/20">
                  Total: {data.companies}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 py-2 transition-colors hover:bg-emerald-50">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-emerald-800">
                      Active Companies
                    </p>
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="mt-2 text-2xl font-extrabold text-emerald-950">
                    {data.activeCompanies}
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-700/80">
                    Operational tenants
                  </p>
                </div>

                <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4 py-2 transition-colors hover:bg-amber-50">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-amber-800">
                      Inactive Companies
                    </p>
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  </div>
                  <p className="mt-2 text-2xl font-extrabold text-amber-950">
                    {data.inactiveCompanies}
                  </p>
                  <p className="mt-1 text-[11px] text-amber-700/80">
                    Suspended or onboarding
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/users">
          <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:bg-teal-50 hover:shadow-md hover:border-slate-100">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#009689]/10 ring-1 ring-[#009689]/20 p-2">
                    <img
                      src={CARD_ICONS.attendance}
                      alt="Users"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total System Users
                  </p>
                </div>
                <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-[#009689] ring-1 ring-inset ring-teal-600/20">
                  Accounts
                </span>
              </div>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
                {data.users}
              </p>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
              <span className="text-slate-600">
                Active:{" "}
                <strong className="font-semibold text-emerald-600">
                  {data.activeUsers}
                </strong>
              </span>
              <span className="text-slate-400">
                Inactive:{" "}
                <strong className="font-medium text-slate-500">
                  {data.inactiveUsers}
                </strong>
              </span>
            </div>
          </div>
        </Link>

        <Link to="/employees">
          <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:bg-teal-50 hover:shadow-md hover:border-slate-100">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50/80 ring-1 ring-teal-600/10 p-2">
                    <img
                      src={CARD_ICONS.employees}
                      alt="Employees"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total Employees
                  </p>
                </div>
                <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-[#009689] ring-1 ring-inset ring-teal-600/20">
                  Global
                </span>
              </div>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
                {data.employees}
              </p>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-3 text-xs text-slate-500">
              Total active workforce profiles created across all tenant platforms
            </div>
          </div>
        </Link>

        <Link to="/jobs">
          <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:bg-teal-50 hover:shadow-md hover:border-slate-100">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50/80 ring-1 ring-blue-600/10 p-2">
                    <img
                      src={CARD_ICONS.jobs}
                      alt="Jobs"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Platform Jobs
                  </p>
                </div>
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600 ring-1 ring-inset ring-blue-600/20">
                  {data.jobs} Total
                </span>
              </div>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
                {data.jobs}
              </p>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
              <span className="text-slate-600">
                Open:{" "}
                <strong className="font-semibold text-sky-600">
                  {data.openJobs}
                </strong>
              </span>
              <span className="text-slate-400">
                Closed:{" "}
                <strong className="font-medium text-slate-500">
                  {data.closedJobs}
                </strong>
              </span>
            </div>
          </div>
        </Link>

        <Link to="/candidates">
          <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:bg-teal-50 hover:shadow-md hover:border-slate-100">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50/80 ring-1 ring-indigo-600/10 p-2">
                    <img
                      src={CARD_ICONS.candidates}
                      alt="Candidates"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total Candidates
                  </p>
                </div>
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-600/20">
                  Pipeline
                </span>
              </div>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
                {data.candidates}
              </p>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-3 text-xs text-slate-500">
              Total applicants currently in system talent pools
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default SuperAdminDashboardPage;