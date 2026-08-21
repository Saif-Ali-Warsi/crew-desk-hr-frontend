import { useEffect, useState } from "react";
import { getAttendance, clockOut, clockIn } from "../api/attendance";
import type { Attendance } from "../types/attendance";
import { formatTime } from "../utils/date";
import { getEmployees } from "../api/employees";
import type { Employee } from "../types/employee";

function AttendancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const [clockingOutEmployeeId, setClockingOutEmployeeId] = useState<
    string | null
  >(null);
  const [clockingInEmployeeId, setClockingInEmployeeId] = useState<
    string | null
  >(null);

  const [viewMode, setViewMode] = useState<"table" | "card">(() => {
    return window.innerWidth < 768 ? "card" : "table";
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode((prev) => (prev === "table" ? "card" : prev));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const result = await getAttendance();

        if (result.success) {
          setAttendance(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
        setError("Failed to load attendance.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await getEmployees();

        if (result.success) {
          setEmployees(result.data.items);
        }
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const availableEmployees = employees.filter(
    (employee) =>
      !attendance.some((record) => record.employeeId === employee.id),
  );

  const fetchAttendance = async () => {
    try {
      const result = await getAttendance();

      if (result.success) {
        setAttendance(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch attendance:", error);
    }
  };

  const handleClockIn = async (employeeId: string) => {
    setClockingInEmployeeId(employeeId);

    try {
      const result = await clockIn(employeeId);

      if (result.success) {
        await fetchAttendance();
        setSelectedEmployeeId("");
      }
    } catch (error) {
      console.error("Failed to clock in:", error);
    } finally {
      setClockingInEmployeeId(null);
    }
  };

  const handleClockOut = async (employeeId: string) => {
    setClockingOutEmployeeId(employeeId);

    try {
      const result = await clockOut(employeeId);

      if (result.success) {
        await fetchAttendance();
      }
    } catch (error) {
      console.error("Failed to clock out:", error);
    } finally {
      setClockingOutEmployeeId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const formatted = status.toUpperCase();
    switch (formatted) {
      case "PRESENT":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
      case "ABSENT":
        return "bg-red-50 text-red-700 ring-red-600/20";
      case "LATE":
      case "HALF_DAY":
        return "bg-amber-50 text-amber-700 ring-amber-600/20";
      default:
        return "bg-indigo-50 text-indigo-700 ring-indigo-700/10";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-40 rounded-lg bg-gray-200" />

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="ml-auto h-4 w-16 rounded bg-gray-200" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <div className="h-4 w-40 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 w-20 rounded-full bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-16 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-16 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-16 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="ml-auto h-6 w-16 rounded bg-gray-200" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <p className="font-semibold">Failed to load attendance records</p>
        <p className="mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Attendance
        </h1>

        <div className="flex items-center gap-3">
       
          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                viewMode === "table"
                  ? "bg-indigo-50 border border-indigo-200 shadow-xs"
                  : "hover:bg-gray-100"
              }`}
              title="Table View"
            >
              <img
                src="https://www.image2url.com/r2/default/images/1787238175143-4ec5690c-77ad-40fb-b362-25c2fc0e0e51.png"
                alt="Table View"
                className={`h-4 w-4 object-contain ${
                  viewMode === "table" ? "opacity-100" : "opacity-50"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                viewMode === "card"
                  ? "bg-indigo-50 border border-indigo-200 shadow-xs"
                  : "hover:bg-gray-100"
              }`}
              title="Card View"
            >
              <img
                src="https://www.image2url.com/r2/default/images/1787238173560-730ec86e-d60d-4dbb-85ff-fc15392d1a73.png"
                alt="Card View"
                className={`h-4 w-4 object-contain ${
                  viewMode === "card" ? "opacity-100" : "opacity-50"
                }`}
              />
            </button>
          </div>
             <div className="flex items-center gap-3">
            <div className="relative flex sm:flex-row sm:items-center gap-3 max-w-md">
              <select
                value={selectedEmployeeId}
                onChange={(event) => setSelectedEmployeeId(event.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-700 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">Select Employee</option>
                {availableEmployees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <button
              type="button"
              disabled={
                !selectedEmployeeId ||
                clockingInEmployeeId === selectedEmployeeId
              }
              onClick={() => handleClockIn(selectedEmployeeId)}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              {clockingInEmployeeId === selectedEmployeeId ? (
                <>
                  <svg
                    className="-ml-1 mr-2 h-4 w-4 animate-spin text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Clocking In...
                </>
              ) : (
                "Clock In"
              )}
            </button>
          </div>
        </div>
      </div>

      {attendance.length === 0 ? (
        <div className="flex min-h-[320px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900">
            No attendance records found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no log records available for the selected period.
          </p>
        </div>
      ) : viewMode === "table" ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3.5">Employee</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Clock In</th>
                  <th className="px-6 py-3.5">Clock Out</th>
                  <th className="px-6 py-3.5">Total Hours</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {attendance.map((record) => (
                  <tr
                    key={record.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {record.employee.firstName} {record.employee.lastName}
                      </div>
                      <div className="mt-0.5 font-mono text-xs text-gray-400">
                        {record.employee.employeeCode}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${getStatusBadge(
                          record.status,
                        )}`}
                      >
                        {record.status.toLowerCase().replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-600">
                      {formatTime(record.clockIn)}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-600">
                      {formatTime(record.clockOut)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {record.totalHours
                        ? `${Math.floor(Number(record.totalHours) * 10) / 10} hrs`
                        : "—"}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {record.clockOut === null ? (
                        <button
                          type="button"
                          disabled={clockingOutEmployeeId === record.employeeId}
                          onClick={() => handleClockOut(record.employeeId)}
                          className="cursor-pointer inline-flex items-center rounded-md bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
                        >
                          {clockingOutEmployeeId === record.employeeId
                            ? "Clocking Out..."
                            : "Clock Out"}
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-gray-400">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attendance.map((record) => (
            <div
              key={record.id}
              className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-gray-300"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {record.employee.firstName} {record.employee.lastName}
                    </h3>
                    <p className="font-mono text-xs text-gray-400">
                      {record.employee.employeeCode}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${getStatusBadge(
                      record.status,
                    )}`}
                  >
                    {record.status.toLowerCase().replace("_", " ")}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-50 p-3 text-center">
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-gray-400">
                      Clock In
                    </p>
                    <p className="mt-0.5 font-mono text-xs font-medium text-gray-700">
                      {formatTime(record.clockIn)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-gray-400">
                      Clock Out
                    </p>
                    <p className="mt-0.5 font-mono text-xs font-medium text-gray-700">
                      {formatTime(record.clockOut)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-gray-400">
                      Hours
                    </p>
                    <p className="mt-0.5 font-mono text-xs font-medium text-gray-900">
                      {record.totalHours
                        ? `${Math.floor(Number(record.totalHours) * 10) / 10}h`
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-end">
                {record.clockOut === null ? (
                  <button
                    type="button"
                    disabled={clockingOutEmployeeId === record.employeeId}
                    onClick={() => handleClockOut(record.employeeId)}
                    className="cursor-pointer w-full text-center rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
                  >
                    {clockingOutEmployeeId === record.employeeId
                      ? "Clocking Out..."
                      : "Clock Out"}
                  </button>
                ) : (
                  <span className="w-full text-center text-xs font-medium text-gray-400 py-1">
                    Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AttendancePage;
