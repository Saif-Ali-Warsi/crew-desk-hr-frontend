import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getCandidates } from "../api/candidates";
import type {
  Candidate,
  CandidatePagination,
  CandidateStatus,
} from "../types/candidate";
import { Link } from "react-router-dom";
import TableShimmerLoader from "../components/TableShimmer";

function CandidatesPage() {
  const { t } = useTranslation();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<CandidatePagination | null>(
    null,
  );
  const [status, setStatus] = useState<CandidateStatus | "">("");

  const [viewMode, setViewMode] = useState<"table" | "card">(() => {
    return window.innerWidth < 768 ? "card" : "table";
  });

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
      const fetchCandidates = async () => {
        try {
          const result = await getCandidates(
            page,
            10,
            search,
            status || undefined,
          );

          if (result.success) {
            setCandidates(result.data.items);
            setPagination(result.data.pagination);
            setError(null);
          }
        } catch (error) {
          console.error("Failed to fetch candidates:", error);
          setError("Failed to load candidates.");
        } finally {
          setLoading(false);
        }
      };
      fetchCandidates();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search, page, status]);

  if (loading) {
    return <TableShimmerLoader></TableShimmerLoader>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <p className="font-semibold">{t("candidatesPage.failedToLoad")}</p>
        <p className="mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {t("candidatesPage.title")}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
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
                placeholder={t("candidatesPage.search")}
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                className="w-full bg-white rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <select
              value={status}
              className="w-full bg-white sm:w-auto rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              onChange={(event) => {
                setStatus(event.target.value as CandidateStatus | "");
                setPage(1);
              }}
            >
              <option value="">{t("candidatesPage.allStatuses")}</option>

              <option value="APPLIED">{t("candidatesPage.applied")}</option>

              <option value="SCREENING">{t("candidatesPage.screening")}</option>

              <option value="INTERVIEW">{t("candidatesPage.interview")}</option>

              <option value="OFFER">{t("candidatesPage.offer")}</option>

              <option value="HIRED">{t("candidatesPage.hired")}</option>

              <option value="REJECTED">{t("candidatesPage.rejected")}</option>
            </select>
          </div>

          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`cursor-pointer flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                viewMode === "table"
                  ? "bg-indigo-50 border border-indigo-200 shadow-xs"
                  : "hover:bg-gray-100"
              }`}
              title="Table View"
            >
              <img
                src="https://www.image2url.com/r2/default/images/1787238175143-4ec5690c-77ad-40fb-b362-25c2fc0e0e51.png"
                alt="Table View"
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
                  ? "bg-indigo-50 border border-indigo-200 shadow-xs"
                  : "hover:bg-gray-100"
              }`}
              title="Card View"
            >
              <img
                src="https://www.image2url.com/r2/default/images/1787238173560-730ec86e-d60d-4dbb-85ff-fc15392d1a73.png"
                alt="Card View"
                className={`h-4 w-4 object-contain ${
                  viewMode === "card" ? "opacity-100" : "opacity-50"
                }`}
              />
            </button>
          </div>

          <Link to="/candidates/new">
            <button className="cursor-pointer w-max inline-flex items-center rounded-lg border border-teal-600 bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              + {t("candidatesPage.add")}
            </button>
          </Link>
        </div>
      </div>

      {candidates.length === 0 ? (
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
            {t("candidatesPage.noCandidatesFound")}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {t("candidatesPage.adjustSearch")}
          </p>
        </div>
      ) : viewMode === "table" ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
                <tr className="text-white bg-teal-600">
                  <th className="px-6 py-3.5">{t("candidatesPage.name")}</th>
                  <th className="px-6 py-3.5">{t("candidatesPage.email")}</th>
                  <th className="px-6 py-3.5">
                    {t("candidatesPage.designation")}
                  </th>
                  <th className="px-6 py-3.5">{t("candidatesPage.job")}</th>
                  <th className="px-6 py-3.5">{t("candidatesPage.status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {candidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <Link
                        to={`/candidates/${candidate.id}`}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {candidate.firstName} {candidate.lastName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {candidate.email}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {candidate.designation ?? "N/A"}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {candidate.job?.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10 capitalize">
                        {candidate.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-gray-300"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      to={`/candidates/${candidate.id}`}
                      className="text-base font-bold text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                      {candidate.firstName} {candidate.lastName}
                    </Link>
                    <p className="text-xs font-medium text-gray-500">
                      {candidate.job?.title || "No Position Specified"}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10 capitalize">
                    {candidate.status}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 text-xs text-gray-600 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">
                      {t("candidatesPage.designation")}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {candidate.designation ?? t("notAvailable")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">
                      {t("candidatesPage.email")}
                    </span>
                    <span className="font-semibold text-gray-800 truncate max-w-[180px]">
                      {candidate.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between py-3">
        <button
          disabled={!pagination?.hasPrevious}
          onClick={() => setPage((currentPage) => currentPage - 1)}
          className="cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        >
          {t("candidatesPage.previous")}
        </button>
        {t("candidatesPage.page")}{" "}
        <span className="font-semibold text-gray-900">
          {pagination?.page ?? 1}
        </span>{" "}
        {t("candidatesPage.of")}{" "}
        <span className="font-semibold text-gray-900">
          {pagination?.totalPages ?? 1}
        </span>
        <button
          disabled={!pagination?.hasNext}
          onClick={() => setPage((currentPage) => currentPage + 1)}
          className="cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        >
          {t("candidatesPage.next")}
        </button>
      </div>
    </div>
  );
}

export default CandidatesPage;
