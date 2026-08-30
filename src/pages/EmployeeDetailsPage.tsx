import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../api/employees";
import type { Employee } from "../types/employee";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../api/employees";
import ConfirmModal from "../components/ConfirmModel";
import { toast } from "react-toastify";

function EmployeeDetailsPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError(t("employeeDetails.employeeIdMissing"));
      setLoading(false);
      return;
    }

    const fetchEmployee = async () => {
      try {
        const result = await getEmployeeById(id);

        if (result.success) {
          setEmployee(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch employee:", error);
        setError(t("employeeDetails.failedToLoad"));
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleDeleteClick = (id: string) => {
    setSelectedEmployeeId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEmployeeId) return;

    try {
      setIsDeleting(true);
      await deleteEmployee(selectedEmployeeId);

      setIsDeleteModalOpen(false);
      setSelectedEmployeeId(null);
      navigate("/employees");
      toast.success(t("employeeDetails.deleteSuccess"));
    } catch (error) {
      console.error(error);
      toast.error(t("employeeDetails.deleteFailed"));
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 animate-pulse">
        <div className="h-8 w-48 rounded-lg bg-gray-200" />
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
            <div className="h-16 w-16 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-6 w-40 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-5 w-36 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <p className="font-semibold">
          {t("employeeDetails.failedToLoadDetails")}
        </p>
        <p className="mt-1">{error}</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="mx-auto flex min-h-[360px] max-w-4xl flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-base font-semibold text-gray-900">
          {t("employeeDetails.employeeNotFound")}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {t("employeeDetails.employeeNotFoundDescription")}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {t("employeeDetails.title")}
        </h1>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="relative flex flex-col gap-4 border-b border-gray-100 bg-gray-50/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-xl uppercase font-bold text-white shadow-sm">
              {employee.firstName?.[0]}
              {employee.lastName?.[0]}
            </div>
            <div>
              <h2 className="text-xl capitalize font-bold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-sm font-medium text-gray-500">
                {employee.designation}
              </p>
            </div>
          </div>

          <button
            className="cursor-pointer absolute -top-1 right-6 z-10 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 hover:bg-red-50 hover:text-red-600"
            onClick={() => handleDeleteClick(employee.id)}
          >
            {t("employeeDetails.delete")}
          </button>

          <ConfirmModal
            isOpen={isDeleteModalOpen}
            title={t("employeeDetails.deleteEmployee")}
            message={t("employeeDetails.deleteConfirmation")}
            confirmLabel={t("employeeDetails.delete")}
            isLoading={isDeleting}
            onConfirm={handleConfirmDelete}
            onClose={() => setIsDeleteModalOpen(false)}
          />

          <Link to={`/employees/${employee.id}/edit`}>
            <button className="cursor-pointer absolute -top-1 right-24 z-10 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              {t("employeeDetails.edit")}
            </button>
          </Link>

          <span
            className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              employee.status?.toLowerCase() === "active"
                ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                : "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/10"
            }`}
          >
            {employee.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
              {t("employeeDetails.employeeCode")}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-gray-900">
              {employee.employeeCode}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
              {t("employeeDetails.emailAddress")}
            </dt>
            <dd className="mt-1 text-sm font-medium text-gray-900">
              {employee.email}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
              {t("employeeDetails.phoneNumber")}
            </dt>
            <dd className="mt-1 text-sm font-medium text-gray-900">
              {employee.phone ?? t("employeeDetails.na")}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
              {t("employeeDetails.employmentType")}
            </dt>
            <dd className="mt-1 text-sm font-medium text-gray-900 capitalize">
              {employee.employmentType}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
              {t("employeeDetails.joiningDate")}
            </dt>
            <dd className="mt-1 text-sm font-medium text-gray-900">
              {new Date(employee.joiningDate).toLocaleDateString()}
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetailsPage;
