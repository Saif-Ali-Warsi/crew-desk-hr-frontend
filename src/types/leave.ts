export interface Leave {
  id: string;
  companyId: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  employee: {
    employeeCode: string;
    firstName: string;
    lastName: string;
  };
}

export interface LeaveResponse {
  success: boolean;
  message: string;
  data: Leave[];
}