export interface DashboardData {
  employees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  jobs: number;
  openJobs: number;
  closedJobs: number;
  candidates: number;
  pendingLeaves: number;
  approvedLeaves: number;
  todayAttendance: number;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}