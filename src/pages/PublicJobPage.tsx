import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPublicJobById } from "../api/jobs";
import type { Job } from "../types/job";

function PublicJobPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) {
      setError("Invalid job link.");
      setLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        const result = await getPublicJobById(jobId);

        if (result.success) {
          setJob(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
        setError("Unable to load this job.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-6">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-sm font-medium text-slate-600">Loading position details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-xl shadow-slate-200/50">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-8 ring-rose-50/50">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="mt-5 text-xl font-bold text-slate-900">Position Not Found</h1>
          <p className="mt-2 text-sm text-slate-500">{error || "The job posting you are looking for doesn't exist or has been removed."}</p>
        </div>
      </div>
    );
  }

  if (job.status !== "OPEN") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-xl shadow-slate-200/50">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-8 ring-amber-50/50">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="mt-5 text-xl font-bold text-slate-900">{job.title}</h1>
          <p className="mt-2 text-sm text-slate-500">This position is no longer accepting new applications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 px-6 py-12 text-slate-800">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40">
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-900 to-indigo-950 p-8 text-white sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Actively Hiring
                </span>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {job.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{job.location || "Location not specified"}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/careers/jobs/${job.id}/apply`)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-600/40 active:scale-[0.98]"
              >
                Apply Now
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <h2 className="text-lg font-bold text-slate-900">About the Role</h2>
            <div className="prose prose-slate mt-4 max-w-none text-sm leading-relaxed text-slate-600 whitespace-pre-line">
              {job.description}
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-8">
              <span className="text-xs font-medium text-slate-400">Ready to take the next step in your career?</span>
              <button
                type="button"
                onClick={() => navigate(`/careers/jobs/${job.id}/apply`)}
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-500 active:scale-[0.98]"
              >
                Apply for this position
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicJobPage;