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
      } catch (err) {
        console.error("Failed to fetch job:", err);
        setError("Unable to load this job.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const formatPostedDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 3600 * 24)
    );

    if (diffInDays === 0) return "Posted today";
    if (diffInDays === 1) return "Posted 1 day ago";
    if (diffInDays < 30) return `Posted ${diffInDays} days ago`;
    return `Posted on ${date.toLocaleDateString()}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-[100vh] flex-col items-center justify-center bg-slate-50 px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#009689] border-t-transparent"></div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Loading position details...
        </p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex min-h-[100vh] items-center justify-center bg-slate-50 px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-4 ring-rose-50">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-lg font-bold text-slate-900">
            Position Not Found
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            {error || "The job posting you are looking for doesn't exist or has been removed."}
          </p>
        </div>
      </div>
    );
  }

  if (job.status !== "OPEN") {
    return (
      <div className="flex min-h-[100vh] items-center justify-center bg-slate-50 px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-4 ring-amber-50">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-lg font-bold text-slate-900">{job.title}</h1>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            This position is no longer accepting new applications.
          </p>
        </div>
      </div>
    );
  }

  const companyName = job.company?.name || "Company";

  return (
    <div className="min-h-screen bg-slate-50/70 pb-24 text-slate-800 sm:pb-12">
      <header className="border-b border-slate-200/80 bg-white shadow-2xs">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            {job.company?.logo ? (
              <img
                src={job.company.logo}
                alt={companyName}
                className="h-8 w-8 rounded-lg object-contain"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#009689] text-sm font-bold text-white">
                {companyName.charAt(0)}
              </div>
            )}
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              {companyName}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Actively Hiring
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pt-4 sm:px-6 sm:pt-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="border-b border-slate-100 bg-slate-900 p-6 text-white sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4 shrink-0 text-[#009689]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <span>{job.location || "Location not specified"}</span>
                  </div>

                  {job.createdAt && (
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <svg
                        className="h-4 w-4 shrink-0 text-[#009689]"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{formatPostedDate(job.createdAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/careers/jobs/${job.id}/apply`)}
                className="hidden sm:inline-flex items-center justify-center gap-2 rounded-xl bg-[#009689] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#007a6f] active:scale-[0.98]"
              >
                Apply Now
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              About the Role
            </h2>
            <div className="prose prose-slate mt-3 max-w-none text-xs leading-relaxed text-slate-600 sm:text-sm sm:leading-relaxed whitespace-pre-line">
              {job.description}
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-5 sm:flex-row sm:p-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Ready to join {companyName}?
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Submit your details and application in under 2 minutes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/careers/jobs/${job.id}/apply`)}
                className="w-full sm:w-auto rounded-xl bg-[#009689] px-6 py-3 text-center text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#007a6f] active:scale-[0.98] sm:text-sm"
              >
                Apply for this position
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-md sm:hidden">
        <button
          type="button"
          onClick={() => navigate(`/careers/jobs/${job.id}/apply`)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#009689] py-3.5 text-sm font-semibold text-white shadow-md active:scale-[0.98]"
        >
          Apply Now
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PublicJobPage;