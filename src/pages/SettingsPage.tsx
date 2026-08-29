import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../api/auth";
import type { UserLanguage } from "../types/auth";
import { applyLanguage } from "../utils/language";

function SettingsPage() {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    language: "EN" as UserLanguage,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        language: user.language || "EN",
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLanguageChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const language = event.target.value as "EN" | "AR";

    setFormData((prev) => ({
      ...prev,
      language,
    }));

    await applyLanguage(language);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setSaving(true);
      setFeedback(null);

      const result = await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        language: formData.language,
      });

      if (result.success) {
        setUser(result.data);
        setFeedback({
          type: "success",
          text: result.message || "Profile updated successfully.",
        });
      }
    } catch (error: any) {
      setFeedback({
        type: "error",
        text: error?.response?.data?.message || "Failed to update profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  const initials =
    `${formData.firstName[0] || ""}${formData.lastName[0] || ""}`.toUpperCase() ||
    "U";
  const userRoleDisplay = user?.role ? user.role.replace(/_/g, " ") : "Member";
  const companyDisplayName =
    user?.role === "SUPER_ADMIN"
      ? "Platform Administration"
      : user?.company?.name || user?.companyId || "Not assigned";

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 animate-pulse p-4">
        <div className="h-10 w-48 rounded-lg bg-slate-200" />
        <div className="h-64 rounded-2xl bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Account Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your personal identity, credentials, and organizational
          details.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all">
        <div className="border-b border-slate-100 bg-gradient-to-r from-teal-50/50 via-slate-50/30 to-white p-6 sm:px-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-700 text-xl font-bold text-white ring-4 ring-teal-500/10 shadow-sm">
              {initials}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {formData.firstName || formData.lastName
                  ? `${formData.firstName} ${formData.lastName}`
                  : user?.username}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 ring-1 ring-teal-500/20 uppercase tracking-wider">
                  {userRoleDisplay}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-medium text-slate-500">
                  {formData.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {feedback && (
            <div
              className={`flex items-center gap-3 rounded-xl p-4 text-sm font-medium transition-all ${
                feedback.type === "success"
                  ? "bg-teal-50 text-teal-800 border border-teal-200/80"
                  : "bg-red-50 text-red-800 border border-red-200/80"
              }`}
            >
              {feedback.type === "success" ? (
                <svg
                  className="h-5 w-5 shrink-0 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 shrink-0 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all hover:border-slate-300 focus:border-[#009689] focus:ring-4 focus:ring-teal-500/10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all hover:border-slate-300 focus:border-[#009689] focus:ring-4 focus:ring-teal-500/10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all hover:border-slate-300 focus:border-[#009689] focus:ring-4 focus:ring-teal-500/10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Language
                </label>

                <select
                  name="language"
                  value={formData.language}
                  onChange={handleLanguageChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all hover:border-slate-300 focus:border-[#009689] focus:ring-4 focus:ring-teal-500/10"
                >
                  <option value="EN">English</option>
                  <option value="AR">العربية</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              System Read-Only Attributes
            </h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200/80 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-500"
                  />
                  <span className="absolute right-3 top-3 text-slate-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                  Role
                </label>
                <input
                  type="text"
                  value={userRoleDisplay}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200/80 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-500 uppercase tracking-wider"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                  Company
                </label>
                <input
                  type="text"
                  value={companyDisplayName}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200/80 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-[#009689] px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-teal-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;
