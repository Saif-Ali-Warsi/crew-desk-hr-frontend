import api from "./axios";
import type { EmployeesResponse } from "../types/employee";

export const getEmployees = async (
  page = 1,
  limit = 10,
  search = ""
): Promise<EmployeesResponse> => {
  const response = await api.get<EmployeesResponse>(
    "/employees",
    {
      params: {
        page,
        limit,
        search,
      },
    }
  );

  return response.data;
};