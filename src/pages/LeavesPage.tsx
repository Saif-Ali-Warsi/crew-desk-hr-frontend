import { useEffect, useState } from "react";
import { getLeaves, approveLeave, rejectLeave } from "../api/leave";
import type { Leave } from "../types/leave";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function LeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [processingLeaveId, setProcessingLeaveId] = useState<string | null>(
    null,
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const result = await getLeaves();

        if (result.success) {
          setLeaves(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch leaves:", error);
        setError("Failed to load leave requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const result = await getLeaves();

      if (result.success) {
        setLeaves(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch leaves:", error);
    }
  };

  const handleLeaveAction = async (
    leaveId: string,
    action: "approve" | "reject",
  ) => {
    setProcessingLeaveId(leaveId);

    try {
      const result =
        action === "approve"
          ? await approveLeave(leaveId)
          : await rejectLeave(leaveId);

      if (result.success) {
        await fetchLeaves();
        toast.success(`Leave ${action} Successfully:`);
      }
    } catch (error) {
      console.error(`Failed to ${action} leave:`, error);
    } finally {
      setProcessingLeaveId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-8 w-40 rounded-lg bg-gray-200" />
          <div className="h-10 w-64 rounded-md bg-gray-200" />
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-40 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 w-16 rounded-full bg-gray-200" />
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
        <p className="font-semibold">Failed to load leaves</p>
        <p className="mt-1">{error}</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Leaves
        </h1>

        <button
  type="button"
  onClick={() => navigate("/leaves/new")}
  className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
>
  + Apply Leave
</button>
      </div>

      {leaves.length === 0 ? (
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900">
            No leaves data found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or refresh the page.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
                <tr>
                  <th className="px-6 py-3.5">Employee</th>
                  <th className="px-6 py-3.5">Leave type</th>
                  <th className="px-6 py-3.5">Start Date</th>
                  <th className="px-6 py-3.5">End Date</th>
                  <th className="px-6 py-3.5">Reason</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {leaves.map((leave) => (
                  <tr
                    key={leave.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {leave.employee.firstName} {leave.employee.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {leave.leaveType}
                    </td>
                    <td className="px-6 py-4">
                      {leave.startDate
                        ? new Date(leave.startDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {leave.endDate
                        ? new Date(leave.endDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">{leave.reason}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          leave.status?.toLowerCase() === "active"
                            ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                            : "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/10"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {leave.status === "PENDING" ? (
                          <>
                            <button
                              type="button"
                              disabled={processingLeaveId === leave.id}
                              onClick={() =>
                                handleLeaveAction(leave.id, "approve")
                              }
                              className="cursor-pointer inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 active:bg-emerald-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              {processingLeaveId === leave.id
                                ? "Processing..."
                                : "Approve"}
                            </button>

                            <button
                              type="button"
                              disabled={processingLeaveId === leave.id}
                              onClick={() =>
                                handleLeaveAction(leave.id, "reject")
                              }
                              className="cursor-pointer inline-flex items-center rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 active:bg-rose-200 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              {processingLeaveId === leave.id
                                ? "Processing..."
                                : "Reject"}
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="cursor-pointer inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            View Details
                          </button>
                        )}
                      </div>
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

export default LeavesPage;
