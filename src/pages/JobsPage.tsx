import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getJobs } from "../api/jobs";
import type { Job, JobPagination } from "../types/job";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getJobQRCode } from "../api/jobs";
import TableShimmerLoader from "../components/TableShimmer";

function JobsPage() {
  const { t } = useTranslation();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrJobUrl, setQrJobUrl] = useState<string>("");
  const [qrJobTitle, setQrJobTitle] = useState<string>("");
  const [isQrLoading, setIsQrLoading] = useState(false);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<JobPagination | null>(null);

  const [viewMode, setViewMode] = useState<"table" | "card">(() =>
    window.innerWidth < 768 ? "card" : "table",
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode((prev) => (prev === "table" ? "card" : prev));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);

      const fetchJobs = async () => {
        try {
          const result = await getJobs(page, 10, search);

          if (result.success) {
            setJobs(result.data.items);
            setPagination(result.data.pagination);
            setError(null);
          }
        } catch (error) {
          console.error("Failed to fetch jobs:", error);
          setError(t("jobsPage.failedToLoadJobs"));
        } finally {
          setLoading(false);
        }
      };

      fetchJobs();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search, page]);

  const handleCopyJobLink = async (jobId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#/careers/jobs/${jobId}`;

    try {
      await navigator.clipboard.writeText(url);
      toast.success(t("jobsPage.jobLinkCopied"));
    } catch (error) {
      console.error("Failed to copy job link:", error);
    }
  };

  const handleCopyQrJobUrl = async () => {
    if (!qrJobUrl) return;
    try {
      await navigator.clipboard.writeText(qrJobUrl);
      toast.success("Job URL copied successfully.");
    } catch (error) {
      console.error("Failed to copy job URL:", error);
    }
  };

  const handleGenerateQRCode = async (job: Job) => {
    try {
      setIsQrLoading(true);
      setActiveJobId(job.id);

      const response = await getJobQRCode(job.id);

      setQrCode(response.data.qrCode);
      setQrJobUrl(response.data.jobUrl);
      setQrJobTitle(job.title);
    } catch (error) {
      console.error("Failed to generate QR code", error);
      toast.error(t("jobsPage.failedToGenerateQr"));
    } finally {
      setIsQrLoading(false);
      setActiveJobId(null);
    }
  };

  const handleDownloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement("a");

    link.href = qrCode;
    link.download = `${qrJobTitle.replace(/\s+/g, "-").toLowerCase()}-qr.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCloseQrModal = () => {
    setQrCode(null);
    setQrJobUrl("");
    setQrJobTitle("");
  };

  if (loading) {
    return <TableShimmerLoader></TableShimmerLoader>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <p className="font-semibold">{t("jobsPage.failedToLoadJobs")}</p>
        <p className="mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {t("jobsPage.title")}
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-xs sm:w-auto">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={t("jobsPage.search")}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-full bg-white rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`cursor-pointer flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                viewMode === "table"
                  ? "bg-teal-50 border border-teal-200 shadow-xs"
                  : "hover:bg-gray-100"
              }`}
              title={t("jobsPage.tableView")}
            >
              <img
                src="https://www.image2url.com/r2/default/images/1787238175143-4ec5690c-77ad-40fb-b362-25c2fc0e0e51.png"
                alt={t("jobsPage.tableView")}
                className={`h-4 w-4 object-contain ${
                  viewMode === "table" ? "opacity-100" : "opacity-50"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`cursor-pointer flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                viewMode === "card"
                  ? "bg-teal-50 border border-teal-200 shadow-xs"
                  : "hover:bg-gray-100"
              }`}
              title={t("jobsPage.cardView")}
            >
              <img
                src="https://www.image2url.com/r2/default/images/1787238173560-730ec86e-d60d-4dbb-85ff-fc15392d1a73.png"
                alt={t("jobsPage.cardView")}
                className={`h-4 w-4 object-contain ${
                  viewMode === "card" ? "opacity-100" : "opacity-50"
                }`}
              />
            </button>
          </div>

          <Link to="/jobs/new">
            <button className="cursor-pointer w-max inline-flex items-center rounded-lg border border-teal-600 bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              + {t("jobsPage.add")}
            </button>
          </Link>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="flex min-h-[320px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900">
            {t("jobsPage.noJobsFound")}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {t("jobsPage.adjustSearch")}
          </p>
        </div>
      ) : viewMode === "table" ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
                <tr className="text-white bg-teal-600">
                  <th className="px-6 py-3.5">{t("jobsPage.titleColumn")}</th>
                  <th className="px-6 py-3.5">{t("jobsPage.description")}</th>
                  <th className="px-6 py-3.5">{t("jobsPage.location")}</th>
                  <th className="px-6 py-3.5">{t("jobsPage.status")}</th>
                  <th className="px-6 py-3.5">{t("jobsPage.action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="hover:text-teal-600 transition-colors"
                      >
                        {job.title}
                      </Link>
                    </td>
                    <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-500">
                      {job.description}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{job.location}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          job.status?.toLowerCase() === "open" ||
                          job.status?.toLowerCase() === "active"
                            ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                            : "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/10"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyJobLink(job.id)}
                          className="cursor-pointer rounded-lg border border-gray-200 text-white border border-teal-600 bg-teal-600 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-teal-700 hover:border-gray-300 transition-all"
                        >
                          {t("jobsPage.copyJobLink")}
                        </button>

                        <button
                          type="button"
                          disabled={isQrLoading && activeJobId === job.id}
                          onClick={() => handleGenerateQRCode(job)}
                          className="cursor-pointer w-full sm:w-auto text-center rounded-lg border border-gray-200 text-white border border-teal-600 bg-teal-600 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-teal-700 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isQrLoading && activeJobId === job.id
                            ? t("jobsPage.generating")
                            : t("jobsPage.qrCode")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-gray-300"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      to={`/jobs/${job.id}`}
                      className="text-base font-bold text-gray-900 hover:text-teal-600 transition-colors line-clamp-1"
                    >
                      {job.title}
                    </Link>
                    <p className="text-xs font-medium text-gray-500">
                      {job.location || t("jobsPage.remoteUnspecified")}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      job.status?.toLowerCase() === "open" ||
                      job.status?.toLowerCase() === "active"
                        ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                        : "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/10"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 pt-1">
                  {job.description || t("jobsPage.noDescription")}
                </p>
              </div>

              <div className="pt-4 mt-3 gap-3 border-t border-gray-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => handleCopyJobLink(job.id)}
                  className="cursor-pointer w-full sm:w-auto text-center rounded-lg border border-gray-200 text-white border-teal-600 bg-teal-600 px-3 py-1.5 text-xs font-medium hover:border-gray-300 transition-all"
                >
                  {t("jobsPage.copyJobLink")}
                </button>

                <button
                  type="button"
                  disabled={isQrLoading && activeJobId === job.id}
                  onClick={() => handleGenerateQRCode(job)}
                  className="cursor-pointer w-full sm:w-auto text-center rounded-lg border border-gray-200 text-white border-teal-600 bg-teal-600 px-3 py-1.5 text-xs font-medium hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isQrLoading && activeJobId === job.id
                    ? t("jobsPage.generating")
                    : t("jobsPage.qrCode")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {qrCode && (
        <div className="fixed min-h-[100vh] inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm transition-all duration-200">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/5 transition-all">
            <button
              type="button"
              className="cursor-pointer absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              onClick={handleCloseQrModal}
            >
              <span className="sr-only"> {t("jobsPage.close")}</span>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-900">
                {t("jobsPage.jobQrCode")}
              </h2>
              {qrJobTitle && (
                <p className="mt-1 text-xs font-semibold text-[#009689]">
                  {qrJobTitle}
                </p>
              )}
            </div>

            <div className="my-5 flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <img
                src={qrCode}
                alt={`${t("jobsPage.qrCode")} - ${qrJobTitle}`}
                className="h-48 w-48 rounded-lg object-contain shadow-xs bg-white p-2 border border-slate-200"
              />
              <p className="mt-3 text-center text-xs text-slate-500">
                {t("jobsPage.shareQrCode")}
              </p>
              {qrJobUrl && (
                <button
                  type="button"
                  onClick={handleCopyQrJobUrl}
                  className="cursor-pointer mt-2 text-xs font-medium text-teal-600 hover:underline break-all"
                >
                  {t("jobsPage.copyDirectJobLink")}
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadQRCode}
                className="cursor-pointer flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-[#009689] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#007a70] transition-colors focus:ring-2 focus:ring-[#009689]/20"
              >
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {t("jobsPage.downloadQr")}
              </button>

              <button
                type="button"
                onClick={handleCloseQrModal}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {t("jobsPage.close")}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between py-3">
        <button
          disabled={!pagination?.hasPrevious}
          onClick={() => setPage((currentPage) => currentPage - 1)}
          className="cursor-pointer inline-flex items-center rounded-md border border-gray-300 text-white bg-teal-600 px-3.5 py-2 text-sm font-medium shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-teal-700"
        >
          {t("jobsPage.previous")}
        </button>

        <span className="text-sm text-gray-700">
          {t("jobsPage.page")} {" "}
          <span className="font-semibold text-gray-900">
            {pagination?.page ?? 1}
          </span> 
         {" "} {t("jobsPage.of")} {" "}
          <span className="font-semibold text-gray-900">
           {pagination?.totalPages ?? 1}
          </span>
        </span>

        <button
          disabled={!pagination?.hasNext}
          onClick={() => setPage((currentPage) => currentPage + 1)}
          className="cursor-pointer inline-flex items-center rounded-md border border-gray-300 text-white bg-teal-600 px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-teal-700"
        >
          {t("jobsPage.next")}
        </button>
      </div>
    </div>
  );
}

export default JobsPage;
