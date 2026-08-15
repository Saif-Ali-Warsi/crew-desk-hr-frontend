import api from "./axios";
import type { LeaveResponse, Leave } from "../types/leave";

export const getLeaves = async (): Promise<LeaveResponse> => {
  const response = await api.get<LeaveResponse>("/leave");

  return response.data;
};

export const approveLeave = async (
  leaveId: string
): Promise<{
  success: boolean;
  message: string;
  data: Leave;
}> => {
  const response = await api.put(`/leave/${leaveId}/approve`);

  return response.data;
};

export const rejectLeave = async (
  leaveId: string
): Promise<{
  success: boolean;
  message: string;
  data: Leave;
}> => {
  const response = await api.put(`/leave/${leaveId}/reject`);

  return response.data;
};