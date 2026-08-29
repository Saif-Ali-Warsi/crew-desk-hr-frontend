import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../api/jobs";
import type { Job } from "../types/job";
import { toast } from "react-toastify";

import {
  createCandidate,
  type CreateCandidatePayload,
} from "../api/candidates";

function CreateCandidatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);

  const [formData, setFormData] = useState<CreateCandidatePayload>({
    jobId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    employmentType: "FULL_TIME",
    joiningDate: "",
    resumeUrl: "",
  });

  const [errors, setErrors] = useState<{
    jobId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    designation?: string;
    joiningDate?: string;
    employmentType?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      jobId?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      designation?: string;
      joiningDate?: string;
      employmentType?: string;
    } = {};

    if (!formData.jobId) {
      newErrors.jobId = t("addCandidate.jobRequired");
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("addCandidate.firstNameRequired");
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t("addCandidate.lastNameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("addCandidate.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("addCandidate.validEmail");
    }

    if (!formData.designation?.trim()) {
      newErrors.designation = t("addCandidate.designationRequired");
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = t("addCandidate.joiningDateRequired");
    }

    if (!formData.employmentType) {
      newErrors.employmentType = t("addCandidate.employmentTypeRequired");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const result = await createCandidate({
        ...formData,
        joiningDate: formData.joiningDate
          ? new Date(`${formData.joiningDate}T00:00:00`).toISOString()
          : undefined,
        resumeUrl: formData.resumeUrl?.trim() || undefined,
      });

      if (result.success) {
        navigate("/candidates");
        toast.success(t("addCandidate.createdSuccessfully"));
      }
    } catch (error) {
      toast.error(t("addCandidate.failedToCreate"));
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await getJobs();

        if (result.success) {
          setJobs(result.data.items);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {t("addCandidate.title")}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {t("addCandidate.description")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("addCandidate.firstName")}
              </label>
              <input
                type="text"
                placeholder={t("addCandidate.firstNamePlaceholder")}
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
                {t("addCandidate.lastName")}
              </label>
              <input
                type="text"
                placeholder={t("addCandidate.lastNamePlaceholder")}
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
                {t("addCandidate.emailAddress")}
              </label>
              <input
                type="email"
                placeholder={t("addCandidate.emailPlaceholder")}
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
                {t("addCandidate.phoneNumber")}
              </label>
              <input
                type="text"
                placeholder={t("addCandidate.phonePlaceholder")}
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
                {t("addCandidate.designation")}
              </label>
              <input
                type="text"
                placeholder={t("addCandidate.designationPlaceholder")}
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
                {t("addCandidate.joiningDate")}
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

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("addCandidate.jobType")}
              </label>

              <select
                value={formData.jobId}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    jobId: event.target.value,
                  })
                }
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                  errors.jobId
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                }`}
              >
                <option value="">{t("addCandidate.selectJob")}</option>

                {jobs
                  .filter((job) => job.status === "OPEN")
                  .map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("addCandidate.employmentType")}
              </label>
              <select
                value={formData.employmentType}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    employmentType: event.target
                      .value as CreateCandidatePayload["employmentType"],
                  })
                }
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                  errors.employmentType
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                }`}
              >
                <option value="FULL_TIME">{t("addCandidate.fullTime")}</option>

                <option value="PART_TIME">{t("addCandidate.partTime")}</option>

                <option value="CONTRACT">{t("addCandidate.contract")}</option>

                <option value="INTERN">{t("addCandidate.intern")}</option>
              </select>
              {errors.employmentType && (
                <p className="text-xs text-red-600">{errors.employmentType}</p>
              )}
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-teal-400"
            >
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {t("addCandidate.creating")}
                </>
              ) : (
                t("addCandidate.createCandidate")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCandidatePage;
