import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee,
  type CreateEmployeePayload,
} from "../api/employees";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function EditEmployeePage() {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateEmployeePayload>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    joiningDate: "",
    employmentType: "FULL_TIME",
  });

  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    designation?: string;
    joiningDate?: string;
    employmentType?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      designation?: string;
      joiningDate?: string;
      employmentType?: string;
    } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("employeeForm.firstNameRequired");
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t("employeeForm.lastNameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("employeeForm.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("employeeForm.validEmail");
    }

    if (!formData.designation.trim()) {
      newErrors.designation = t("employeeForm.designationRequired");
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = t("employeeForm.joiningDateRequired");
    }

    if (!formData.employmentType) {
      newErrors.employmentType = t("employeeForm.employmentTypeRequired");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchEmployee = async () => {
      try {
        const result = await getEmployeeById(id);

        if (result.success) {
          const employee = result.data;

          setFormData({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone ?? "",
            designation: employee.designation,
            joiningDate: employee.joiningDate.split("T")[0],
            employmentType: employee.employmentType,
          });
        }
      } catch (error) {
        console.error("Failed to fetch employee:", error);
        toast.error(t("employeeForm.failedToLoad"));
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, t]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id || !validate()) {
      return;
    }

    setLoading(true);

    try {
      const result = await updateEmployee(id, {
        ...formData,
        joiningDate: new Date(`${formData.joiningDate}T00:00:00`).toISOString(),
      });

      if (result.success) {
        navigate(`/employees/${id}`);
        toast.success(t("employeeForm.employeeUpdated"));
      }
    } catch (error) {
      console.error("Failed to update employee:", error);
      toast.error(t("employeeForm.failedToUpdate"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {t("employeeForm.editTitle")}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {t("employeeForm.editDescription")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("employeeForm.firstName")}
            </label>

            <input
              type="text"
              placeholder={t("employeeForm.firstNamePlaceholder")}
              value={formData.firstName}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  firstName: event.target.value,
                })
              }
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                errors.firstName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />

            {errors.firstName && (
              <p className="text-xs text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("employeeForm.lastName")}
            </label>

            <input
              type="text"
              placeholder={t("employeeForm.lastNamePlaceholder")}
              value={formData.lastName}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  lastName: event.target.value,
                })
              }
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                errors.lastName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />

            {errors.lastName && (
              <p className="text-xs text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("employeeForm.emailAddress")}
            </label>

            <input
              type="email"
              placeholder={t("employeeForm.emailPlaceholder")}
              value={formData.email}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  email: event.target.value,
                })
              }
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />

            {errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("employeeForm.phoneNumber")}
            </label>

            <input
              type="text"
              placeholder={t("employeeForm.phonePlaceholder")}
              value={formData.phone}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  phone: event.target.value,
                })
              }
              className="mt-1.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("employeeForm.designation")}
            </label>

            <input
              type="text"
              placeholder={t("employeeForm.designationPlaceholder")}
              value={formData.designation}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  designation: event.target.value,
                })
              }
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                errors.designation
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />

            {errors.designation && (
              <p className="text-xs text-red-600">{errors.designation}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("employeeForm.joiningDate")}
            </label>

            <input
              type="date"
              value={formData.joiningDate}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  joiningDate: event.target.value,
                })
              }
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                errors.joiningDate
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />

            {errors.joiningDate && (
              <p className="text-xs text-red-600">{errors.joiningDate}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("employeeForm.employmentType")}
          </label>
          <div className="relative flex sm:flex-row sm:items-center gap-3">
            <select
              value={formData.employmentType}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  employmentType: event.target
                    .value as CreateEmployeePayload["employmentType"],
                })
              }
              className={`w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-700 shadow-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
                errors.employmentType
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            >
              <option value="FULL_TIME">{t("employeeForm.fullTime")}</option>

              <option value="PART_TIME">{t("employeeForm.partTime")}</option>

              <option value="CONTRACT">{t("employeeForm.contract")}</option>

              <option value="INTERN">{t("employeeForm.intern")}</option>
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

          {errors.employmentType && (
            <p className="text-xs text-red-600">{errors.employmentType}</p>
          )}
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-teal-400"
          >
            {loading
              ? t("employeeForm.updating")
              : t("employeeForm.updateEmployee")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployeePage;
