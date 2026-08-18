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
    !attendance.some(
      (record) => record.employeeId === employee.id
    )
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Attendance
        </h1>
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
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md px-4 py-2.5">
  <div className="relative flex-1">
    <select
      value={selectedEmployeeId}
      onChange={(event) => setSelectedEmployeeId(event.target.value)}
      className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-700 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
    >
      <option value="">Select employee</option>
      {availableEmployees.map((employee) => (
        <option key={employee.id} value={employee.id}>
          {employee.firstName} {employee.lastName}
        </option>
      ))}
    </select>
    
    
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
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
       
        <svg className="-ml-1 mr-2 h-4 w-4 animate-spin text-slate-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Clocking In...
      </>
    ) : (
      "Clock In"
    )}
  </button>
</div>
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
                          className="cursor-pointer inline-flex items-center rounded-md bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white"
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
      )}
    </div>
  );
}

export default AttendancePage;
