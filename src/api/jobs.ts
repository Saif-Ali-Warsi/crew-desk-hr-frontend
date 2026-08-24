import api from "./axios";
import type { Job, JobsResponse, JobResponse } from "../types/job";

export const getJobs = async (
  page = 1,
  limit = 10,
  search = ""
): Promise<JobsResponse> => {
  const response = await api.get<JobsResponse>("/jobs", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};

export const getJobById = async (
  jobId: string
): Promise<{
  success: boolean;
  message: string;
  data: Job;
}> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: Job;
  }>(`/jobs/${jobId}`);

  return response.data;
};

export interface CreateJobPayload {
  title: string;
  description: string;
  location?: string;
}

export const createJob = async (
  payload: CreateJobPayload
): Promise<{
  success: boolean;
  message: string;
  data: Job;
}> => {
  const response = await api.post("/jobs", payload);

  return response.data;
};

export const updateJob = async (
  jobId: string,
  payload: Partial<CreateJobPayload>
): Promise<{
  success: boolean;
  message: string;
  data: Job;
}> => {
  const response = await api.put(
    `/jobs/${jobId}`,
    payload
  );

  return response.data;
};

export const deleteJob = async (
  jobId: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await api.delete(
    `/jobs/${jobId}`
  );

  return response.data;
};

export const getPublicJobById = async (
  id: string
): Promise<JobResponse> => {
  const response = await api.get<JobResponse>(
    `/careers/jobs/${id}`
  );

  return response.data;
};

export interface JobQRCodeResponse {
  success: boolean;
  message: string;
  data: {
    jobId: string;
    jobUrl: string;
    qrCode: string;
  };
}

export const getJobQRCode = async (
  jobId: string
): Promise<JobQRCodeResponse> => {
  const response = await api.get<JobQRCodeResponse>(
    `/qr/jobs/${jobId}`
  );

  return response.data;
};