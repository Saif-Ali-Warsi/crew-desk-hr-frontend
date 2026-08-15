export type CandidateStatus =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "HIRED"
  | "REJECTED";

export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERN";

export interface Candidate {
  id: string;
  companyId: string;
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  designation: string | null;
  employmentType: EmploymentType | null;
  joiningDate: string | null;
  resumeUrl: string | null;
  status: CandidateStatus;
  createdAt: string;
  updatedAt: string;
  job: {
    title: string;
  };
}

export interface CandidatePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface CandidatesResponse {
  success: boolean;
  message: string;
  data: {
    items: Candidate[];
    pagination: CandidatePagination;
  };
}
export interface UpdateCandidatePayload {
  jobId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  designation?: string;
  employmentType?: EmploymentType;
  joiningDate?: string;
  resumeUrl?: string;
  status?: CandidateStatus;
}