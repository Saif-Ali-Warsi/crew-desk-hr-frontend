import api from "./axios";

export interface ApplyJobPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
}

export interface ApplyJobResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    companyId: string;
    jobId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    designation: string | null;
    employmentType: string | null;
    joiningDate: string | null;
    resumeUrl: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const applyForJob = async (
  jobId: string,
  payload: ApplyJobPayload
): Promise<ApplyJobResponse> => {
  const response = await api.post<ApplyJobResponse>(
    `/careers/jobs/${jobId}/apply`,
    payload
  );

  return response.data;
};