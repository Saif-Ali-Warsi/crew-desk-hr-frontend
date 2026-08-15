import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Candidate } from "../types/candidate";
import {
  deleteCandidate,
  getCandidateById,
  hireCandidate,
  updateCandidate
} from "../api/candidates";
import ConfirmModal from "../components/ConfirmModel";
import { toast } from "react-toastify";

function CandidateDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [hiring, setHiring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("Candidate ID is missing.");
      setLoading(false);
      return;
    }

    const fetchCandidate = async () => {
      try {
        const result = await getCandidateById(id);

        if (result.success) {
          setCandidate(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch candidate:", error);
        setError("Failed to load candidate.");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [id]);

  const handleDeleteClick = (id: string) => {
    setSelectedCandidateId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCandidateId) return;

    try {
      setIsDeleting(true);
      await deleteCandidate(selectedCandidateId);

      setIsDeleteModalOpen(false);
      setSelectedCandidateId(null);
      navigate("/candidates");
      toast.success("Candidate deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMoveToOffer = async () => {
  if (!candidate) return;

  try {
    const result = await updateCandidate(candidate.id, {
      status: "OFFER",
    });

    if (result.success) {
      setCandidate(result.data);
      toast.success("Candidate moved to Offer.");
    }
  } catch (error) {
    console.error("Failed to move candidate to offer:", error);
    toast.error("Failed to move candidate to Offer.");
  }
};

  const handleHire = async () => {
    if (!id) {
      return;
    }

    setHiring(true);

    try {
      const result = await hireCandidate(id);

      if (result.success) {
        navigate(`/employees/${result.data.employee.id}`);
        toast.success("Candidate hired successfully");
      }
    } catch (error) {
      console.error("Failed to hire candidate:", error);
      toast.success("Failed to hire candidate");
    } finally {
      setHiring(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 animate-pulse">
        <div className="h-8 w-48 rounded-lg bg-gray-200" />
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
            <div className="h-16 w-16 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-6 w-40 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-5 w-36 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <p className="font-semibold">Failed to load candidate details</p>
        <p className="mt-1">{error}</p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="mx-auto flex min-h-[360px] max-w-4xl flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-base font-semibold text-gray-900">
          Candidate not found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          The Candidate record you are looking for does not exist or has been
          removed.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Candidate Profile
        </h1>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="relative flex flex-col gap-4 border-b border-gray-100 bg-gray-50/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white shadow-sm">
              {candidate.firstName?.[0]}
              {candidate.lastName?.[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {candidate.firstName} {candidate.lastName}
              </h2>
              <p className="text-sm font-medium text-gray-500">
                {candidate.designation}
              </p>
            </div>
          </div>

          <button
            className="cursor-pointer absolute -top-1 right-6 z-10 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-red-50 hover:text-red-600"
            onClick={() => handleDeleteClick(candidate.id)}
          >
            Delete
          </button>

          <ConfirmModal
            isOpen={isDeleteModalOpen}
            title="Delete Candidate"
            message="Are you sure you want to delete this candidate? This action cannot be undone."
            confirmLabel="Delete"
            isLoading={isDeleting}
            onConfirm={handleConfirmDelete}
            onClose={() => setIsDeleteModalOpen(false)}
          />

          <Link to={`/candidates/${candidate.id}/edit`}>
            <button className="cursor-pointer absolute -top-1 right-24 z-10 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Edit
            </button>
          </Link>

          <span
            className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              candidate.status?.toLowerCase() === "active"
                ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                : "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/10"
            }`}
          >
            {candidate.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Email Address
            </dt>
            <dd className="mt-1 text-sm font-medium text-gray-900">
              {candidate.email}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Phone Number
            </dt>
            <dd className="mt-1 text-sm font-medium text-gray-900">
              {candidate.phone ?? "N/A"}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Candidate Type
            </dt>
            <dd className="mt-1 text-sm font-medium text-gray-900 capitalize">
              {candidate.employmentType}
            </dd>
          </div>
        </div>
      </div>
    {candidate.status === "APPLIED" && (
  <div className="flex items-center justify-between border-t border-gray-100 bg-amber-50 px-6 py-4">
    <div>
      <p className="text-sm font-semibold text-amber-800">
        Candidate is currently in Applied stage
      </p>

      <p className="mt-1 text-xs text-amber-700">
        Review the candidate details and complete the required employment
        information before moving them to Offer.
      </p>
    </div>

    <Link to={`/candidates/${candidate.id}/edit`}>
      <button
        type="button"
        className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
      >
        Edit Candidate
      </button>
    </Link>
  </div>
)}

{candidate.status === "SCREENING" && (
  <div className="flex items-center justify-between border-t border-gray-100 bg-blue-50 px-6 py-4">
    <div>
      <p className="text-sm font-semibold text-blue-800">
        Candidate is in Screening stage
      </p>

      <p className="mt-1 text-xs text-blue-700">
        Complete the screening process before moving the candidate to the
        next stage.
      </p>
    </div>
  </div>
)}

{candidate.status === "INTERVIEW" && (
  <div className="flex items-center justify-between border-t border-gray-100 bg-purple-50 px-6 py-4">
    <div>
      <p className="text-sm font-semibold text-purple-800">
        Candidate is in Interview stage
      </p>

      <p className="mt-1 text-xs text-purple-700">
        Complete the interview process before moving the candidate to Offer.
      </p>
    </div>
  </div>
)}

{candidate.status === "OFFER" && (
  <div className="flex items-center justify-between border-t border-gray-100 bg-emerald-50 px-6 py-4">
    <div>
      <p className="text-sm font-semibold text-emerald-800">
        Candidate is ready to be hired
      </p>

      <p className="mt-1 text-xs text-emerald-700">
        The candidate has been moved to Offer and is ready to become an
        employee.
      </p>
    </div>

    <button
      type="button"
      onClick={handleHire}
      disabled={hiring}
      className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {hiring ? "Hiring..." : "Hire Candidate"}
    </button>
  </div>
)}

{candidate.status === "HIRED" && (
  <div className="border-t border-gray-100 bg-green-50 px-6 py-4">
    <p className="text-sm font-semibold text-green-800">
      Candidate has been hired successfully.
    </p>

    <p className="mt-1 text-xs text-green-700">
      This candidate has already been converted into an employee.
    </p>
  </div>
)}

{candidate.status === "REJECTED" && (
  <div className="border-t border-gray-100 bg-red-50 px-6 py-4">
    <p className="text-sm font-semibold text-red-800">
      Candidate application rejected
    </p>

    <p className="mt-1 text-xs text-red-700">
      This candidate is no longer part of the active hiring process.
    </p>
  </div>
)}
    </div>
  );
}

export default CandidateDetailsPage;
