import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { applyForJob } from "../api/career";

function PublicJobApplyPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resumeUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!jobId) {
      setError("Invalid job link.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await applyForJob(jobId, formData);

      if (result.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Failed to apply for job:", error);
      setError("Unable to submit your application.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50/70 px-4 py-8">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-xs sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="mt-5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Application Submitted!
          </h1>

          <p className="mt-2.5 text-xs leading-relaxed text-slate-500 sm:text-sm">
            Thank you for taking the time to apply. We've received your details and our recruitment team will review your application shortly.
          </p>

          <button
            type="button"
            onClick={() => navigate(`/careers/jobs/${jobId}`)}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] sm:text-sm"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Job Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 pb-12 text-slate-800">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(`/careers/jobs/${jobId}`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </button>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#009689]">Job Application</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pt-4 sm:px-6 sm:pt-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="border-b border-slate-100 bg-white p-5 sm:p-8">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Apply for this position
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Fields marked with <span className="text-[#009689] font-semibold">*</span> are required.
            </p>
          </div>

          <div className="p-5 sm:p-8">
            {error && (
              <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50/80 p-3.5 text-xs text-rose-800">
                <svg className="h-4 w-4 shrink-0 text-rose-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    First Name <span className="text-[#009689]">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#009689] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#009689]/10"
                    placeholder="Jane"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Last Name <span className="text-[#009689]">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#009689] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#009689]/10"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Email Address <span className="text-[#009689]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#009689] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#009689]/10"
                  placeholder="jane.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#009689] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#009689]/10"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Resume / Portfolio Link
                </label>
                <input
                  type="url"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#009689] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#009689]/10"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={() => navigate(`/careers/jobs/${jobId}`)}
                  className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98] sm:text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#009689] px-6 py-3 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#007a6f] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PublicJobApplyPage;