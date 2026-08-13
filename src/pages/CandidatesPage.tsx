import { useEffect, useState } from "react";
import { getCandidates } from "../api/candidates";
import type {
  Candidate,
  CandidatePagination,
  CandidateStatus,
} from "../types/candidate";
import { Link } from "react-router-dom";

function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<CandidatePagination | null>(
    null,
  );
  const [status, setStatus] = useState<CandidateStatus | "">("");

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
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-40 rounded-lg bg-gray-200" />

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                </th>
                <th className="px-6 py-3.5">
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-40 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 w-20 rounded-full bg-gray-200" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <p className="font-semibold">Failed to load candidates</p>
        <p className="mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Candidates
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-xs">
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
              placeholder="Search candidates..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <select
            value={status}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(event) => {
              setStatus(event.target.value as CandidateStatus | "");
              setPage(1);
            }}
          >
            <option value="">All Statuses</option>
            <option value="APPLIED">Applied</option>
            <option value="SCREENING">Screening</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="HIRED">Hired</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <Link to="/candidate/new">
            <button className="cursor-pointer w-max inline-flex tx-center items-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-green-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white">
              + Add Candidate
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
            No candidates found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            There are currently no candidates available in the pipeline.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
                <tr>
                  <th className="px-6 py-3.5">Name</th>
                  <th className="px-6 py-3.5">Email</th>
                  <th className="px-6 py-3.5">Designation</th>
                  <th className="px-6 py-3.5">Applied For</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {candidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <Link to={`/candidates/${candidate.id}`}>
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
      )}

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <button
          disabled={!pagination?.hasPrevious}
          onClick={() => setPage((currentPage) => currentPage - 1)}
          className="cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        >
          Previous
        </button>

        <span className="text-sm text-gray-700">
          Page{" "}
          <span className="font-semibold text-gray-900">
            {pagination?.page ?? 1}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {pagination?.totalPages ?? 1}
          </span>
        </span>

        <button
          disabled={!pagination?.hasNext}
          onClick={() => setPage((currentPage) => currentPage + 1)}
          className="cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CandidatesPage;
