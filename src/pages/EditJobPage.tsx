import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getJobById, updateJob } from "../api/jobs";
import type { CreateJobPayload } from "../api/jobs";

import { getJobs } from "../api/jobs";
import type { Job } from "../types/job";
import { toast } from "react-toastify";

function EditJobPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateJobPayload>({
    title: "",
    description: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);

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
      newErrors.title = "Title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchJob = async () => {
      try {
        const result = await getJobById(id);

        if (result.success) {
          const job = result.data;

          setFormData({
            title: job.title,
            description: job.description,
            location: job.location ?? "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id || !validate()) {
      return;
    }

    setLoading(true);

    try {
      const result = await updateJob(id, {
        ...formData,
      });

      if (result.success) {
        navigate(`/jobs/${id}`);
        toast.success("Job updated successfully");
      }
    } catch (error) {
      console.error("Failed to update job:", error);
      toast.error("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Edit Job</h2>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the job details below to edit job details.
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
              placeholder="React Native Developer"
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
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
              placeholder="Abu Dhabi"
              value={formData.location}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  location: event.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

         
        </div>

         <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Job description"
              rows={6}
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
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
            className="cursor-pointer inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            {loading ? "Updating..." : "Update Job"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditJobPage;
