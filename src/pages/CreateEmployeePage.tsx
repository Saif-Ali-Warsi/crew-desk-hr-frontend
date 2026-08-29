import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee, type CreateEmployeePayload } from "../api/employees";
import { toast } from "react-toastify";
import Ripples from "react-ripples";

const SafeRipples = Ripples as React.ComponentType<any>;

function CreateEmployeePage() {
  const { t } = useTranslation();
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const result = await createEmployee(formData);

      if (result.success) {
        navigate("/employees");
        toast.success(t("employeeForm.employeeCreated"));
      }
    } catch (error) {
      toast.error(t("employeeForm.failedToCreate"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {" "}
          {t("employeeForm.title")}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {t("employeeForm.description")}
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
          <select
            value={formData.employmentType}
            onChange={(event) =>
              setFormData({
                ...formData,
                employmentType: event.target
                  .value as CreateEmployeePayload["employmentType"],
              })
            }
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
              errors.employmentType
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            }`}
          >
            <option value="FULL_TIME"> {t("employeeForm.fullTime")}</option>
            <option value="PART_TIME">{t("employeeForm.partTime")}</option>
            <option value="CONTRACT"> {t("employeeForm.contract")}</option>
            <option value="INTERN">{t("employeeForm.intern")}</option>
          </select>
          {errors.employmentType && (
            <p className="text-xs text-red-600">{errors.employmentType}</p>
          )}
        </div>

        <div className="pt-3 flex items-center justify-end">
          <SafeRipples
            color="#ffffff27"
            during={1200}
            className="overflow-hidden"
          >
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer inline-flex  items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-teal-400"
            >
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {t("employeeForm.creating")}
                </>
              ) : (
                t("employeeForm.createEmployee")
              )}
            </button>
          </SafeRipples>
        </div>
      </form>
    </div>
  );
}

export default CreateEmployeePage;
