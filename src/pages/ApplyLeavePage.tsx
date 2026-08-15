import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { applyLeave } from "../api/leave";
import { getEmployees } from "../api/employees";

import type { ApplyLeavePayload } from "../types/leave";
import type { Employee } from "../types/employee";

type LeaveType = "CASUAL" | "SICK" | "EARNED" | "UNPAID";

interface ApplyLeaveForm {
  employeeId: string;
  leaveType: LeaveType | "";
  startDate: string;
  endDate: string;
  reason: string;
}

interface FormErrors {
  employeeId?: string;
  leaveType?: string;
  startDate?: string;
  endDate?: string;
  reason?: string;
}

function ApplyLeavePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ApplyLeaveForm>({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [employeesLoading, setEmployeesLoading] = useState(true);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await getEmployees();

        if (result.success) {
          setEmployees(result.data.items);
        }
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      } finally {
        setEmployeesLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.employeeId) {
      newErrors.employeeId = "Employee is required.";
    }

    if (!formData.leaveType) {
      newErrors.leaveType = "Leave type is required.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      newErrors.endDate = "End date cannot be before start date.";
    }

    const trimmedReason = formData.reason.trim();

    if (!trimmedReason) {
      newErrors.reason = "Reason is required.";
    } else if (trimmedReason.length < 5) {
      newErrors.reason = "Reason must be at least 5 characters.";
    } else if (trimmedReason.length > 500) {
      newErrors.reason = "Reason cannot exceed 500 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // At this point leaveType is guaranteed by validation.
      const payload: ApplyLeavePayload = {
        employeeId: formData.employeeId,
        leaveType: formData.leaveType as LeaveType,
        startDate: `${formData.startDate}T00:00:00.000Z`,
        endDate: `${formData.endDate}T00:00:00.000Z`,
        reason: formData.reason.trim(),
      };

      const result = await applyLeave(payload);

      if (result.success) {
        navigate("/leaves");
      }
    } catch (error) {
      console.error("Failed to apply leave:", error);
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="mx-auto max-w-2xl px-4 py-8">
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Apply Leave
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Submit a new leave request for an employee for approval.
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8"
    >
      <div className="space-y-6">
        <div>
          <label
            htmlFor="employee"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Employee
          </label>
          <div className="relative">
            <select
              id="employee"
              value={formData.employeeId}
              disabled={employeesLoading || loading}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  employeeId: event.target.value,
                })
              }
              className={`w-full appearance-none rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
                errors.employeeId
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/20"
              }`}
            >
              <option value="">
                {employeesLoading
                  ? "Loading employees..."
                  : "Select employee"}
              </option>
              {employees.map((employee) => (
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
          {errors.employeeId && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              {errors.employeeId}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="leaveType"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Leave Type
          </label>
          <div className="relative">
            <select
              id="leaveType"
              value={formData.leaveType}
              disabled={loading}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  leaveType: event.target.value as LeaveType | "",
                })
              }
              className={`w-full appearance-none rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
                errors.leaveType
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/20"
              }`}
            >
              <option value="">Select leave type</option>
              <option value="CASUAL">Casual</option>
              <option value="SICK">Sick</option>
              <option value="EARNED">Earned</option>
              <option value="UNPAID">Unpaid</option>
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
          {errors.leaveType && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              {errors.leaveType}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              value={formData.startDate}
              disabled={loading}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  startDate: event.target.value,
                })
              }
              className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
                errors.startDate
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/20"
              }`}
            />
            {errors.startDate && (
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {errors.startDate}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              value={formData.endDate}
              disabled={loading}
              min={formData.startDate || undefined}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  endDate: event.target.value,
                })
              }
              className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
                errors.endDate
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/20"
              }`}
            />
            {errors.endDate && (
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {errors.endDate}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="reason"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Reason
          </label>
          <textarea
            id="reason"
            rows={4}
            maxLength={500}
            value={formData.reason}
            disabled={loading}
            placeholder="Provide a brief explanation for the leave..."
            onChange={(event) =>
              setFormData({
                ...formData,
                reason: event.target.value,
              })
            }
            className={`w-full resize-none rounded-lg border bg-white p-3.5 text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
              errors.reason
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                : "border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/20"
            }`}
          />
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <div>
              {errors.reason && (
                <p className="flex items-center gap-1 text-xs font-medium text-rose-600">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  {errors.reason}
                </p>
              )}
            </div>
            <span className="text-xs font-medium text-slate-400">
              {formData.reason.length}/500
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
        <button
          type="button"
          disabled={loading}
          onClick={() => navigate("/leaves")}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || employeesLoading}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {loading ? (
            <>
              <svg className="-ml-1 mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Applying...
            </>
          ) : (
            "Apply Leave"
          )}
        </button>
      </div>
    </form>
  </div>
);
}

export default ApplyLeavePage;