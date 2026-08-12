import api from "./axios";
import type { EmployeesResponse, Employee, EmploymentType } from "../types/employee";


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

export interface CreateEmployeePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  designation: string;
  joiningDate: string;
  employmentType: EmploymentType;
}

export const createEmployee = async (
  payload: CreateEmployeePayload
): Promise<{
  success: boolean;
  message: string;
  data: Employee;
}> => {
  const response = await api.post("/employee", {
    ...payload,
    joiningDate: new Date(
      `${payload.joiningDate}T00:00:00`
    ).toISOString(),
  });

  return response.data;
};

export const updateEmployee = async (
  employeeId: string,
  payload: Partial<CreateEmployeePayload>
): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await api.put(
    `/employee/${employeeId}`,
    payload
  );

  return response.data;
};

export const deleteEmployee = async (
  employeeId: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await api.delete(`/employee/${employeeId}`);

  return response.data;
};