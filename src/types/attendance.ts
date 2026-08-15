export type AttendanceStatus =
  | "PRESENT"
  | "ABSENT"
  | "LATE"
  | "HALF_DAY";

export interface Attendance {
  id: string;
  companyId: string;
  employeeId: string;
  attendanceDate: string;
  clockIn: string | null;
  clockOut: string | null;
  totalHours: number | null;
  status: AttendanceStatus;
  createdAt: string;
  updatedAt: string;
  employee: {
    employeeCode: string;
    firstName: string;
    lastName: string;
  };
}

export interface AttendanceResponse {
  success: boolean;
  message: string;
  data: Attendance[];
}