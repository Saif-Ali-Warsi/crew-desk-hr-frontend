import { useEffect, useState } from "react";
import { getLeaves, approveLeave, rejectLeave } from "../api/leave";
import type { Leave } from "../types/leave";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [processingLeaveId, setProcessingLeaveId] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<"table" | "card">(() => {
    return window.innerWidth < 768 ? "card" : "table";
  });

  const navigate = useNavigate();

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
        toast.success(`Leave ${action}ed Successfully`);
      }
    } catch (error) {
      console.error(`Failed to ${action} leave:`, error);
    } finally {
      setProcessingLeaveId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const formatted = status.toUpperCase();
    switch (formatted) {
      case "APPROVED":
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
      case "REJECTED":
        return "bg-red-50 text-red-700 ring-red-600/20";
      case "PENDING":
        return "bg-amber-50 text-amber-700 ring-amber-600/20";
      default:
        return "bg-gray-100 text-gray-600 ring-gray-500/10";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-8 w-40 rounded-lg bg-gray-200" />
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
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

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`cursor-pointer flex h-8 w-8 items-center justify-center rounded-md transition-all ${
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
              className={`cursor-pointer flex h-8 w-8 items-center justify-center rounded-md transition-all ${
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

          {leaves.length > 0 && (
            <button
              type="button"
              onClick={() => navigate("/leaves/new")}
              className="cursor-pointer w-max inline-flex items-center rounded-lg border border-teal-600 bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              + Apply Leave
            </button>
          )}
        </div>
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
      ) : viewMode === "table" ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                <tr className="text-white bg-teal-600">
                  <th className="px-6 py-3.5">Employee</th>
                  <th className="px-6 py-3.5">Leave type</th>
                  <th className="px-6 py-3.5">Start Date</th>
                  <th className="px-6 py-3.5">End Date</th>
                  <th className="px-6 py-3.5">Reason</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {leaves.map((leave) => (
                  <tr
                    key={leave.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {leave.employee.firstName} {leave.employee.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {leave.leaveType}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {leave.startDate
                        ? new Date(leave.startDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {leave.endDate
                        ? new Date(leave.endDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={leave.reason}>
                      {leave.reason}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${getStatusBadge(
                          leave.status
                        )}`}
                      >
                        {leave.status?.toLowerCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
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
                            className="cursor-pointer inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none"
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
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leaves.map((leave) => (
            <div
              key={leave.id}
              className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-gray-300"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {leave.employee.firstName} {leave.employee.lastName}
                    </h3>
                    <p className="text-xs font-medium text-indigo-600 mt-0.5">
                      {leave.leaveType}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${getStatusBadge(
                      leave.status
                    )}`}
                  >
                    {leave.status?.toLowerCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-50 p-3 text-center">
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-gray-400">
                      Start Date
                    </p>
                    <p className="mt-0.5 font-mono text-xs font-medium text-gray-700">
                      {leave.startDate
                        ? new Date(leave.startDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-gray-400">
                      End Date
                    </p>
                    <p className="mt-0.5 font-mono text-xs font-medium text-gray-700">
                      {leave.endDate
                        ? new Date(leave.endDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {leave.reason && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-gray-400">
                      Reason
                    </p>
                    <p className="mt-0.5 text-xs text-gray-600 line-clamp-2">
                      {leave.reason}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                {leave.status === "PENDING" ? (
                  <>
                    <button
                      type="button"
                      disabled={processingLeaveId === leave.id}
                      onClick={() => handleLeaveAction(leave.id, "approve")}
                      className="cursor-pointer flex-1 text-center rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                    >
                      {processingLeaveId === leave.id
                        ? "Processing..."
                        : "Approve"}
                    </button>

                    <button
                      type="button"
                      disabled={processingLeaveId === leave.id}
                      onClick={() => handleLeaveAction(leave.id, "reject")}
                      className="cursor-pointer flex-1 text-center rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors disabled:opacity-50"
                    >
                      {processingLeaveId === leave.id
                        ? "Processing..."
                        : "Reject"}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="cursor-pointer w-full text-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LeavesPage;