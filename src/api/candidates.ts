import api from "./axios";
import type {
  CandidatesResponse,
  CandidateStatus, Candidate, EmploymentType
} from "../types/candidate";
import type { Employee } from "../types/employee";

export const getCandidates = async (
  page = 1,
  limit = 10,
  search = "",
  status?: CandidateStatus
): Promise<CandidatesResponse> => {
  const response = await api.get<CandidatesResponse>(
    "/candidates",
    {
      params: {
        page,
        limit,
        search,
        status,
      },
    }
  );

  return response.data;
};

export const getCandidateById = async (
  candidateId: string
): Promise<{
  success: boolean;
  message: string;
  data: Candidate;
}> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: Candidate;
  }>(`/candidates/${candidateId}`);

  return response.data;
};

export interface CreateCandidatePayload {
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  designation?: string;
  employmentType?: EmploymentType;
  joiningDate?: string;
  resumeUrl?: string;
}

export const createCandidate = async (
  payload: CreateCandidatePayload
): Promise<{
  success: boolean;
  message: string;
  data: Candidate;
}> => {
  const response = await api.post(
    "/candidates",
    payload
  );

  return response.data;
};

export const updateCandidate = async (
  candidateId: string,
  payload: Partial<CreateCandidatePayload>
): Promise<{
  success: boolean;
  message: string;
  data: Candidate;
}> => {
  const response = await api.put(
    `/candidates/${candidateId}`,
    payload
  );

  return response.data;
};

export const deleteCandidate = async (
  candidateId: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await api.delete(
    `/candidates/${candidateId}`
  );

  return response.data;
};

export const hireCandidate = async (
  candidateId: string
): Promise<{
  success: boolean;
  message: string;
  data: {
    candidate: Candidate;
    employee: Employee;
  };
}> => {
  const response = await api.post(
    `/candidates/${candidateId}/hire`
  );

  return response.data;
};