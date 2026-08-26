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

export interface SuperAdminDashboardData {
  companies: number;
  activeCompanies: number;
  inactiveCompanies: number;
  users: number;
  activeUsers: number;
  inactiveUsers: number;
  employees: number;
  jobs: number;
  openJobs: number;
  closedJobs: number;
  candidates: number;
}

export interface SuperAdminDashboardResponse {
  success: boolean;
  message: string;
  data: SuperAdminDashboardData;
}