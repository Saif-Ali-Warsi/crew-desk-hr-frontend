import api from "./axios";
import type { EmployeesResponse, Employee } from "../types/employee";


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

export const getEmployeeById = async (
  employeeId: string
): Promise<{ success: boolean; message: string; data: Employee }> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: Employee;
  }>(`/employees/${employeeId}`);

  return response.data;
};