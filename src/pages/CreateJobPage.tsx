import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob, type CreateJobPayload } from "../api/jobs";
import { toast } from "react-toastify";

function CreateJobPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateJobPayload>({
    title: "",
    description: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      title?: string;
      description?: string;
    } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Job description is required.";
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
      const result = await createJob(formData);

      if (result.success) {
        navigate("/jobs");
          toast.success("Job created successfully.");
      }
    } catch (error) {
      console.error("Failed to create job:", error);
       toast.error("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Create New Job</h2>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the job details below to create a new job.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>

            <input
              type="text"
              placeholder="Job title"
              value={formData.title}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  title: event.target.value,
                })
              }
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                errors.title
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />

            {errors.title && (
              <p className="text-xs text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  location: event.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border px-3 py-2 text-sm border-gray-300 placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <textarea
            placeholder="Job description"
            value={formData.description}
            onChange={(event) =>
              setFormData({
                ...formData,
                description: event.target.value,
              })
            }
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
              errors.description
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            }`}
          />
          {errors.description && (
            <p className="text-xs text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-teal-400"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateJobPage;
