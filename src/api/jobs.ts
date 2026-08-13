import api from "./axios";
import type { Job, JobsResponse } from "../types/job";

export const getJobs = async (): Promise<JobsResponse> => {
  const response = await api.get<JobsResponse>("/jobs");

  return response.data;
};