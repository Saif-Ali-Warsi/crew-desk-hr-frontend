export type EmploymentType =
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACT"
    | "INTERN";

export type EmployeeStatus = "ACTIVE" | "INACTIVE";

export interface Employee {
  id: string;
  companyId: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  designation: string;
  joiningDate: string;
  employmentType: EmploymentType;
  status: EmployeeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface EmployeesResponse {
  success: boolean;
  message: string;
  data: {
    items: Employee[];
    pagination: EmployeePagination;
  };
}