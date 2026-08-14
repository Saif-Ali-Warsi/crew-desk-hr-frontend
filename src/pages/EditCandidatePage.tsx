import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCandidateById,
  updateCandidate,
  type CreateCandidatePayload,
} from "../api/candidates";

import { getJobs } from "../api/jobs";
import type { Job } from "../types/job";
import { toast } from "react-toastify";

function EditCandidatePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchCandidate = async () => {
      try {
        const result = await getCandidateById(id);

        if (result.success) {
          const candidate = result.data;

          setFormData({
            jobId: candidate.jobId,
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            email: candidate.email,
            phone: candidate.phone ?? "",
            designation: candidate.designation ?? "",
            employmentType: candidate.employmentType ?? "FULL_TIME",
            joiningDate: candidate.joiningDate
              ? candidate.joiningDate.split("T")[0]
              : "",
            resumeUrl: candidate.resumeUrl ?? "",
          });
         
        }
      } catch (error) {
        console.error("Failed to fetch candidate:", error);
       
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

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
      newErrors.jobId = "Job is required.";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.designation?.trim()) {
      newErrors.designation = "Designation is required.";
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = "Joining date is required.";
    }

    if (!formData.employmentType) {
      newErrors.employmentType = "Candidate type is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id || !validate()) {
      return;
    }

    setLoading(true);

    try {
      const result = await updateCandidate(id, {
        ...formData,
        joiningDate: formData.joiningDate
          ? new Date(`${formData.joiningDate}T00:00:00`).toISOString()
          : undefined,
        resumeUrl: formData.resumeUrl?.trim() || undefined,
      });

      if (result.success) {
        navigate(`/candidates/${id}`);
         toast.success("Candidate updated successfully")
      }
    } catch (error) {
      console.error("Failed to update candidate:", error);
       toast.error("Failed to update candidate")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Candidate</h2>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the candidates details below to edit candidate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
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
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
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
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
                Email Address
              </label>
              <input
                type="email"
                placeholder="john.doe@example.com"
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
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000 (Optional)"
                value={formData.phone}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    phone: event.target.value,
                  })
                }
                className="mt-1.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                placeholder="Software Engineer"
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
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              />
              {errors.designation && (
                <p className="text-xs text-red-600">{errors.designation}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Joining Date
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
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
                Job Type
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
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              >
                <option value="">Select Job</option>

                {jobs
                  .filter(
                    (job) => job.status === "OPEN" || job.id === formData.jobId,
                  )
                  .map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employment Type
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
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                }`}
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERN">Intern</option>
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
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400"
            >
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Updating...
                </>
              ) : (
                "Update Candidate"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCandidatePage;
